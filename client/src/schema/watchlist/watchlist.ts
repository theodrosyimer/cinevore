import { relations, sql } from "drizzle-orm"
import {
  index,
  int, mysqlTable, timestamp, uniqueIndex,
  varchar
} from "drizzle-orm/mysql-core"
import { movie } from "../movies/movies"
import { user } from "../users/users"

export const watchlist = mysqlTable('watchlist', {
  id: int("id").autoincrement().primaryKey().notNull(),
  userId: varchar("author_id", { length: 255 }).notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull()

},
  (table) => ({
    id: uniqueIndex("id").on(table.id),
  }))

export const watchlistRelations = relations(watchlist, ({ one, many }) => ({
  user: one(user, { fields: [watchlist.userId], references: [user.id] }),
  watchlistToMovies: many(watchlistToMovies),
}))

export const watchlistToMovies = mysqlTable('watchlist_to_movies', {
  watchlistId: int('watchlist_id').references(() => watchlist.id).notNull(),
  movieId: int('movie_id').references(() => movie.tmdbId).notNull(),
  addedAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
},
  (table) => ({
    watchlistId: index("watchlist_id").on(table.watchlistId),
    movieId: index("movie_id").on(table.movieId),
  }))

export const watchlistToMoviesRelations = relations(watchlistToMovies, ({ many }) => ({
  watchlists: many(watchlist),
  movies: many(movie),
}))
