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

export const user = mysqlTable("user", {
  id: varchar("id", { length: 255 }).$default(() => sql`UUID()`).notNull().primaryKey(),
  role: mysqlEnum('role', ['user', 'admin', 'superadmin']).notNull().default('user'),
  lastname: varchar("lastname", { length: 60 }),
  firstname: varchar("firstname", { length: 50 }),
  name: varchar("name", { length: 255 }).unique(),
  // username: varchar("username", { length: 50 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    // fsp: 3,
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
  avatarFilename: varchar("avatar_filename", { length: 255 }),
  password: char("password", { length: 60 }),
  bio: text("bio"),
  createdAt: timestamp('created_at', { mode: 'date' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull(),
},
  (table) => {
    return {
      id: uniqueIndex("id").on(table.id),
      email: uniqueIndex("email").on(table.email),
      name: uniqueIndex("username").on(table.name),
    }
  })

export const movie = mysqlTable("movie", {
  tmdbId: int("tmdb_id").notNull().primaryKey(),
  imdbId: varchar("imdb__id", { length: 255 }).notNull().unique(),
  watchedCount: int("watched_count").notNull().default(0),
  listedCount: int("listed_count").notNull().default(0),
  likedCount: int("liked_count").notNull().default(0),
  // voteCount: int("vote_count").notNull().default(0),
  // voteTotal: int("vote_total").notNull().default(0),
  // voteAverage: int("vote_average").notNull().default(0),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
},
  (table) => {
    return {
      tmdbId: uniqueIndex("tmdb_id").on(table.tmdbId),
      imdbId: uniqueIndex("imdb_id").on(table.imdbId),
      watched_count: index("FK_user_film").on(table.watchedCount),
      listed_count: index("FK_user_film").on(table.listedCount),
      liked_count: index("FK_user_film").on(table.likedCount),
    }
  })

export const movieList = mysqlTable('movie_list', {
  // id: int("id").autoincrement().primaryKey().notNull(),
  authorId: varchar("author_id", { length: 255 }).notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
  movieId: int('movie_id').references(() => movie.tmdbId).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  publishedAt: timestamp('published_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull()

},
  (table) => ({
    // id: uniqueIndex("id").on(table.id),
    compoundKeyIndex: uniqueIndex("compound_key_index").on(table.authorId, table.movieId),
    compoundKey: primaryKey(table.authorId, table.movieId),
    fkAuthorId: index("FK_author_id").on(table.authorId),
    fkMovieId: index("FK_movie_id").on(table.movieId),
  }))

export const movieListRelations = relations(movieList, ({ one, many }) => ({
  author: one(user, { fields: [movieList.authorId], references: [user.id] }),
  comment: many(commentToMovieList),
}))

export const movieInfosToUser = mysqlTable("movie_infos_to_user", {
  movieId: int("movie_id").notNull().references(() => movie.tmdbId, { onDelete: "cascade", onUpdate: "cascade" }),
  userId: varchar("user_id", { length: 255 }).notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
  rating: int("rating").notNull().references(() => rating.id, { onDelete: "cascade", onUpdate: "cascade" }),
  watchlist: int("watchlist").notNull().references(() => watchlist.id, { onDelete: "cascade", onUpdate: "cascade" }),
  liked: tinyint("like").notNull().default(0),
  watched: tinyint("watched").notNull().default(0),
  reviewed: tinyint("reviewed").notNull().default(0),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
},
  (table) => {
    return {
      compoundKey: primaryKey(table.userId, table.movieId),
      compoundKeyIndex: uniqueIndex("tmdb_id").on(table.userId, table.movieId),
      fkUserId: index("FK_user_id").on(table.userId),
      fkRating: index("FK_rating").on(table.rating),
      fkWatchlistId: index("FK_watchlist_id").on(table.watchlist),
      liked: index("FK_liked").on(table.liked),
      watched: index("FK_watched").on(table.watched),
      reviewed: index("FK_reviewed").on(table.reviewed),
    }
  })

export const watchlist = mysqlTable('watchlist', {
  id: int("id").autoincrement().primaryKey().notNull(),
  authorId: varchar("author_id", { length: 255 }).notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
  movieId: int('movie_id').references(() => movie.tmdbId).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  publishedAt: timestamp('published_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull()

},
  (table) => ({
    id: uniqueIndex("id").on(table.id),
    // compoundKeyIndex: uniqueIndex("compound_key_index").on(table.authorId, table.movieId),
    // compoundKey: primaryKey(table.authorId, table.movieId),
    fkAuthorId: index("FK_author_id").on(table.authorId),
    fkMovieId: index("FK_movie_id").on(table.movieId),
  }))

export const rating = mysqlTable("rating", {
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

export const commentToMovieList = mysqlTable('comment_to_movie_list', {
  id: int("id").autoincrement().primaryKey().notNull(),
  authorId: varchar("author_id", { length: 255 }).notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
  movieId: int('movie_id').references(() => movie.tmdbId),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull(),
}, (table) => {
  return {
    // compoundKey: primaryKey(table.authorId, table.movieId),
    // compoundKeyIndex: uniqueIndex("compound_key_index").on(table.authorId, table.movieId),
    id: uniqueIndex("id").on(table.id),
    fkAuthorId: index("FK_author_id").on(table.authorId),
    fkMovieId: index("FK_movie_id").on(table.movieId),
  }
})

// export const commentToMovieListRelations = relations(commentToMovieList, ({ one, many }) => ({
//   list: one(movieList, { fields: [commentToMovieList.listId], references: [movieList.id] }),
//   author: one(user, { fields: [commentToMovieList.creator], references: [user.id] }),
// }))

export const likeToMovieList = mysqlTable("like_to_movie_list", {
  id: int("id").autoincrement().primaryKey().notNull(),
  movieId: int("movie_id").notNull().references(() => movie.tmdbId, { onDelete: "cascade", onUpdate: "cascade" }),
  userId: varchar("user_id", { length: 255 }).notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull(),
},
  (table) => {
    return {
      id: uniqueIndex("id").on(table.id),
      fkMovieLikeMovieId: index("FK_movie_like_movie_id").on(table.movieId),
      fkUserLikeMovie: index("FK_user_like_movie").on(table.userId),
    }
  })

// export const likeToMovieListRelations = relations(likeToMovieList, ({ one, many }) => ({
//   list: one(movieList, { fields: [likeToMovieList.listId], references: [movieList.id] }),
//   author: one(user, { fields: [likeToMovieList.creator], references: [user.id] }),
//   likes: many(commentLike),
// }))

export const movieReview = mysqlTable("movie_review", {
  id: int("id").autoincrement().primaryKey().notNull(),
  movieId: int("movie_id").notNull().references(() => movie.tmdbId, { onDelete: "cascade", onUpdate: "cascade" }),
  userId: varchar("user_id", { length: 255 }).notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull(),
  content: text("content").notNull(),
},
  (table) => {
    return {
      id: uniqueIndex("id").on(table.id),
      fkFilmReview: index("FK_film_review").on(table.movieId),
      fkUserReview: index("FK_user_review").on(table.userId),
    }
  })

export const likeToMovieReview = mysqlTable("like_to_movie_review", {
  id: int("id").autoincrement().primaryKey().notNull(),
  reviewId: int("review_id").notNull().references(() => movieReview.id, { onDelete: "cascade", onUpdate: "cascade" }),
  userId: varchar("user_id", { length: 255 }).notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull(),
},
  (table) => {
    return {
      id: uniqueIndex("id").on(table.id),
      fkReviewLikeReview: index("FK_review_like_review").on(table.reviewId),
      fkUserLikeReview: index("FK_user_like_review").on(table.userId),
    }
  })

// export const likeToMovieReviewRelations = relations(review, ({ one, many }) => ({
//   list: one(movieList, { fields: [review.listId], references: [movieList.id] }),
//   author: one(user, { fields: [review.creator], references: [user.id] }),
//   likes: many(commentLike),
// }))

export const commentToMovieReview = mysqlTable('comment_to_movie_review', {
  id: int("id").autoincrement().primaryKey().notNull(),
  authorId: varchar("author_id", { length: 255 }).notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
  reviewId: int('review_id').references(() => movieReview.id),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull(),
}, (table) => {
  return {
    // compoundKey: primaryKey(table.authorId, table.reviewId),
    // compoundKeyIndex: uniqueIndex("compound_key_index").on(table.authorId, table.reviewId),
    id: uniqueIndex("id").on(table.id),
    fkAuthorId: index("FK_author_id").on(table.authorId),
    fkReviewId: index("FK_review_id").on(table.reviewId),

  }
})

// export const commentToMovieReviewRelations = relations(commentToMovieReview, ({ one, many }) => ({
//   list: one(movieList, { fields: [commentToMovieReview.reviewId], references: [movieList.id] }),
//   author: one(user, { fields: [commentToMovieReview.creator], references: [user.id] }),
// }))

export const follower = mysqlTable("follower", {
  userId: varchar("user_id", { length: 255 }).notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
  followedBy: varchar("followedBy", { length: 255 }).notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
  followedDate: timestamp('followed_date').default(sql`CURRENT_TIMESTAMP`).notNull(),
  unfollowedDate: timestamp('unfollowed_date').default(sql`CURRENT_TIMESTAMP`)
}, (table) => ({
  compoundKey: primaryKey(table.userId, table.followedBy),
  fkUser: index("FK_user").on(table.userId),
  fkUserFollowedBy: index("FK_user_followed_by").on(table.followedBy),

}))

// Auth

export const accounts = mysqlTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: varchar("refresh_token", { length: 255 }),
    access_token: varchar("access_token", { length: 255 }),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: varchar("id_token", { length: 255 }),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  })
)

export const sessions = mysqlTable("session", {
  sessionToken: varchar("sessionToken", { length: 255 }).notNull().primaryKey(),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationTokens = mysqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  })
)

