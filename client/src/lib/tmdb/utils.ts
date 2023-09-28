export function mergeSearchParamsToUrl(url: (string | URL), searchParamsObject: Record<string, string> | URLSearchParams) {
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
