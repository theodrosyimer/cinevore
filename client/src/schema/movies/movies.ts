import { movieList } from "../movie-lists/movie-lists"
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


export const movie = mysqlTable("movie", {
  tmdbId: int("tmdb_id").notNull().primaryKey(),
  imdbId: varchar("imdb__id", { length: 255 }).notNull().unique(),
  watchedCount: int("watched_count").notNull().default(0),
  listedCount: int("listed_count").notNull().default(0),
  likedCount: int("liked_count").notNull().default(0),
  // voteCount: int("vote_count").notNull().default(0),
  // voteTotal: int("vote_total").notNull().default(0),
  // voteAverage: int("vote_average").notNull().default(0),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
},
  (table) => {
    return {
      tmdbId: uniqueIndex("tmdb_id").on(table.tmdbId),
      imdbId: uniqueIndex("imdb_id").on(table.imdbId),
      watched_count: index("FK_user_film").on(table.watchedCount),
      listed_count: index("FK_user_film").on(table.listedCount),
      liked_count: index("FK_user_film").on(table.likedCount),
    }
  })

export const movieRelations = relations(movie, ({ one, many }) => ({
  // movieInfosToUser: many(movieInfosToUser),
  movieLists: many(movieList),
  // movieReviews: many(movieReview),
  // watchlist: many(watchlist),
  // commentsToReviews: many(commentToMovieReview),
  // commentsToMovieLists: many(commentToMovieList),
  // likesToReviews: many(likeToMovieReview),
  // likesToMovieLists: many(likeToMovieList),
}))
