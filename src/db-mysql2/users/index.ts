import type { AdapterAccount } from "@auth/core/adapters"
import { relations, sql } from "drizzle-orm"
import {
  char, int,
  mysqlEnum,
  mysqlTable,
  primaryKey,
  text,
  timestamp, uniqueIndex,
  varchar
} from "drizzle-orm/mysql-core"
import { comment } from "../comments"
import { follower } from "../followers"
import { like } from "../likes"
import { list } from "../lists"
import { movieInfosToUser } from "../movie-infos-to-users"
import { movieReview } from "../movie-reviews"
import { rating } from "../ratings"
import { watchlist } from "../watchlist"

export const user = mysqlTable("user", {
  id: varchar("id", { length: 255 }).$default(() => sql`UUID()`).notNull().primaryKey(),
  role: mysqlEnum('role', ['user', 'admin', 'superadmin']).default('user'),
  name: varchar("name", { length: 255 }).unique().notNull(),
  lastname: varchar("lastname", { length: 60 }),
  firstname: varchar("firstname", { length: 50 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    fsp: 3,
  }),
  password: char("password", { length: 60 }),
  image: varchar("image", { length: 255 }),
  bio: text("bio"),
  stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 255 }),
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }),
  stripePriceId: varchar("stripePriceId", { length: 255 }),
  stripeCurrentPeriodEnd: timestamp("stripeCurrentPeriodEnd", {
    mode: "date",
    // fsp: 3,
  }),
  stripeSessionId: varchar("stripeSessionId", { length: 255 }),
  createdAt: timestamp('created_at', { mode: 'date' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).onUpdateNow(),
},
  (table) => {
    return {
      id: uniqueIndex("id").on(table.id),
      email: uniqueIndex("email").on(table.email),
      name: uniqueIndex("username").on(table.name),
    }
  })

export const userRelations = relations(user, ({ one, many }) => ({
  // watchlist: one(watchlist, {
  //   fields: [user.id],
  //   references: [watchlist.userId]
  // }),
  lists: many(list),
  // movieReviews: many(movieReview),
  // comments: many(comment),
  // likes: many(like),
  // ratings: many(rating),
  // movieInfosToUser: many(movieInfosToUser, { relationName: 'user' }),
  // followee: many(follower, { relationName: 'follower' }),
  // followers: many(follower, { relationName: 'followee' }),
}))

// Auth

export const accounts = mysqlTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: varchar("refresh_token", { length: 255 }),
    access_token: varchar("access_token", { length: 255 }),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: varchar("id_token", { length: 255 }),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compositeKey: primaryKey(account.provider, account.providerAccountId),
  })
)

export const sessions = mysqlTable("session", {
  sessionToken: varchar("sessionToken", { length: 255 }).notNull().primaryKey(),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationTokens = mysqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compositeKey: primaryKey(vt.identifier, vt.token),
  })
)

