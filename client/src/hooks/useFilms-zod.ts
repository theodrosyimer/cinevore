import { getPopular } from "@/lib/tmdb/tmdb"
import { useQuery } from "@tanstack/react-query"

async function getFilms() {
  const data = await getPopular({ category: 'movie' })

  return data
}

export function useFilms() {
  const filmsData = useQuery({
    queryKey: ['films'],
    queryFn: getFilms,
  })
  return filmsData
}
