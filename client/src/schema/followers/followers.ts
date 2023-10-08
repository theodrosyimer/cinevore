import { relations, sql } from "drizzle-orm"
import { index, mysqlTable, primaryKey, timestamp, varchar } from "drizzle-orm/mysql-core"
import { user } from "../users/users"

export const follower = mysqlTable("follower", {
  userId: varchar("user_id", { length: 255 }).notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
  following: varchar("following", { length: 255 }).notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
  followedDate: timestamp('followed_date').default(sql`CURRENT_TIMESTAMP`).notNull(),
  unfollowedDate: timestamp('unfollowed_date').default(sql`CURRENT_TIMESTAMP`)
}, (table) => ({
  compoundKey: primaryKey(table.userId, table.following),
  fkUser: index("FK_user").on(table.userId),
  fkUserFollowedBy: index("FK_user_followed_by").on(table.following),

}))

export const followerRelations = relations(follower, ({ many }) => ({
  user: many(user),
  following: many(user),
}))
