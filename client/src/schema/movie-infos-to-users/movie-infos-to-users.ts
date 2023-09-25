import { movie } from "../movies/movies"
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

export const movieInfosToUser = mysqlTable("movie_infos_to_user", {
  movieId: int("movie_id").notNull().references(() => movie.tmdbId, { onDelete: "cascade", onUpdate: "cascade" }),
  userId: varchar("user_id", { length: 255 }).notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
  rating: mysqlEnum('value', ['0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5']).notNull().default('0'),
  liked: tinyint("like").notNull().default(0),
  watched: tinyint("watched").notNull().default(0),
  reviewed: tinyint("reviewed").notNull().default(0),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
},
  (table) => {
    return {
      compoundKeyIndex: index("tmdb_id").on(table.userId, table.movieId),
      compoundKey: primaryKey(table.userId, table.movieId),
      // movieListReference: foreignKey({
      //   columns: [table.movieId, table.userId],
      //   foreignColumns: [movie.tmdbId, user.id]
      // }),
      // fkUserId: index("FK_user_id").on(table.userId),
      // fkMovieId: index("FK_movie_id").on(table.movieId),
      fkRating: index("FK_rating").on(table.rating),
      liked: index("FK_liked").on(table.liked),
      watched: index("FK_watched").on(table.watched),
      reviewed: index("FK_reviewed").on(table.reviewed),
    }
  })


