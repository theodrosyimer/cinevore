'use client'

import { getPopular } from '@/lib/tmdb/src/tmdb'
import { useQuery } from '@tanstack/react-query'

async function getFilms() {
  const data = await getPopular({ category: 'movie', page: '2' })

  return data
}

export function useFilms() {
  const filmsData = useQuery({
    queryKey: ['films'],
    queryFn: getFilms,
  })
  return filmsData
}
