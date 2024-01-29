import { searchByID } from '@/lib/tmdb/src/tmdb'
import { useQuery } from '@tanstack/react-query'

export function useFilm(id: string) {
  const filmData = useQuery({
    queryKey: ['film', id],
    queryFn: ( {signal}) => searchByID({ id, category: 'movie' }, { signal }),
  })
  return filmData
}
