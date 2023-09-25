import { relations, sql } from "drizzle-orm"
import {
  index,
  int, mysqlTable, text,
  timestamp, uniqueIndex,
  varchar
} from "drizzle-orm/mysql-core"
import { comment } from "../comments/comments"
import { like } from "../likes/likes"
import { movie } from "../movies/movies"
import { user } from "../users/users"

export const movieReview = mysqlTable("movie_review", {
  id: int("id").autoincrement().primaryKey().notNull(),
  userId: varchar("user_id", { length: 255 }).notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
  movieId: int("movie_id").notNull().references(() => movie.tmdbId, { onDelete: "cascade", onUpdate: "cascade" }),
  content: text("content").notNull(),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull(),
},
  (table) => {
    return {
      id: uniqueIndex("id").on(table.id),
      fkUserId: index("FK_user_id").on(table.userId),
      fkMovieId: index("FK_movie_id").on(table.movieId),
    }
  })

export const movieReviewRelations = relations(movieReview, ({ one, many }) => ({
  user: one(user, { fields: [movieReview.userId], references: [user.id] }),
  movie: one(movie, { fields: [movieReview.movieId], references: [movie.tmdbId] }),
  commentsToMovieReview: many(commentToMovieReview),
  likesToMovieReview: many(likeToMovieReview),
}))


export const commentToMovieReview = mysqlTable('comment_to_movie_review', {
  commentId: int('comment_id').notNull().references(() => comment.id, { onDelete: "cascade", onUpdate: "cascade" }),
  movieReviewId: int('movie_review_id').notNull().references(() => movieReview.id, { onDelete: "cascade", onUpdate: "cascade" }),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull(),
}, (table) => {
  return {
    compoundKeyIndex: index("compoundKeyIndex").on(table.commentId, table.movieReviewId,),
  }
})

export const commentToMovieReviewRelations = relations(commentToMovieReview, ({ many }) => ({
  movieReviews: many(movieReview),
  comments: many(comment),
}))

export const likeToMovieReview = mysqlTable("like_to_movie_review", {
  movieReviewId: int("movie_review_id").notNull().references(() => movieReview.id, { onDelete: "cascade", onUpdate: "cascade" }),
  likeId: int('like_id').notNull().references(() => like.id, { onDelete: "cascade", onUpdate: "cascade" }),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull(),
},
  (table) => {
    return {
      compoundKeyIndex: index("id").on(table.movieReviewId, table.likeId,),
    }
  })

export const likeToMovieReviewRelations = relations(likeToMovieReview, ({ many }) => ({
  likes: many(like),
  movieReviews: many(movieReview),
}))


