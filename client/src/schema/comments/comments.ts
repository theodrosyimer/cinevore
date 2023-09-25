import { relations, sql } from "drizzle-orm"
import {
  index,
  int, mysqlTable, text,
  timestamp, uniqueIndex,
  varchar
} from "drizzle-orm/mysql-core"
import { user } from "../users/users"

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
