import { LANGUAGE } from '../constants/languages'

export type GlobalConfig = {
  API_KEY: string
  API_VERSION: '3' | '4'
  BASE_URI: string
  IMDB_BASE_URI: string
  IMAGE_BASE_URI_HTTP: string
  IMAGE_BASE_URI: string
  language: LANGUAGE
  timeout?: number
}

export type GlobalConfigKey = keyof GlobalConfig
export type MovieCategory = 'movie'
export type TvShowCategory = 'tv'
export type SearchCategory = 'search'
export type DiscoverCategory = 'discover'
export type OtherCategory = 'person' | 'company'
export type CommonFilterCategory =
  | 'popular'
  | 'top_rated'
  | 'upcoming' /*  | 'latest' */
export type MovieFilterCategory = CommonFilterCategory | 'now_playing'
export type TvFilterCategory =
  | CommonFilterCategory
  | 'airing_today'
  | 'on_the_air'
export type SearchFilterCategory = MovieCategory | TvShowCategory | 'multi'

export type RouteSegment =
  | `${MovieCategory}/${string}`
  | `${TvShowCategory}/${string}`
  | `${OtherCategory}/${string}`
  | `${MovieCategory}/${CommonFilterCategory}`
  | `${TvShowCategory}/${CommonFilterCategory}`
  | `${MovieCategory}/${MovieFilterCategory}`
  | `${TvShowCategory}/${TvFilterCategory}`
  | `${SearchCategory}/${SearchFilterCategory}`
  | `${DiscoverCategory}/${MovieCategory}`
  | `${DiscoverCategory}/${TvShowCategory}`

export type QueryOptions = {
  query?: string
  id?: string
  page?: string
  body?: Record<string, string>
  category: MovieCategory | TvShowCategory
  language?: LANGUAGE
  filters?: MovieSearchFilters
}

export type MovieSearchFilters = {
  year?: string
  rating?: string
  popular?: string
  genre?: string
  service?: string
}

export type QueryOptionsWithoutBodyAndCategory = Omit<
  QueryOptions,
  'body' | 'category' | 'filters'
>

export type OptionalQueryOptions = {
  append_to_response?: 'videos,images,credits'
  include_image_language?: string // TODO: replace with LANGUAGES
  include_video_language?: string // TODO: replace with LANGUAGES
}
