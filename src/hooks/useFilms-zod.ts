'use client'

import { getPopular } from '@/lib/tmdb/src/tmdb'
import { promiseAllAbort, promiseRaceAbort } from '@/lib/tmdb/src/utils'
import { TMDBMovieResponse } from '@/lib/tmdb/types/tmdb-api'
import { useQuery } from '@tanstack/react-query'

async function getFilms() {
  // const [page1, page2, page3] = promiseAllAbort([
  //   () => getPopular({ category: 'movie', page: '1' }),
  //   () => getPopular({ category: 'movie', page: '2' }),
  //   () => getPopular({ category: 'movie', page: '3' }),
  // ])
  const data = await getPopular({ category: 'movie', page: '3' })
  return data
  // console.log('page1', page1)
  // return [page1, page2, page3] /*  as TMDBMovieResponse */
}

export function useFilms() {
  const filmsData = useQuery({
    queryKey: ['films'],
    queryFn: getFilms,
  })
  return filmsData
}
