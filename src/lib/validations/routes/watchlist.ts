import { watchlist, watchlistToMovies } from '@/db/planetscale'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

const insertRefineOptions = {}

export const insertMovieToWatchlistSchema =
  createInsertSchema(watchlistToMovies)

export const movieToWatchlistPOSTSchema = insertMovieToWatchlistSchema.pick({
  movieId: true,
})
export const movieToWatchlistDELETESchema = insertMovieToWatchlistSchema.pick({
  movieId: true,
  watchlistId: true,
})

export const movieToWatchlistPATCHSchema = insertMovieToWatchlistSchema

export const movieToWatchlistGETSchema = createSelectSchema(watchlist)
