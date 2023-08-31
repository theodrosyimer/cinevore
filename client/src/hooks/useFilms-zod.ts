import { useQuery } from "@tanstack/react-query"
import { z } from "zod"
import { filmSchema } from "./useFilm-zod"

export const filmsSchema = filmSchema.array()

export type Films = z.infer<typeof filmsSchema>

async function getFilms() {
  const data = await fetch(`https://swapi.dev/api/films`).then((res) => res.json())
  return filmsSchema.parse(data.results)
}

export function useFilms() {
  const filmData = useQuery({
    queryKey: ['films'],
    queryFn: () => getFilms(),
  })
  return filmData
}

