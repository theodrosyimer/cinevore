
import { comment as commentSchema, commentRelations as commentRelationsSchema } from "./comments"
import { follower as followerSchema, followerRelations as followerRelationsSchema } from "./followers"
import { like as likeSchema, likeRelations as likeRelationsSchema } from "./likes"
import {
  list as listSchema,
  listRelations as listRelationsSchema,
  commentToMovieList as commentToMovieListSchema,
  commentToMovieListRelations as commentToMovieListRelationsSchema,
  likeToMovieList as likeToMovieListSchema,
  likeToMovieListRelations as likeToMovieListRelationsSchema
} from "./lists"
import { movieInfosToUser as movieInfosToUserSchema, movieInfosToUserRelations as movieInfosToUserRelationsSchema } from "./movie-infos-to-users"
import {
  movieList as movieListSchema,
  movieListRelations as movieListRelationsSchema
} from "./movie-lists"
import { commentToMovieReview as commentToMovieReviewSchema, commentToMovieReviewRelations as commentToMovieReviewRelationsSchema, likeToMovieReview as likeToMovieReviewSchema, likeToMovieReviewRelations as likeToMovieReviewRelationsSchema, movieReview as movieReviewSchema, movieReviewRelations as movieReviewRelationsSchema } from "./movie-reviews"
import { movie as movieSchema, movieRelations as movieRelationsSchema } from "./movies"
import { rating as ratingSchema, ratingRelations as ratingRelationsSchema, ratingToMovieListRelations as ratingToMovieListRelationsSchema, ratingToMovieList as ratingToMovieListSchema, ratingToMovieReview as ratingToMovieReviewSchema, ratingToMovieReviewRelations as ratingToMovieReviewRelationsSchema } from "./ratings"
import { user as userSchema, userRelations as userRelationsSchema, accounts as accountsSchema, sessions as sessionsSchema, verificationTokens as verificationTokensSchema } from "./users"
import { watchlist as watchlistSchema, watchlistRelations as watchlistRelationsSchema, watchlistToMovies as watchlistToMoviesSchema, watchlistToMoviesRelations as watchlistToMoviesRelationsSchema } from "./watchlist"

export const user = userSchema
export const userRelations = userRelationsSchema
export const accounts = accountsSchema
export const sessions = sessionsSchema
export const verificationTokens = verificationTokensSchema
export const movie = movieSchema
export const movieRelations = movieRelationsSchema
export const list = listSchema
export const listRelations = listRelationsSchema
export const comment = commentSchema
export const commentRelations = commentRelationsSchema
export const like = likeSchema
export const likeRelations = likeRelationsSchema
export const rating = ratingSchema
export const ratingRelations = ratingRelationsSchema
export const movieList = movieListSchema
export const movieListRelations = movieListRelationsSchema
export const commentToMovieList = commentToMovieListSchema
export const commentToMovieListRelations = commentToMovieListRelationsSchema
export const likeToMovieList = likeToMovieListSchema
export const likeToMovieListRelations = likeToMovieListRelationsSchema
export const ratingToMovieList = ratingToMovieListSchema
export const ratingToMovieListRelations = ratingToMovieListRelationsSchema
export const movieReview = movieReviewSchema
export const movieReviewRelations = movieReviewRelationsSchema
export const commentToMovieReview = commentToMovieReviewSchema
export const commentToMovieReviewRelations = commentToMovieReviewRelationsSchema
export const likeToMovieReview = likeToMovieReviewSchema
export const likeToMovieReviewRelations = likeToMovieReviewRelationsSchema
export const ratingToMovieReview = ratingToMovieReviewSchema
export const ratingToMovieReviewRelations = ratingToMovieReviewRelationsSchema
export const follower = followerSchema
export const followerRelations = followerRelationsSchema
export const movieInfosToUser = movieInfosToUserSchema
export const movieInfosToUserRelations = movieInfosToUserRelationsSchema
export const watchlist = watchlistSchema
export const watchlistRelations = watchlistRelationsSchema
export const watchlistToMovies = watchlistToMoviesSchema
export const watchlistToMoviesRelations = watchlistToMoviesRelationsSchema
