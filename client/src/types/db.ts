import * as schema from '@/schema'
import { Inspect } from '@/types/utility'
import { InferInsertModel, InferSelectModel, getTableColumns } from "drizzle-orm"

export type DbSchema = typeof schema
type K = Inspect<DbSchema>
export type TableName = (keyof DbSchema)
export type TableColumns<T extends TableName> = keyof (typeof schema[T] & { $columns: unknown })['$columns']
type T = TableColumns<"user">
// export type NewDbEntry = `New${Capitalize<TableName>}`
// export type SelectDbEntry = `Select${Capitalize<TableName>}`

export type NewUser = InferInsertModel<typeof schema.user>
export type SelectUser = InferSelectModel<typeof schema.user>
export type Role = Pick<SelectUser, "role">
export type NewMovie = InferInsertModel<typeof schema.movie>
export type SelectMovie = InferSelectModel<typeof schema.movie>
export type NewList = InferInsertModel<typeof schema.list>
export type SelectList = InferSelectModel<typeof schema.list>
export type NewMovieList = InferInsertModel<typeof schema.movieList>
export type SelectMovieList = InferSelectModel<typeof schema.movieList>
export type NewRating = InferInsertModel<typeof schema.rating>
export type SelectRating = InferSelectModel<typeof schema.rating>
export type NewRatingToMovieList = InferInsertModel<typeof schema.ratingToMovieList>
export type SelectRatingToMovieList = InferSelectModel<typeof schema.ratingToMovieList>
export type NewRatingToMovieReview = InferInsertModel<typeof schema.ratingToMovieReview>
export type SelectRatingToMovieReview = InferSelectModel<typeof schema.ratingToMovieReview>
export type NewComment = InferInsertModel<typeof schema.comment>
export type SelectComment = InferSelectModel<typeof schema.comment>
export type NewLike = InferInsertModel<typeof schema.like>
export type SelectLike = InferSelectModel<typeof schema.like>
export type NewCommentToMovieList = InferInsertModel<typeof schema.commentToMovieList>
export type SelectCommentToMovieList = InferSelectModel<typeof schema.commentToMovieList>
export type NewLikeToMovieList = InferInsertModel<typeof schema.likeToMovieList>
export type SelectLikeToMovieList = InferSelectModel<typeof schema.likeToMovieList>
export type NewMovieReview = InferInsertModel<typeof schema.movieReview>
export type SelectMovieReview = InferSelectModel<typeof schema.movieReview>
export type NewCommentToMovieReview = InferInsertModel<typeof schema.commentToMovieReview>
export type SelectCommentToMovieReview = InferSelectModel<typeof schema.commentToMovieReview>
export type NewLikeToMovieReview = InferInsertModel<typeof schema.likeToMovieReview>
export type SelectLikeToMovieReview = InferSelectModel<typeof schema.likeToMovieReview>
export type NewFollower = InferInsertModel<typeof schema.follower>
export type SelectFollower = InferSelectModel<typeof schema.follower>
export type NewWatchlist = InferInsertModel<typeof schema.watchlist>
export type SelectWatchlist = InferSelectModel<typeof schema.watchlist>
export type NewWatchlistToMovies = InferInsertModel<typeof schema.watchlistToMovies>
export type SelectWatchlistToMovies = InferSelectModel<typeof schema.watchlistToMovies>
export type NewMovieInfosToUser = InferInsertModel<typeof schema.movieInfosToUser>
export type SelectMovieInfosToUser = InferSelectModel<typeof schema.movieInfosToUser>

// NextAuth
export type NewAccount = InferInsertModel<typeof schema.accounts>
export type SelectAccount = InferSelectModel<typeof schema.accounts>
export type NewSession = InferInsertModel<typeof schema.accounts>
export type SelectSession = InferSelectModel<typeof schema.accounts>
export type NewVerificationToken = InferInsertModel<typeof schema.verificationTokens>
export type SelectVerificationToken = InferSelectModel<typeof schema.verificationTokens>

