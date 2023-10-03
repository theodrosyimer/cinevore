/* eslint-disable camelcase */
/* eslint-disable no-use-before-define */
import type {
  // ValuesOf,
  DeepWriteable,
  KeysOf,
  ValuesOf
} from './utility-types'

import { z } from 'zod'
import * as constants from '../constants/configuration-details'
import { movieCertifications } from '../constants/movie-certifications'
import { movieCreditsSchema, movieDetailsSchema } from './tmdb-api-movie-details'

/* ************************************************
                 CONFIGURATION
************************************************ */

const TMDBBackdropSizesSchema = z.enum(constants.backdropSizes)
const TMDBLogoSizesSchema = z.enum(constants.logoSizes)

const TMDBPosterSizesSchema = z.enum(constants.poster_sizes)
const TMDBProfileSizesSchema = z.enum(constants.profile_sizes)
const TMDBStillSizesSchema = z.enum(constants.still_sizes)

const TMDBChangeKeysSchema = z.enum(constants.changeKeys)

export const TMDBConfigurationSchema = z.object({
  images: z.object({
    base_url: z.literal('http://image.tmdb.org/t/p/'),
    secure_base_url: z.literal('https://image.tmdb.org/t/p/'),
    backdrop_sizes: TMDBBackdropSizesSchema,
    logo_sizes: TMDBLogoSizesSchema,
    poster_sizes: TMDBPosterSizesSchema,
    profile_sizes: TMDBProfileSizesSchema,
    still_sizes: TMDBStillSizesSchema,
  }),
  change_keys: TMDBChangeKeysSchema
})
export const TMDBImagesConfigurationSchema = TMDBConfigurationSchema.shape.images

export type TMDBConfiguration = z.infer<typeof TMDBConfigurationSchema>
export type TMDBBackdropSizes = z.infer<typeof TMDBBackdropSizesSchema>
export type TMDBLogoSizes = z.infer<typeof TMDBLogoSizesSchema>
export type TMDBPosterSizes = z.infer<typeof TMDBPosterSizesSchema>
export type TMDBProfileSizes = z.infer<typeof TMDBProfileSizesSchema>
export type TMDBStillSizes = z.infer<typeof TMDBStillSizesSchema>
export type TMDBChangeKeys = z.infer<typeof TMDBChangeKeysSchema>
export type TMDBImagesConfiguration = z.infer<typeof TMDBImagesConfigurationSchema>
export type TMDBImagesConfigurationWriteable =
  DeepWriteable<TMDBImagesConfiguration>
export type TMDBChangeKeysConfiguration = TMDBConfiguration['change_keys']

export type TMDBImageSizesCategory = Omit<TMDBImagesConfigurationWriteable, 'base_url' | 'secure_base_url'>

export type TMDBImageSizesCategoryKey = KeysOf<TMDBImageSizesCategory>

export type TMDBImageSizesCategoryValues = ValuesOf<TMDBImageSizesCategory>

function example<TKey extends TMDBImageSizesCategoryKey, TValue extends TMDBImageSizesCategory[TKey]>(sizeCategory: TKey, value: TValue) {
  return ({
    [sizeCategory]: value,

  } as { [key in TKey]: TValue })
}

/* ************************************************
                   MOVIES
************************************************ */

export const searchMovieSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string(),
  genre_ids: z.array(z.number()),
  id: z.number(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string(),
  release_date: z.string(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number()
})

export const tMDBMovieResponseSchema = z.object({
  page: z.number(),
  results: z.array(searchMovieSchema),
  total_pages: z.number(),
  total_results: z.number()
})

export type TMDBMovieResponse = z.infer<typeof tMDBMovieResponseSchema>

export const dateIntervalSchema = z.object({
  dates: z.object({
    maximum: z.string(),
    minimum: z.string()
  })
})

export type DateInterval = z.infer<typeof dateIntervalSchema>
export const tMDBMovieResponseSchemaWithDateInterval = dateIntervalSchema.merge(tMDBMovieResponseSchema)

export type TMDBMovieResponseWithDateInterval = z.infer<typeof tMDBMovieResponseSchemaWithDateInterval>


export type MovieCertifications = typeof movieCertifications.certifications

export type CountryListForMovieCertification = KeysOf<MovieCertifications>

export type MovieCertification<T extends CountryListForMovieCertification> =
  MovieCertifications[T]

export type Movie = z.infer<typeof searchMovieSchema>

export type MovieDetails = z.infer<typeof movieDetailsSchema>

export type MovieCredits = z.infer<typeof movieCreditsSchema>


/* ************************************************
                  COMPANIES
************************************************ */

export const productionCompanySchema = z.object({
  description: z.string(),
  headquarters: z.string(),
  homepage: z.string(),
  id: z.number(),
  logo_path: z.string(),
  name: z.string(),
  origin_country: z.string(),
  parent_company: z.null()
})

export const logoSchema = z.object({
  aspect_ratio: z.number(),
  file_path: z.string(),
  height: z.number(),
  id: z.string(),
  file_type: z.string(),
  vote_average: z.number(),
  vote_count: z.number(),
  width: z.number()
})

export const productionCompanyLogoSchema = z.object({
  id: z.number(),
  logos: z.array(logoSchema)
})

export type ProductionCompany = z.infer<typeof productionCompanySchema>
export type Logo = z.infer<typeof logoSchema>
export type ProductionCompanyLogo = z.infer<typeof productionCompanyLogoSchema>
