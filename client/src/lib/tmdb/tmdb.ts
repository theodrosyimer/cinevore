/* eslint-disable prettier/prettier */
import { z } from 'zod'
import { env } from "@env.mjs"

import { LANGUAGES } from '@/lib/tmdb/constants/languages'
import { TMDBMovieResponse } from '@/lib/tmdb/types/types'

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
const configOptions: ConfigOptions = {
  API_KEY: env.TMDB_API_KEY ?? '',
  BASE_URI: env.TMDB_BASE_URI ?? '',
  IMAGE_BASE_URI: env.TMDB_IMAGE_BASE_URI ?? '',
  language: 'en-US',
  timeout: 5000,
}

export type ConfigOptions = {
  API_KEY: string
  BASE_URI: string
  IMAGE_BASE_URI: string
  language: LANGUAGES
  timeout?: number
}

export type QueryOptions = {
  query?: string
  id?: string
  page?: number
  body?: Record<string, any>
  category?: string
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
console.log(q.toString())

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
  language = 'en-US',
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
  language,
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
  language,
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
  language,
  page = 1,
}: QueryOptions) {
  const response = await fetch(
    `${configOptions.BASE_URI}/${category}/popular?api_key=${configOptions.API_KEY}&language=${language}&page=${page}`
  )

  if (!response.ok) {
    throw new Error(`Returned with a ${response.status} code`)
  }

  const data = await response.json() as TMDBMovieResponse

  return data.results[0].
}

export async function getUpcoming({
  category,
  language,
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
  language = 'en-US',
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
    getGenresList({ language }),
    getGenresList({
      category: 'tv',
      language,
    }),
  ])
  console.log(movieGenresList, tvGenresList)
}
