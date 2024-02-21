import { relations, sql } from 'drizzle-orm'
import {
  index,
  mysqlTable,
  primaryKey,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/mysql-core'
import { user } from '../users'

export const follower = mysqlTable(
  'follower',
  {
    followee: varchar('followee', {
      length: 255,
    }).notNull() /* .references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }) */,
    follower: varchar('follower', {
      length: 255,
    }).notNull() /* .references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }) */,
    followedDate: timestamp('followed_date')
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    // unfollowedDate: timestamp('unfollowed_date'),
  },
  (table) => ({
    compositeKey: primaryKey({ columns: [table.followee, table.follower] }),
    compositeKeyIndex: uniqueIndex('composite_key').on(
      table.follower,
      table.followee,
    ),
    fkUser: index('FK_user').on(table.followee),
    fkUserFollower: index('FK_user_follower').on(table.follower),
  }),
)

export const followerRelations = relations(follower, ({ one, many }) => ({
  followee: one(user, {
    fields: [follower.followee],
    references: [user.id],
    relationName: 'followee',
  }),
  follower: one(user, {
    fields: [follower.follower],
    references: [user.id],
    relationName: 'follower',
  }),
  // user: many(user, { relationName: 'user_id' }),
  // follower: many(user, { relationName: 'follower' }),
}))
