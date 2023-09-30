// import { env } from "@env.mjs"
import * as dotenv from 'dotenv'
dotenv.config()

import { LANGUAGES } from '../constants/languages'
import { tMDBMovieResponseSchema } from '../types/tmdb-api'
import { generateTMDBUrl } from './utils'

export const globalConfig = {
  API_KEY: process.env.TMDB_API_KEY ?? '10473fa5b39f51105676dd9fd05a9af0',
  API_VERSION: (process.env.TMDB_API_VERSION as GlobalConfig['API_VERSION']) ?? '3',
  BASE_URI: process.env.TMDB_BASE_URI ?? 'https://api.themoviedb.org/3',
  IMAGE_BASE_URI: process.env.TMDB_IMAGE_BASE_URI ?? 'https://image.tmdb.org/t/p',
  language: 'en-US',
  timeout: 5000,
} satisfies GlobalConfig

export type GlobalConfig = {
  API_KEY: string
  API_VERSION: '3' | '4'
  BASE_URI: string
  IMAGE_BASE_URI: string
  language: LANGUAGES
  timeout?: number
}
export type GlobalConfigKey = keyof GlobalConfig
export type MovieCategory = 'movie'
export type TvShowCategory = 'tv'
export type OtherCategory = | 'person' | 'company' | 'search'
export type CommonSubCategory = 'popular' | 'top_rated' | 'upcoming' | 'latest'

export type MovieSubCategory = CommonSubCategory | 'now_playing'
export type TvSubCategory = CommonSubCategory | 'airing_today' | 'on_the_air'
export type RouteSegment = `${MovieCategory}/${CommonSubCategory}` | `${MovieCategory}/${MovieSubCategory}` | `${TvShowCategory}/${TvSubCategory}`
export type RouteSegmentWithoutSubCategory = `${MovieCategory}` | `${TvShowCategory}` | `${OtherCategory}`

export type QueryOptions = {
  query?: string
  id?: string
  page?: string
  body?: Record<string, string>
  category: 'movie' | 'tv'
  language?: LANGUAGES
}
export type QueryOptionsWithoutBodyAndCategory = Omit<QueryOptions, 'body' | 'category'>

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
}: QueryOptions) {
  const response = await fetch(
    `${globalConfig.BASE_URI}/${category}/${id}?api_key=${globalConfig.API_KEY
    }&append_to_response=videos,images,credits&include_image_language=${language.replace(
      /-(\w+)/g,
      ''
    )}&include_video_language=${language.slice(0, 2)}&language=${language}`
  )

  if (!response.ok) {
    throw new Error(`Returned with a ${response.status} code`)
  }

  // const data = await response.json()

  return { data: await response.json() }
}

export async function searchByTitle({
  query,
  category,
  language = globalConfig.language,
}: QueryOptions) {
  const response = await fetch(
    `${globalConfig.BASE_URI}/search/${category}?api_key=${globalConfig.API_KEY}&query=${query}&language=${language}`
  )

  if (!response.ok) {
    throw new Error(`Returned with a ${response.status} code`)
  }

  const { page, results, total_pages, total_results } = await response.json()

  return {
    page,
    results,
    total_pages,
    total_results,
  }
}

export async function getTopRated({
  category,
  language = globalConfig.language,
  page = '1',
}: QueryOptions) {
  const response = await fetch(
    `${globalConfig.BASE_URI}/${category}/top_rated?api_key=${globalConfig.API_KEY}&language=${language}&page=${page}`
  )

  if (!response.ok) {
    throw new Error(`Returned with a ${response.status} code`)
  }

  const {
    page: currentPage,
    results,
    total_pages,
    total_results,
  } = await response.json()

  return {
    page: currentPage,
    results,
    total_pages,
    total_results,
  }
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
  const response = await fetch(
    `${globalConfig.BASE_URI}/${category}/upcoming?api_key=${globalConfig.API_KEY}&language=${language}&page=${page}`
  )

  if (!response.ok) {
    throw new Error(`Returned with a ${response.status} code`)
  }

  const {
    dates,
    page: currentPage,
    results,
    total_pages,
    total_results,
  } = await response.json()

  return {
    dates,
    page: currentPage,
    results,
    total_pages,
    total_results,
  }
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
