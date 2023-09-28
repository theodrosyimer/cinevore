/* eslint-disable camelcase */
/* eslint-disable no-use-before-define */
import { backdropSizesSchema, changeKeysSchema, logoSizesSchema, posterSizesSchema, profileSizesSchema, stillSizesSchema } from '@/lib/tmdb/constants/configuration-details'
import type {
  ArrayValues,
  KeysOf,
  // ValuesOf,
  DeepWriteable,
} from './utility-types'

import { z } from 'zod'
import { movieCertifications } from '@/lib/tmdb/constants/movie-certifications'


export type TMDBMovieResponse = {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

/* ************************************************
                 CONFIGURATION
************************************************ */
export const tMDBConfigurationSchema = z.object({
  images: z.object({
    base_url: z.literal('http://image.tmdb.org/t/p/'),
    secure_base_url: z.literal('https://image.tmdb.org/t/p/'),
    backdrop_sizes: backdropSizesSchema,
    logo_sizes: logoSizesSchema,
    poster_sizes: posterSizesSchema,
    profile_sizes: profileSizesSchema,
    still_sizes: stillSizesSchema,
  }),
  change_keys: changeKeysSchema
})
export type TMDBConfiguration = z.infer<typeof tMDBConfigurationSchema>
export type TMDBImageConfiguration = TMDBConfiguration['images']
export type TMDBImageConfigurationWriteable =
  DeepWriteable<TMDBImageConfiguration>
export type TMDBChangeKeysConfiguration = TMDBConfiguration['change_keys']

export type TMDBImageSizesCategory = Omit<TMDBImageConfigurationWriteable, 'base_url' | 'secure_base_url'>

// export type TMDBImageSizesCategoryKey = KeysOf<TMDBImageSizesCategory>

// export type TMDBImageSizesCategoryValues = ValuesOf<TMDBImageSizesCategory>

// function name<TKey extends TMDBImageSizesCategoryKey, TValue extends TMDBImageSizesCategory[TKey]>(sizeCategory: TKey, value: TValue) {
//   return ({
//     [sizeCategory]: value,

//   } as { [key in TKey]: TValue })
// }

// let t = name('profile_sizes', 'w45')
/* ************************************************
                   MOVIES
************************************************ */

export type Movie = {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export type MovieDetails = {
  adult: boolean
  belongs_to_collection: null | {
    id: number
    name: string
    poster_path: string
    backdrop_path: string
  }
  budget: number
  genres: {
    id: number
    name: string
  }[]
  homepage: string
  imdb_id: string
  production_companies: {
    id: number
    logo_path: string
    name: string
    origin_country: string
  }[]
  production_countries: {
    iso_3166_1: string
    name: string
  }[]
  revenue: number
  runtime: number
  spoken_languages: {
    iso_639_1: string
    name: string
  }[]
  status: string
  tagline: string
}

export type MovieCredits = {
  id: number
  cast: {
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string
    cast_id: number
    character: string
    credit_id: string
    order: number
  }[]
  crew: {
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string
    credit_id: string
    department: string
    job: string
  }[]
}
export type MovieCertifications = typeof movieCertifications.certifications

export type CountryListForMovieCertification = KeysOf<MovieCertifications>

export type MovieCertification<T extends CountryListForMovieCertification> =
  MovieCertifications[T]

/* ************************************************
                  COMPANIES
************************************************ */

export type ProductionCompany = {
  description: string
  headquarters: string
  homepage: string
  id: number
  logo_path: string
  name: string
  origin_country: string
  parent_company: null
}

export type ProductionCompanyLogo = {
  id: number
  logos: Logo[]
}

export type Logo = {
  aspect_ratio: number
  file_path: string
  height: number
  id: string
  file_type: string
  vote_average: number
  vote_count: number
  width: number
}

/* ************************************************
                  ZOD TYPES
************************************************ */

