'use client'

import { MovieArtwork } from "@/components/films-artwork-slider"
import { toast } from "@/components/ui/use-toast"
import { movie } from "@/db-planetscale/movies"
import { useFilms } from "@/hooks/useFilms-zod"
import { handleSlug, slugify } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useCallback } from "react"

export default function FilmCardList() {
  const router = useRouter()
  const { data: films, isLoading } = useFilms()

  const handleTitleSlug = useCallback(handleSlug, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!films) {
    return <div>No films found</div>
  }



  return (
    <>
      {films.results.map((film) => (
        // <FilmCard key={film.id} film={film} />
        <MovieArtwork
          key={film.id}
          movieId={film.id.toString()}
          movie={film}
          className=""
          aspectRatio="portrait"
          // layout="fill"
          width={250}
          height={330}
          onClick={e => {
            e.preventDefault()
            router.push(`/film/${handleTitleSlug(film?.title ?? '')?.slug}/?id=${film.id}`)
          }
          }
        />
      ))}
    </>
  )
}
