import { relations, sql } from 'drizzle-orm';
import {
  index,
  int,
  mysqlTable,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/mysql-core';
import { movie } from '../movies';
import { user } from '../users';

export const watchlist = mysqlTable(
  'watchlist',
  {
    id: int('id').autoincrement().primaryKey().notNull(),
    userId: varchar('user_id', { length: 255 })
      .notNull()
      .references(() => user.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    createdAt: timestamp('created_at')
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at').onUpdateNow(),
  },
  (table) => ({
    id: uniqueIndex('id').on(table.id, table.userId),
  })
);

export const watchlistRelations = relations(watchlist, ({ one, many }) => ({
  user: one(user, { fields: [watchlist.userId], references: [user.id] }),
  watchlistToMovies: many(watchlistToMovies),
}));

export const watchlistToMovies = mysqlTable(
  'watchlist_to_movies',
  {
    watchlistId: int('watchlist_id')
      .references(() => watchlist.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      })
      .notNull(),
    movieId: int('movie_id')
      .references(() => movie.tmdbId, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      })
      .notNull(),
    addedAt: timestamp('created_at')
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => ({
    watchlistId: index('watchlist_id').on(table.watchlistId),
    movieId: index('movie_id').on(table.movieId),
  })
);

export const watchlistToMoviesRelations = relations(
  watchlistToMovies,
  ({ one }) => ({
    watchlist: one(watchlist, {
      fields: [watchlistToMovies.watchlistId],
      references: [watchlist.id],
    }),
    movie: one(movie, {
      fields: [watchlistToMovies.movieId],
      references: [movie.tmdbId],
    }),
  })
);
