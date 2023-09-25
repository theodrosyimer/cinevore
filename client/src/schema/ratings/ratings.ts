import { sql } from "drizzle-orm"
import {
  index,
  int,
  mysqlEnum,
  mysqlTable, timestamp, uniqueIndex,
  varchar
} from "drizzle-orm/mysql-core"
import { movie } from "../movies/movies"
import { user } from "../users/users"


export const ratingToMovieList = mysqlTable("rating_to_movie_list", {
  id: int("id").autoincrement().primaryKey().notNull(),
  movieId: int("movie_id").notNull().references(() => movie.tmdbId, { onDelete: "cascade", onUpdate: "cascade" }),
  userId: varchar("user_id", { length: 255 }).notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
  value: mysqlEnum('value', ['0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5']).notNull().default('0'),
},
  (table) => {
    return {
      id: uniqueIndex("id").on(table.id),
      fkFilmLikeFilm: index("FK_film_like_film").on(table.movieId),
      fkUserLikeFilm: index("FK_user_like_film").on(table.userId),
    }
  })

// export const ratingToMovieListRelations = relations(ratingToMovieList, ({ one, many }) => ({
//   movieList: one(movieList, { fields: [ratingToMovieList.userId, ratingToMovieList.movieId], references: [movieList.authorId, movieList.movieId] }),
// }))
