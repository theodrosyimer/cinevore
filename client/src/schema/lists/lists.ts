import { relations, sql } from "drizzle-orm"
import {
  index,
  int, mysqlTable, timestamp, varchar
} from "drizzle-orm/mysql-core"
import { movieList } from "../movie-lists/movie-lists"
import { user } from "../users/users"

export const list = mysqlTable('list', {
  id: int("id").autoincrement().primaryKey().notNull(),
  userId: varchar("user_id", { length: 255 }).notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  publishedAt: timestamp('published_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull()

},
  (table) => ({
    id: index("compound_key_index").on(table.id, table.userId),
    // compoundKeyIndex: uniqueIndex("compound_key_index").on(table.id, table.userId),
    // compoundKey: primaryKey(table.id, table.userId),
  }))

export const listRelations = relations(list, ({ one, many }) => ({
  // movies: many(movie),
  movieLists: many(movieList),
}))
