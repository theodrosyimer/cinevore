import { sql } from "drizzle-orm"
import {
  index,
  int,
  mysqlEnum,
  mysqlTable,
  primaryKey, timestamp,
  tinyint, uniqueIndex, varchar
} from "drizzle-orm/mysql-core"
import { movie } from "../movies/movies"
import { user } from "../users/users"

export const movieInfosToUser = mysqlTable("movie_infos_to_user", {
  movieId: int("movie_id").notNull().references(() => movie.tmdbId, { onDelete: "cascade", onUpdate: "cascade" }),
  userId: varchar("user_id", { length: 255 }).notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
  rating: mysqlEnum('value', ['', '0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5']).notNull().default(''),
  liked: tinyint("like").notNull().default(1),
  watched: tinyint("watched").notNull().default(1),
  reviewed: tinyint("reviewed").notNull().default(1),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
},
  (table) => {
    return {
      compoundKey: primaryKey(table.userId, table.movieId),
      compoundKeyIndex: uniqueIndex("tmdb_id").on(table.userId, table.movieId),
      rating: index("rating").on(table.rating),
      liked: index("liked").on(table.liked),
      watched: index("watched").on(table.watched),
      reviewed: index("reviewed").on(table.reviewed),
    }
  })


