import { user } from "../users/users"
import { sql } from "drizzle-orm"
import { mysqlTable, varchar, timestamp, primaryKey, index } from "drizzle-orm/mysql-core"

export const follower = mysqlTable("follower", {
  userId: varchar("user_id", { length: 255 }).notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
  followedBy: varchar("followedBy", { length: 255 }).notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
  followedDate: timestamp('followed_date').default(sql`CURRENT_TIMESTAMP`).notNull(),
  unfollowedDate: timestamp('unfollowed_date').default(sql`CURRENT_TIMESTAMP`)
}, (table) => ({
  compoundKey: primaryKey(table.userId, table.followedBy),
  fkUser: index("FK_user").on(table.userId),
  fkUserFollowedBy: index("FK_user_followed_by").on(table.followedBy),

}))
