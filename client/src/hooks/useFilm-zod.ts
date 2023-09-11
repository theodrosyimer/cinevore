import { useQuery } from "@tanstack/react-query"
import { z } from "zod"

export const filmSchema = z.object({
  episode_id: z.number(),
  title: z.string(),
  opening_crawl: z.string(),
})

export type Film = z.infer<typeof filmSchema>

async function getFilm(id: number) {
  const data = await fetch(`https://swapi.dev/api/films/${id}`).then((res) => res.json())
  return filmSchema.parse(data.results)
}

export function useFilm(id: number) {
  const filmData = useQuery({
    queryKey: ['film', id],
    queryFn: () => getFilm(id),
  })
  return filmData
}

