import { useQuery } from "@tanstack/react-query"

export type Film = {
  title: string
}

export function useFilms() {
  const filmsData = useQuery<Film>(['films'], async () => {
    const res = await fetch('https://swapi.dev/api/films')
    return await res.json()
  })
  return filmsData as Film[]
}
