import { useQuery } from "@tanstack/react-query"

export type Film = {
  title: string
}

export function useFilms() {
  const filmsData = useQuery<Film>({
    queryKey: ['films'],
    queryFn: async () => {
      const data = await fetch('https://swapi.dev/api/films').then(res => res.json())
      return data
    }
  })
  return filmsData
}
