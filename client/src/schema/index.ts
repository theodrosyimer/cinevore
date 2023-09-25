
import { accounts as accountsSchema, sessions as sessionsSchema, user as userSchema, verificationTokens as verificationTokensSchema } from "./users/users"
import { movie as movieSchema } from "./movies/movies"
import { list as listSchema } from "./lists/lists"
import { comment as commentSchema } from "./comments/comments"
import { like as likeSchema } from "./likes/likes"
import { movieList as movieListSchema } from "./movie-lists/movie-lists"
import { commentToMovieList as commentToMovieListSchema } from "./movie-lists/movie-lists"
import { likeToMovieList as likeToMovieListSchema } from "./movie-lists/movie-lists"
import { ratingToMovieList as ratingToMovieListSchema } from "./movie-lists/movie-lists"
import { movieReview as movieReviewSchema } from "./movie-reviews/movie-reviews"
import { commentToMovieReview as commentToMovieReviewSchema } from "./movie-reviews/movie-reviews"
import { likeToMovieReview as likeToMovieReviewSchema } from "./movie-reviews/movie-reviews"
import { movieInfosToUser as movieInfosToUserSchema } from "./movie-infos-to-users/movie-infos-to-users"
import { follower as followerSchema } from "./followers/followers"
import { watchlist as watchlistSchema } from "./watchlist/watchlist"
import { watchlistToMovies as watchlistToMoviesSchema } from "./watchlist-movies/watchlist-movies"

export const user = userSchema
export const accounts = accountsSchema
export const sessions = sessionsSchema
export const verificationTokens = verificationTokensSchema
export const movie = movieSchema
export const movieList = movieListSchema
export const list = listSchema
export const comment = commentSchema
export const like = likeSchema
export const commentToMovieList = commentToMovieListSchema
export const commentToMovieReview = commentToMovieReviewSchema
export const follower = followerSchema
export const likeToMovieList = likeToMovieListSchema
export const likeToMovieReview = likeToMovieReviewSchema
export const movieInfosToUser = movieInfosToUserSchema
export const movieReview = movieReviewSchema
export const ratingToMovieList = ratingToMovieListSchema
export const watchlist = watchlistSchema
export const watchlistToMovies = watchlistToMoviesSchema
