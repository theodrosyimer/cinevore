import { relations, sql } from 'drizzle-orm'
import {
  index,
  int,
  mysqlTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/mysql-core'
import { comment } from '../comments'
import { like } from '../likes'
import { movie } from '../movies'
import { user } from '../users'

export const movieReview = mysqlTable(
  'movie_review',
  {
    id: int('id').autoincrement().primaryKey().notNull(),
    userId: varchar('user_id', {
      length: 255,
    }).notNull() /* .references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }) */,
    movieId:
      int(
        'movie_id',
      ).notNull() /* .references(() => movie.tmdbId, { onDelete: "cascade", onUpdate: "cascade" }) */,
    content: text('content').notNull(),
    createdAt: timestamp('created_at')
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at').onUpdateNow(),
  },
  (table) => {
    return {
      id: uniqueIndex('id').on(table.id),
      fkUserId: index('FK_user_id').on(table.userId),
      fkMovieId: index('FK_movie_id').on(table.movieId),
    }
  },
)

export const movieReviewRelations = relations(movieReview, ({ one, many }) => ({
  user: one(user, { fields: [movieReview.userId], references: [user.id] }),
  movie: one(movie, {
    fields: [movieReview.movieId],
    references: [movie.tmdbId],
  }),
  comments: many(comment, {
    relationName: 'reviewComments',
  }),
  likes: many(like, {
    relationName: 'reviewLikes',
  }),
}))
