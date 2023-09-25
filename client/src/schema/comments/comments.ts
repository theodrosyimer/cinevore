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

export const comment = mysqlTable('comment', {
  id: int("id").autoincrement().primaryKey().notNull(),
  authorId: varchar("author_id", { length: 255 }).notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull(),
}, (table) => {
  return {
    id: uniqueIndex("id").on(table.id),
    fkAuthorId: index("FK_author_id").on(table.authorId),
    // fkMovieId: index("FK_movie_id").on(table.movieListId),
    // compoundKeyIndex: uniqueIndex("FK_movie_list").on(table.authorId, table.movieListId),
  }
})

export const commentRelations = relations(comment, ({ one, many }) => ({
  // movies: many(movie),
  // movieLists: many(movieList),
}))
