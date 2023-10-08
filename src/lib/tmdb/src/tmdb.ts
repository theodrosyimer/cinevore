// import { env } from "@env.mjs"
import * as dotenv from 'dotenv'
dotenv.config()

import { type MovieDetails, tMDBMovieResponseSchema, tMDBMovieResponseSchemaWithDateInterval, tMDBSearchMultiSchema, TMDBMovieResponse } from '../types/tmdb-api'
import { extractLanguageFromLanguageCode, generateTMDBUrl } from './utils'
import { type GlobalConfig, type QueryOptions } from '../types'

export const globalConfig = {
  API_KEY: process.env.TMDB_API_KEY ?? '10473fa5b39f51105676dd9fd05a9af0',
  API_VERSION: (process.env.TMDB_API_VERSION as GlobalConfig['API_VERSION']) ?? '3',
  BASE_URI: process.env.TMDB_BASE_URI ?? 'https://api.themoviedb.org/3',
  IMDB_BASE_URI: process.env.IMDB_BASE_URI ?? 'https://imdb.com/title',
  IMAGE_BASE_URI_HTTP: process.env.TMDB_IMAGE_BASE_URI_HTTP ?? 'http://image.tmdb.org/t/p',
  IMAGE_BASE_URI: process.env.TMDB_IMAGE_BASE_URI ?? 'https://image.tmdb.org/t/p',
  language: 'en-US',
  timeout: 5000,
} satisfies GlobalConfig

export function setQuery<
  T extends
  | string
  | string[][]
  | Record<string, any>
  | URLSearchParams
  | undefined
>(options = {} as T) {
  const baseQuery = new URLSearchParams(
    `?api_key=${globalConfig.API_KEY}&language=${globalConfig.language}`
  )

  if (
    !(
      (Array.isArray(options) && options.length) ||
      (typeof options === 'object' && Object.keys(options).length)
    )
  )
    return baseQuery

  if (
    !Array.isArray(options) &&
    typeof options === 'object' &&
    Object.keys(options).length > 0
  ) {
    if (options instanceof URLSearchParams) {
      return options
    }
    if (Array.isArray(options.body)) {
      return baseQuery
    }
    if (typeof options.body === 'object') {
      for (const [key, value] of Object.entries(options.body)) {
        baseQuery.append(key, value as string)
      }
    }

    const { id, body, ...rest } = options as Record<string, any> & {
      id: string
      body: Record<any, string>
    }

    for (const [key, value] of Object.entries(rest)) {
      baseQuery.append(key, value as string)
    }
  }
  return baseQuery
}

const q = setQuery({
  page: '1',
  id: '2',
  body: { name: 'test' },
})

export function isCallback(
  callback: unknown
): asserts callback is (...args: any) => any {
  if (typeof callback !== 'function') {
    throw new Error('This parameter must be a function!')
  }
}

export function validateRequired() {
  return {}
}

export async function searchByID({
  id,
  category,
  language = globalConfig.language,
  page = '1',
}: QueryOptions) {
  const url = generateTMDBUrl(`${category}/${id}`, {
    language,
    page,
    append_to_response: 'videos,images,credits',
    include_image_language: extractLanguageFromLanguageCode(language),
    include_video_language: extractLanguageFromLanguageCode(language),
  })

  console.log('URL', url.href)
  const response = await fetch(url.href)

  if (!response.ok) {
    throw new Error(`Returned with a ${response.status} code`)
  }

  const data = await response.json() as MovieDetails

  // TODO: need to parse the data
  // return movieDetailsSchema.parse(data)
  return data
}

// ! this function is not working properly
export async function searchMulti({
  query,
  // category,
  language = globalConfig.language,
}: Omit<QueryOptions, 'category'>) {

  console.log('QUERY', query)
  const url = generateTMDBUrl(`search/multi`, {
    query,
    language,
  })

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Returned with a ${response.status} code`)
  }

  // TODO: need to get each type of response (movies, tv shows, and persons) and parse it
  const data = await response.json()/*  as TMDBMovieResponse */

  // console.log(data)
  const parsedSearch = tMDBSearchMultiSchema.safeParse(data)

  if (!parsedSearch.success) {
    console.error(parsedSearch.error)
    return null
  }

  return parsedSearch.data
}

export async function searchByTitle({
  query,
  category,
  language = globalConfig.language,
  page = '1',
}: QueryOptions) {
  const url = generateTMDBUrl(`search/${category}`, {
    query,
    language,
    page,
  })
  console.log('SEARCH URL', url.href)
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Returned with a ${response.status} code`)
  }

  const data = await response.json() as TMDBMovieResponse

  return data
}
export async function getTopRated({
  category,
  language = globalConfig.language,
  page = '1',
}: QueryOptions) {
  const url = generateTMDBUrl(`${category}/top_rated`, {
    page,
    language
  })

  const response = await fetch(url.href)

  if (!response.ok) {
    throw new Error(`Returned with a ${response.status} code`)
  }

  const data = await response.json()

  return tMDBMovieResponseSchema.parse(data)
}

export async function getPopular({
  category,
  language = globalConfig.language,
  page = '1',
}: QueryOptions) {
  const url = generateTMDBUrl(`${category}/popular`, {
    page,
    language
  })

  const response = await fetch(url.href)

  if (!response.ok) {
    throw new Error(`Returned with a ${response.status} code`)
  }

  const data = await response.json()
  // console.log(data)

  return tMDBMovieResponseSchema.parse(data)
}

export async function getUpcoming({
  category,
  language = globalConfig.language,
  page = '1',
}: QueryOptions) {
  const url = generateTMDBUrl(`${category}/upcoming`, {
    page,
    language
  })

  const response = await fetch(url.href)

  if (!response.ok) {
    throw new Error(`Returned with a ${response.status} code`)
  }

  const data = await response.json()

  return tMDBMovieResponseSchemaWithDateInterval.parse(data)
}

export async function getGenresList({
  category = 'movie',
  language = globalConfig.language,
}: QueryOptions) {
  const response = await fetch(
    `${globalConfig.BASE_URI}/genre/${category}/list?api_key=${globalConfig.API_KEY}&language=${language}`
  )

  if (!response.ok) {
    throw new Error(`Returned with a ${response.status} code`)
  }

  const { genres } = await response.json()

  return genres
}
export async function getTvAndMovieGenresList({ language }: QueryOptions) {
  const [movieGenresList, tvGenresList] = await Promise.all([
    getGenresList({ category: 'movie', language }),
    getGenresList({
      category: 'tv',
      language,
    }),
  ])
  console.log(movieGenresList, tvGenresList)
}
