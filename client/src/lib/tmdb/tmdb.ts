/* eslint-disable prettier/prettier */
import { z } from 'zod'
// import { env } from "@env.mjs"
import * as dotenv from 'dotenv'
dotenv.config()

import { LANGUAGES } from './constants/languages'
import { TMDBMovieResponse, tMDBMovieResponseSchema } from './types/types'
import { mergeSearchParamsToUrl } from './utils'

/*
- movies
- credits
- images
- people
- companies
- search
- certifications
- find
- discover?
*/

/* eslint-disable camelcase */
// eslint-disable-next-line no-use-before-define
export const configOptions = {
  API_KEY: process.env.TMDB_API_KEY ?? '10473fa5b39f51105676dd9fd05a9af0',
  BASE_URI: process.env.TMDB_BASE_URI ?? 'https://api.themoviedb.org/3',
  IMAGE_BASE_URI: process.env.TMDB_IMAGE_BASE_URI ?? 'https://image.tmdb.org/t/p',
  language: 'en-US',
  timeout: 5000,
} satisfies ConfigOptions

export type ConfigOptions = {
  API_KEY: string
  BASE_URI: string
  IMAGE_BASE_URI: string
  language?: LANGUAGES
  timeout?: number
}

export type QueryOptions = {
  query?: string
  id?: string
  page?: number
  body?: Record<string, any>
  category: 'movie' | 'tv'
  language?: LANGUAGES
}

export function setQuery<
  T extends
  | string
  | string[][]
  | Record<string, any>
  | URLSearchParams
  | undefined
>(options = {} as T) {
  const baseQuery = new URLSearchParams(
    `?api_key=${configOptions.API_KEY}&language=${configOptions.language}`
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

const url = mergeSearchParamsToUrl(new URL(`/movie/popular`, `${configOptions.BASE_URI}`), q)
url
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
  language = configOptions.language,
}: QueryOptions) {
  const response = await fetch(
    `${configOptions.BASE_URI}/${category}/${id}?api_key=${configOptions.API_KEY
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
  language = configOptions.language,
}: QueryOptions) {
  const response = await fetch(
    `${configOptions.BASE_URI}/search/${category}?api_key=${configOptions.API_KEY}&query=${query}&language=${language}`
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
  language = configOptions.language,
  page = 1,
}: QueryOptions) {
  const response = await fetch(
    `${configOptions.BASE_URI}/${category}/top_rated?api_key=${configOptions.API_KEY}&language=${language}&page=${page}`
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
  language = configOptions.language,
  page = 1,
}: QueryOptions) {
  console.log(configOptions.BASE_URI)
  const url = new URL(`/${category}/popular`, `${configOptions.BASE_URI}`)

  const queries = {
    api_key: configOptions.API_KEY,
    language: !language ? configOptions.language : language,
    page: page.toString(),
  }
  const u = mergeSearchParamsToUrl(url, new URLSearchParams(queries))

  console.log(u.href)

  const response = await fetch(u.href)

  if (!response.ok) {
    throw new Error(`Returned with a ${response.status} code`)
  }

  const data = await response.json() as TMDBMovieResponse
  console.log(data)

  // return tMDBMovieResponseSchema.parse(data)
  return data
}

export async function getUpcoming({
  category,
  language = configOptions.language,
  page = 1,
}: QueryOptions) {
  const response = await fetch(
    `${configOptions.BASE_URI}/${category}/upcoming?api_key=${configOptions.API_KEY}&language=${language}&page=${page}`
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
  language = configOptions.language,
}: QueryOptions) {
  const response = await fetch(
    `${configOptions.BASE_URI}/genre/${category}/list?api_key=${configOptions.API_KEY}&language=${language}`
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
