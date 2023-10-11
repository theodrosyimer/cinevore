import { relations, sql } from 'drizzle-orm'
import {
  boolean,
  index,
  int,
  mysqlEnum,
  mysqlTable,
  primaryKey,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/mysql-core'
import { movie } from '../movies'
import { user } from '../users'

export const movieInfosToUser = mysqlTable(
  'movie_infos_to_user',
  {
    movieId: int('movie_id')
      .notNull()
      .references(() => movie.tmdbId, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    userId: varchar('user_id', { length: 255 })
      .notNull()
      .references(() => user.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    rating: mysqlEnum('rating', [
      '',
      '0',
      '0.5',
      '1',
      '1.5',
      '2',
      '2.5',
      '3',
      '3.5',
      '4',
      '4.5',
      '5',
    ])
      .notNull()
      .default(''),
    liked: boolean('like').default(false),
    watched: boolean('watched').default(false),
    reviewed: boolean('reviewed').default(false),
    createdAt: timestamp('created_at')
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at').onUpdateNow(),
  },
  (table) => {
    return {
      compositeKey: primaryKey(table.userId, table.movieId),
      compositeKeyIndex: uniqueIndex('composite_key').on(
        table.movieId,
        table.userId,
      ),
      rating: index('rating').on(table.rating),
      liked: index('liked').on(table.liked),
      watched: index('watched').on(table.watched),
      reviewed: index('reviewed').on(table.reviewed),
    }
  },
)

export const movieInfosToUserRelations = relations(
  movieInfosToUser,
  ({ one }) => ({
    movie: one(movie, {
      fields: [movieInfosToUser.movieId],
      references: [movie.tmdbId],
      relationName: 'movie',
    }),
    user: one(user, {
      fields: [movieInfosToUser.userId],
      references: [user.id],
      relationName: 'user',
    }),
  }),
)
