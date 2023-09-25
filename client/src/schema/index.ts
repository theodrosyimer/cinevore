
import { comment as commentSchema } from "./comments/comments"
import { follower as followerSchema } from "./followers/followers"
import { like as likeSchema } from "./likes/likes"
import { list as listSchema } from "./lists/lists"
import { movieInfosToUser as movieInfosToUserSchema } from "./movie-infos-to-users/movie-infos-to-users"
import { commentToMovieList as commentToMovieListSchema, likeToMovieList as likeToMovieListSchema, movieList as movieListSchema } from "./movie-lists/movie-lists"
import { commentToMovieReview as commentToMovieReviewSchema, likeToMovieReview as likeToMovieReviewSchema, movieReview as movieReviewSchema } from "./movie-reviews/movie-reviews"
import { movie as movieSchema } from "./movies/movies"
import { rating as ratingSchema, ratingToMovieList as ratingToMovieListSchema, ratingToMovieReview as ratingToMovieReviewSchema } from "./ratings/ratings"
import { accounts as accountsSchema, sessions as sessionsSchema, user as userSchema, verificationTokens as verificationTokensSchema } from "./users/users"
import { watchlist as watchlistSchema, watchlistToMovies as watchlistToMoviesSchema } from "./watchlist/watchlist"

export const user = userSchema
export const accounts = accountsSchema
export const sessions = sessionsSchema
export const verificationTokens = verificationTokensSchema
export const movie = movieSchema
export const movieList = movieListSchema
export const list = listSchema
export const comment = commentSchema
export const like = likeSchema
export const rating = ratingSchema
export const commentToMovieList = commentToMovieListSchema
export const commentToMovieReview = commentToMovieReviewSchema
export const follower = followerSchema
export const likeToMovieList = likeToMovieListSchema
export const likeToMovieReview = likeToMovieReviewSchema
export const movieInfosToUser = movieInfosToUserSchema
export const movieReview = movieReviewSchema
export const ratingToMovieList = ratingToMovieListSchema
export const ratingToMovieReview = ratingToMovieReviewSchema
export const watchlist = watchlistSchema
export const watchlistToMovies = watchlistToMoviesSchema
