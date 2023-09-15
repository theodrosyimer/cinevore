import type { AdapterAccount } from "@auth/core/adapters"
import { InferInsertModel, InferSelectModel, sql } from "drizzle-orm"
import {
  char,
  index,
  int,
  mysqlEnum,
  mysqlTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  varchar
} from "drizzle-orm/mysql-core"

export const user = mysqlTable("user", {
  id: varchar("id", { length: 255 }).$default(() => sql`UUID()`).notNull().primaryKey(),
  roleId: int("role_id").default(0).notNull().references(() => role.id, { onDelete: "cascade", onUpdate: "cascade" }),
  lastname: varchar("lastname", { length: 60 }),
  firstname: varchar("firstname", { length: 50 }),
  name: varchar("name", { length: 255 }).unique(),
  // username: varchar("username", { length: 50 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    // fsp: 3,
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
  avatarFilename: varchar("avatar_filename", { length: 255 }),
  password: char("password", { length: 60 }),
  bio: text("bio"),
  createdAt: timestamp('created_at', { mode: 'date' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull(),
},
  (table) => {
    return {
      email: uniqueIndex("email").on(table.email),
      name: uniqueIndex("username").on(table.name),
      id: uniqueIndex("id").on(table.id),
      fkRoleUser: index("FK_role_user").on(table.roleId),
    }
  })

export type NewUser = InferInsertModel<typeof user>
export type SelectUser = InferSelectModel<typeof user>

export const film = mysqlTable("film", {
  id: int("id").autoincrement().primaryKey().notNull(),
  userId: varchar("user_id", { length: 255 }).notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull(),
  content: text("content").notNull(),
},
  (table) => {
    return {
      id: uniqueIndex("id").on(table.id),
      fkUserFilm: index("FK_user_film").on(table.userId),
    }
  })

export type NewFilm = InferInsertModel<typeof film>
export type SelectFilm = InferSelectModel<typeof film>


export const filmList = mysqlTable("film_list", {
  id: int("id").autoincrement().primaryKey().notNull(),
  userId: varchar("user_id", { length: 255 }).notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
},
  (table) => {
    return {
      id: uniqueIndex("id").on(table.id),
    }
  })

export type NewFilmList = InferInsertModel<typeof filmList>
export type SelectFilmList = InferSelectModel<typeof filmList>

export const filmLike = mysqlTable("film_like", {
  id: int("id").autoincrement().primaryKey().notNull(),
  filmId: int("film_id").notNull().references(() => film.id, { onDelete: "cascade", onUpdate: "cascade" }),
  userId: varchar("user_id", { length: 255 }).notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull(),
},
  (table) => {
    return {
      id: uniqueIndex("id").on(table.id),
      fkFilmLikeFilm: index("FK_film_like_film").on(table.filmId),
      fkUserLikeFilm: index("FK_user_like_film").on(table.userId),
    }
  })

export type NewFilmLike = InferInsertModel<typeof filmLike>
export type SelectFilmLike = InferSelectModel<typeof filmLike>

export const comment = mysqlTable("comment", {
  id: int("id").autoincrement().primaryKey().notNull(),
  listId: int("list_id").notNull().references(() => filmList.id, { onDelete: "restrict", onUpdate: "cascade" }),
  userId: varchar("user_id", { length: 255 }).notNull().references(() => user.id),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull(),
  content: text("content").notNull(),
},
  (table) => {
    return {
      id: uniqueIndex("id").on(table.id),
      fkListComment: index("FK_list_comment").on(table.listId),
      fkUserComment: index("FK_user_comment").on(table.userId),
    }
  })

export type NewComment = InferInsertModel<typeof comment>
export type SelectComment = InferSelectModel<typeof comment>

export const reviewLike = mysqlTable("review_like", {
  id: int("id").autoincrement().primaryKey().notNull(),
  reviewId: int("review_id").notNull().references(() => review.id, { onDelete: "cascade", onUpdate: "cascade" }),
  userId: varchar("user_id", { length: 255 }).notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull(),
},
  (table) => {
    return {
      id: uniqueIndex("id").on(table.id),
      fkReviewLikeReview: index("FK_review_like_review").on(table.reviewId),
      fkUserLikeReview: index("FK_user_like_review").on(table.userId),
    }
  })

export type NewReviewLike = InferInsertModel<typeof reviewLike>
export type SelectReviewLike = InferSelectModel<typeof reviewLike>

export const review = mysqlTable("review", {
  id: int("id").autoincrement().primaryKey().notNull(),
  filmId: int("film_id").notNull().references(() => film.id, { onDelete: "cascade", onUpdate: "cascade" }),
  userId: varchar("user_id", { length: 255 }).notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull(),
  content: text("content").notNull(),
},
  (table) => {
    return {
      id: uniqueIndex("id").on(table.id),
      fkFilmReview: index("FK_film_review").on(table.filmId),
      fkUserReview: index("FK_user_review").on(table.userId),
    }
  })

export type NewReview = InferInsertModel<typeof review>
export type SelectReview = InferSelectModel<typeof review>

export const role = mysqlTable("role", {
  id: int("id").primaryKey().notNull(),
  role: mysqlEnum('role', ['user', 'admin', 'superadmin']).notNull(),
},
  (table) => {
    return {
      id: uniqueIndex("id").on(table.id),
      role: uniqueIndex("role").on(table.role),
    }
  })

export type Role = InferInsertModel<typeof role>

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
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  })
)

export type NewAccount = InferInsertModel<typeof accounts>
export type SelectAccount = InferSelectModel<typeof accounts>

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
    compoundKey: primaryKey(vt.identifier, vt.token),
  })
)

export type NewVerificationTokens = InferInsertModel<typeof verificationTokens>
export type SelectVerificationTokens = InferSelectModel<typeof verificationTokens>
