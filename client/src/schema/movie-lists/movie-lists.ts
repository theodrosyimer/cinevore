import { relations, sql } from "drizzle-orm"
import {
  index,
  int,
  mysqlEnum,
  mysqlTable, timestamp, uniqueIndex,
  varchar
} from "drizzle-orm/mysql-core"
import { comment } from "../comments/comments"
import { like } from "../likes/likes"
import { list } from "../lists/lists"
import { movie } from "../movies/movies"
import { user } from "../users/users"

export const movieList = mysqlTable('movie_list', {
  listId: int('list_id').references(() => list.id).notNull(),
  movieId: int('movie_id').references(() => movie.tmdbId).notNull(),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  publishedAt: timestamp('published_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull()
},
  (table) => ({
    // compoundKeyIndex: index("compound_key_index").on(table.listId, table.movieId),
    // userListReference: foreignKey({
    //   columns: [table.listId, table.movieId],
    //   foreignColumns: [list.id, list.userId]
    // }),
    fkMovieId: index("FK_movie_id").on(table.movieId),
    fkListId: index("FK_movie_id").on(table.listId),
    // fkMovieInfosToUserId: index("FK_movie_infos_to_user_id").on(table.movieInfosToUserId),
    // compoundKey: primaryKey(table.listId, table.userId),
  }))

export const movieListRelations = relations(movieList, ({ one, many }) => ({
  lists: many(list),
  movie: many(movie),
}))

// export const ratingToMovieListRelations = relations(ratingToMovieList, ({ one, many }) => ({
//   movieList: one(movieList, { fields: [ratingToMovieList.userId, ratingToMovieList.movieId], references: [movieList.authorId, movieList.movieId] }),
// }))


export const commentToMovieList = mysqlTable('comment_to_movie_list', {
  listId: int('list_id').notNull().references(() => list.id, { onDelete: "cascade", onUpdate: "cascade" }),
  commentId: int('comment_id').notNull().references(() => comment.id, { onDelete: "cascade", onUpdate: "cascade" }),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull(),
}, (table) => {
  return {
    id: index("id").on(table.commentId, table.listId,),
    // fkMovieId: index("FK_movie_id").on(table.movieListId),
    // compoundKeyIndex: uniqueIndex("FK_movie_list").on(table.authorId, table.movieListId),
  }
})

// export const commentToMovieListRelations = relations(commentToMovieList, ({ one, many }) => ({
//   list: one(movieList, { fields: [commentToMovieList.authorId, commentToMovieList.movieId], references: [movieList.authorId, movieList.movieId] }),
//   author: one(user, { fields: [commentToMovieList.authorId], references: [user.id] }),
// }))

export const likeToMovieList = mysqlTable("like_to_movie_list", {
  listId: int('list_id').notNull().references(() => list.id, { onDelete: "cascade", onUpdate: "cascade" }),
  likeId: int('like_id').notNull().references(() => like.id, { onDelete: "cascade", onUpdate: "cascade" }),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull(),
},
  (table) => {
    return {
      compoundKeyIndex: index("id").on(table.listId, table.likeId,),
    }
  })

// export const likeToMovieListRelations = relations(likeToMovieList, ({ one, many }) => ({
//   list: one(movieList, { fields: [likeToMovieList.listId], references: [movieList.id] }),
//   author: one(user, { fields: [likeToMovieList.creator], references: [user.id] }),
//   likes: many(commentLike),
// }))

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
