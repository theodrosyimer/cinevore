'use client'

import { FilmCard } from "@/components/film-card"
import { useFilms } from "@/hooks/useFilms-zod"

export default function FilmCardList() {
  const { data: films, isLoading } = useFilms()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!films) {
    return <div>No films found</div>
  }

  return (
    <div className="container grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {films.results.map((film) => (
        <FilmCard key={film.id} film={film} />
      ))}
    </div>
  )
}
