import { set } from 'zod'
import { LANGUAGE } from '../constants/languages'
import type {
  CommonFilterCategory,
  MovieCategory,
  MovieFilterCategory,
  MovieSearchFilters,
  OptionalQueryOptions,
  QueryOptionsWithoutBodyAndCategory,
  RouteSegment,
  SearchFilterCategory,
  TvFilterCategory,
  TvShowCategory,
} from '../types'
import {
  TMDBImageSizesCategoryKey,
  TMDBImageSizesCategory,
} from '../types/tmdb-api'
import { MoviePoster } from '../types/tmdb-api-movie-details'
import { globalConfig } from './tmdb'

export function mergeSearchParamsToUrl(
  url: string | URL,
  searchParamsObject:
    | Record<string, string>
    | URLSearchParams
    | QueryOptionsWithoutBodyAndCategory,
) {
  const params = new URLSearchParams(searchParamsObject)

  if (!(typeof url === 'string' || url instanceof URL)) {
    throw new Error(
      `Expected a string or a URL object, received ${JSON.stringify(url)}`,
    )
  }

  if (url instanceof URL) {
    url.search = params.toString()
    return url
  }

  const newUrl = new URL(url)
  newUrl.search = params.toString()
  return newUrl
}
export function generateTMDBUrl(
  segment: RouteSegment,
  params: QueryOptionsWithoutBodyAndCategory &
    OptionalQueryOptions &
    MovieSearchFilters,
) {
  const url = new URL(
    `${globalConfig.API_VERSION}/${segment}`,
    `${globalConfig.BASE_URI}`,
  )

  const queries = {
    api_key: globalConfig.API_KEY,
    ...params,
  } satisfies QueryOptionsWithoutBodyAndCategory & {
    api_key: string
  }

  return mergeSearchParamsToUrl(url, new URLSearchParams(queries))
}

export function ensureImage(images: MoviePoster[]) {
  const foundImage = images.find((image) => !!image.file_path)
  return foundImage?.file_path ? foundImage : undefined
}

export function generateTMDBImageUrl<
  TImageFormat extends TMDBImageSizesCategoryKey,
  TValue extends TMDBImageSizesCategory[TImageFormat],
>({
  format,
  size,
  paths,
  defaultImage,
  secure = true,
}: {
  format: TImageFormat
  size: TValue
  paths?: MoviePoster[]
  defaultImage: string
  secure?: boolean
}) {
  let image: MoviePoster | undefined = undefined

  if (paths?.length) {
    image = ensureImage(paths)
  }

  // console.log('image', image)
  if (!image) {
    return `${globalConfig.IMAGE_BASE_URI}/${size}${defaultImage}` as const
  }

  if (!secure) {
    return `${globalConfig.IMAGE_BASE_URI_HTTP}/${size}${image.file_path}` as const
  }
  return `${globalConfig.IMAGE_BASE_URI}/${size}${image.file_path}` as const
}

export function getImageFormatSize<
  TImageFormat extends TMDBImageSizesCategoryKey,
  TValue extends `${TMDBImageSizesCategory[TImageFormat]}`,
>(format: TImageFormat, size: TValue) {
  // console.log('WIDTH:', Number(size?.slice(1)))
  return size /* ?.slice(1) */
}

export function extractCategoryFromSegment(segment: RouteSegment) {
  return segment.split('/')[0] as MovieCategory | TvShowCategory
}

export function extractSubCategoryFromSegment(segment: RouteSegment) {
  return segment.split('/')[1] as
    | CommonFilterCategory
    | MovieFilterCategory
    | TvFilterCategory
    | SearchFilterCategory
}

export function extractLanguageFromLanguageCode(languageCode: LANGUAGE) {
  return languageCode.split('-')[0]
}

export function extractCountryFromLanguageCode(languageCode: LANGUAGE) {
  return languageCode.split('-')[1]
}

export async function promiseRaceAbort(
  fns: (() => Promise<any>)[],
  maxTimeOut = 5000,
) {
  const abortController = new AbortController()
  const { signal } = abortController

  // add the same abort controller to each promise
  fns.forEach((promise) => {
    promise.bind({ signal })
  })

  fns.push(() => new Promise((_, reject) => setTimeout(reject, maxTimeOut)))

  try {
    await Promise.race(fns)
  } catch (error) {
    abortController.abort()
    console.log('promiseAbortRace error', error)
  }
}

export async function promiseAllAbort(
  fns: (() => Promise<any>)[],
  maxTimeOut = 5000,
) {
  const abortController = new AbortController()
  const { signal } = abortController

  // add the same abort controller to each promise
  fns.forEach((promise) => {
    promise.bind({ signal })
  })

  fns.push(() => new Promise((_, reject) => setTimeout(reject, maxTimeOut)))

  try {
    return await Promise.all(fns)
  } catch (error) {
    abortController.abort()
    console.log('promiseAbortRace error', error)
  }
}
