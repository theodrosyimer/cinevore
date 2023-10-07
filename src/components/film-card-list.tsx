'use client'

import { MovieArtwork } from "@/components/films-artwork-slider"
import { toast } from "@/components/ui/use-toast"
import { movie } from "@/db-planetscale/movies"
import { useFilms } from "@/hooks/useFilms-zod"
import { slugify } from "@/lib/utils"
import { useRouter } from "next/navigation"

export default function FilmCardList() {
  const router = useRouter()
  const { data: films, isLoading } = useFilms()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!films) {
    return <div>No films found</div>
  }

  function handleTitleSlug(title: string) {
    const result = slugify(title)
    if ('error' in result) {
      console.log(result.error)
      toast({
        title: result.error.name,
        description: result.error.message,
      })
      return
    }
    if (result) {
      return slugify(title) as { slug: string }
    }
  }
  return (
    <>
      {films.results.map((film) => (
        // <FilmCard key={film.id} film={film} />
        <MovieArtwork
          key={film.id}
          // movieId={film.id.toString()}
          movie={film}
          // className="w-[250px]"
          aspectRatio="portrait"
          // layout="fill"
          width={250}
          height={330}
          onClick={e => {
            e.preventDefault()
            console.log('Image clicked!')
            router.push(`/film/${handleTitleSlug(film?.title ?? '')?.slug}`)
          }
          }
        />
      ))}
    </>
  )
}
