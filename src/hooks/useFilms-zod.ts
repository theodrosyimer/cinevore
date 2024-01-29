'use client'

import { getPopular } from '@/lib/tmdb/src/tmdb'
import { useQuery } from '@tanstack/react-query'

export function useFilms() {
  const filmsData = useQuery({
    queryKey: ['films'],
    queryFn: ({signal}) => getPopular({ category: 'movie', page: '3' }, {signal}),
  })
  return filmsData
}
