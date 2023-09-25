import { comment } from "../comments/comments"
import { movieList } from "../movie-lists/movie-lists"
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

export const movieReview = mysqlTable("movie_review", {
  // id: int("id").autoincrement().primaryKey().notNull(),
  movieId: int("movie_id").notNull().references(() => movie.tmdbId, { onDelete: "cascade", onUpdate: "cascade" }),
  userId: varchar("user_id", { length: 255 }).notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull(),
  content: text("content").notNull(),
},
  (table) => {
    return {
      compoundKey: primaryKey(table.userId, table.movieId),
      compoundKeyIndex: uniqueIndex("compound_key_index").on(table.userId, table.movieId),
    }
  })

export const likeToMovieReview = mysqlTable("like_to_movie_review", {
  id: int("id").autoincrement().primaryKey().notNull(),
  movieId: int("review_id").notNull().references(() => movie.tmdbId, { onDelete: "cascade", onUpdate: "cascade" }),
  userId: varchar("user_id", { length: 255 }).notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull(),
},
  (table) => {
    return {
      id: uniqueIndex("id").on(table.id),
      fkLikeToMovieReview: index("FK_like_to_movie_review").on(table.movieId),
      fkUserLikeToMovieReview: index("FK_user_like_to_movie_review").on(table.userId),
    }
  })

// export const likeToMovieReviewRelations = relations(review, ({ one, many }) => ({
//   list: one(movieList, { fields: [review.listId], references: [movieList.id] }),
//   author: one(user, { fields: [review.creator], references: [user.id] }),
//   likes: many(commentLike),
// }))

export const commentToMovieReview1 = mysqlTable('comment_to_movie_review', {
  id: int("id").autoincrement().primaryKey().notNull(),
  authorId: varchar("author_id", { length: 255 }).notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
  movieId: int('review_id').references(() => movie.tmdbId),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull(),
}, (table) => {
  return {
    id: uniqueIndex("id").on(table.id),
    fkAuthorId: index("FK_author_id").on(table.authorId),
    fkReviewId: index("FK_review_id").on(table.movieId),
  }
})
export const commentToMovieReview = mysqlTable('comment_to_movie_review', {
  commentId: int('comment_id').notNull().references(() => comment.id, { onDelete: "cascade", onUpdate: "cascade" }),
  authorId: varchar("author_id", { length: 255 }).notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
  movieId: int('movie_id').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull(),
}, (table) => {
  return {
    id: uniqueIndex("id").on(table.commentId, table.authorId, table.movieId),
    fkAuthorId: index("FK_author_id").on(table.authorId),
    // fkMovieId: index("FK_movie_id").on(table.movieListId),
    // compoundKeyIndex: uniqueIndex("FK_movie_list").on(table.authorId, table.movieListId),
    movieListReference: foreignKey({
      columns: [table.movieId, table.authorId, table.commentId],
      foreignColumns: [movieList.movieId, user.id, comment.id]
    }),
  }
})

// export const commentToMovieReviewRelations = relations(commentToMovieReview, ({ one, many }) => ({
//   list: one(movieList, { fields: [commentToMovieReview.reviewId], references: [movieList.id] }),
//   author: one(user, { fields: [commentToMovieReview.creator], references: [user.id] }),
// }))
