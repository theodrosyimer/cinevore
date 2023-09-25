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

export const watchlistToMovies = mysqlTable('watchlist_to_movies', {
  // id: int("id").autoincrement().primaryKey().notNull(),
  userId: varchar("author_id", { length: 255 }).notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
  movieId: int('movie_id').references(() => movie.tmdbId).notNull(),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull()

},
  (table) => ({
    compoundKeyIndex: uniqueIndex("compound_key_index").on(table.movieId, table.userId),
    compoundKey: primaryKey(table.movieId, table.userId),
    // id: uniqueIndex("id").on(table.id),
    // fkAuthorId: index("FK_author_id").on(table.userId),
    // fkMovieId: index("FK_movie_id").on(table.movieId),
  }))

