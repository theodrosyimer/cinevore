import { relations, sql } from 'drizzle-orm'
import {
  index,
  int,
  mysqlTable,
  primaryKey,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/mysql-core'
import { comment } from '../comments'
import { like } from '../likes'
import { list } from '../lists'
import { movie } from '../movies'

export const movieList = mysqlTable(
  'movie_list',
  {
    listId: int('list_id')
      .references(() => list.id, { onDelete: 'cascade', onUpdate: 'cascade' })
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
    compositeKey: primaryKey({ columns: [table.listId, table.movieId] }),
    compositeKeyIndex: uniqueIndex('composite_key').on(
      table.movieId,
      table.listId,
    ),
    fkListId: index('FK_movie_id').on(table.listId),
    fkMovieId: index('FK_movie_id').on(table.movieId),
  }),
)

export const movieListRelations = relations(movieList, ({ one, many }) => ({
  list: one(list, {
    fields: [movieList.listId],
    references: [list.id],
  }),
  movie: one(movie, {
    fields: [movieList.movieId],
    references: [movie.tmdbId],
  }),
  commentsToMovieList: many(commentToMovieList),
  likesToMovieList: many(likeToMovieList),
}))

export const commentToMovieList = mysqlTable(
  'comment_to_movie_list',
  {
    listId: int('list_id')
      .notNull()
      .references(() => list.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    commentId: int('comment_id')
      .notNull()
      .references(() => comment.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    createdAt: timestamp('created_at')
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at').onUpdateNow(),
  },
  (table) => {
    return {
      compositeKeyIndex: index('compositeKeyIndex').on(
        table.commentId,
        table.listId,
      ),
    }
  },
)

export const commentToMovieListRelations = relations(
  commentToMovieList,
  ({ one, many }) => ({
    comment: one(comment, {
      fields: [commentToMovieList.commentId],
      references: [comment.id],
    }),
    list: one(list, {
      fields: [commentToMovieList.listId],
      references: [list.id],
    }),
  }),
)

export const likeToMovieList = mysqlTable(
  'like_to_movie_list',
  {
    listId: int('list_id')
      .notNull()
      .references(() => list.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    likeId: int('like_id')
      .notNull()
      .references(() => like.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    createdAt: timestamp('created_at')
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at').onUpdateNow(),
  },
  (table) => {
    return {
      compositeKeyIndex: index('compositeKeyIndex').on(
        table.listId,
        table.likeId,
      ),
    }
  },
)

export const likeToMovieListRelations = relations(
  likeToMovieList,
  ({ one, many }) => ({
    like: one(like, {
      fields: [likeToMovieList.likeId],
      references: [like.id],
    }),
    list: one(list, {
      fields: [likeToMovieList.listId],
      references: [list.id],
    }),
  }),
)
