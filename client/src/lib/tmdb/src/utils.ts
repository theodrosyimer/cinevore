import { type RouteSegment, type QueryOptionsWithoutBodyAndCategory, globalConfig } from "./tmdb"

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

export function generateTMDBUrl(segment: RouteSegment, params: QueryOptionsWithoutBodyAndCategory) {

  const url = new URL(`${globalConfig.API_VERSION}/${segment}`, `${globalConfig.BASE_URI}`)

  const queries = {
    api_key: globalConfig.API_KEY,
    ...params,
  } satisfies QueryOptionsWithoutBodyAndCategory & { api_key: string }

  return mergeSearchParamsToUrl(url, new URLSearchParams(queries))
}
