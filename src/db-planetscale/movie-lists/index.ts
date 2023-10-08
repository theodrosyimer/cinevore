import { relations, sql } from "drizzle-orm"
import {
  index,
  int, mysqlTable, primaryKey, timestamp, uniqueIndex
} from "drizzle-orm/mysql-core"
import { comment } from "../comments"
import { like } from "../likes"
import { list } from "../lists"
import { movie } from "../movies"

export const movieList = mysqlTable('movie_list', {
  listId: int('list_id').notNull()/* .references(() => list.id, { onDelete: "cascade", onUpdate: "cascade" }) */,
  movieId: int('movie_id').notNull()/* .references(() => movie.tmdbId, { onDelete: "cascade", onUpdate: "cascade" }) */,
  addedAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
},
  (table) => ({
    compositeKey: primaryKey(table.listId, table.movieId),
    compositeKeyIndex: uniqueIndex('composite_key').on(table.movieId, table.listId),
    fkListId: index("FK_movie_id").on(table.listId),
    fkMovieId: index("FK_movie_id").on(table.movieId),
  }))

export const movieListRelations = relations(movieList, ({ one, many }) => ({
  list: one(list, {
    fields: [movieList.listId],
    references: [list.id]
  }),
  movie: one(movie, {
    fields: [movieList.movieId],
    references: [movie.tmdbId]
  }),
}))
