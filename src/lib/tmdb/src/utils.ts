import { LANGUAGE } from "../constants/languages"
import type { CommonFilterCategory, MovieCategory, MovieFilterCategory, OptionalQueryOptions, QueryOptionsWithoutBodyAndCategory, RouteSegment, SearchFilterCategory, TvFilterCategory, TvShowCategory } from "../types"
import { TMDBImageSizesCategoryKey, TMDBImageSizesCategory } from "../types/tmdb-api"
import { globalConfig } from "./tmdb"

export function mergeSearchParamsToUrl(url: (string | URL), searchParamsObject: Record<string, string> | URLSearchParams | QueryOptionsWithoutBodyAndCategory) {
  const params = new URLSearchParams(searchParamsObject)

  if (!(typeof url === 'string' || url instanceof URL)) {
    throw new Error(`Expected a string or a URL object, received ${JSON.stringify(url)}`)
  }

  if (url instanceof URL) {
    url.search = params.toString()
    return url
  }

  const newUrl = new URL(url)
  newUrl.search = params.toString()
  return newUrl
}
export function generateTMDBUrl(segment: RouteSegment, params: QueryOptionsWithoutBodyAndCategory & OptionalQueryOptions) {

  const url = new URL(`${globalConfig.API_VERSION}/${segment}`, `${globalConfig.BASE_URI}`)

  const queries = {
    api_key: globalConfig.API_KEY,
    ...params,
  } satisfies QueryOptionsWithoutBodyAndCategory & {
    api_key: string,
  }

  return mergeSearchParamsToUrl(url, new URLSearchParams(queries))
}

export function generateTMDBImageUrl<TImageFormat extends TMDBImageSizesCategoryKey, TValue extends TMDBImageSizesCategory[TImageFormat]>(format: TImageFormat, size: TValue, path: string, secure = true) {
  if (!secure) {
    return `${globalConfig.IMAGE_BASE_URI_HTTP}/${size}${path}`
  }
  return `${globalConfig.IMAGE_BASE_URI}/${size}${path}`
}

export function extractCategoryFromSegment(segment: RouteSegment) {
  return segment.split('/')[0] as MovieCategory | TvShowCategory
}

export function extractSubCategoryFromSegment(segment: RouteSegment) {
  return segment.split('/')[1] as CommonFilterCategory | MovieFilterCategory | TvFilterCategory | SearchFilterCategory
}

export function extractLanguageFromLanguageCode(languageCode: LANGUAGE) {
  return languageCode.split('-')[0]
}

export function extractCountryFromLanguageCode(languageCode: LANGUAGE) {
  return languageCode.split('-')[1]
}
