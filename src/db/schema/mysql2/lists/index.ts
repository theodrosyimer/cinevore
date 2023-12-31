import { relations, sql } from 'drizzle-orm'
import {
  boolean,
  index,
  int,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core'
import { movieList } from '../movie-lists'
import { user } from '../users'

export const list = mysqlTable(
  'list',
  {
    id: int('id').autoincrement().primaryKey().notNull(),
    userId: varchar('user_id', { length: 255 })
      .notNull()
      .references(() => user.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    title: varchar('title', { length: 2000 }).notNull(),
    description: text('description'),
    isPrivate: boolean('is_private').default(false),
    createdAt: timestamp('created_at')
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    publishedAt: timestamp('published_at')
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at').onUpdateNow(),
  },
  (table) => ({
    id: index('id').on(table.id),
    userId: index('user_id').on(table.userId),
  }),
)

export const listRelations = relations(list, ({ one, many }) => ({
  user: one(user, { fields: [list.userId], references: [user.id] }),
  movieLists: many(movieList),
}))
