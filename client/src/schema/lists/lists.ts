import { movieList } from "../movie-lists/movie-lists"
import { user } from "../users/users"
import type { AdapterAccount } from "@auth/core/adapters"
import { sql, relations } from "drizzle-orm"
import {
  char,
  foreignKey,
  index,
  int,
  mysqlEnum,
  mysqlTable,
  primaryKey,
  text,
  timestamp,
  tinyint,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core"

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
