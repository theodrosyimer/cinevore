'use client'

import Loading from '@/app/(site-layout)/loading'
import { CardSkeleton } from '@/components/card-skeleton'
import { MovieArtwork, MovieArtworkProps } from '@/components/film-artwork'
import { toast } from '@/components/ui/use-toast'
import { movie } from '@/db-planetscale/movies'
import { useFilms } from '@/hooks/useFilms-zod'
import { getImageFormatSize } from '@/lib/tmdb/src/utils'
import { TMDBImageSizesCategory } from '@/lib/tmdb/types/tmdb-api'
import { cn, handleSlug, slugify } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

export type FilmCardProps = Pick<MovieArtworkProps, 'aspectRatio'> & {
  limit?: number,
  className?: string
  width: TMDBImageSizesCategory[keyof TMDBImageSizesCategory]
}

export function FilmCardList({ limit = 14, className, aspectRatio, width }: FilmCardProps = {} as MovieArtworkProps) {
  const router = useRouter()
  const { data: films, isLoading } = useFilms()

  const handleTitleSlug = useCallback(handleSlug, [])

  if (isLoading) {
    return <CardSkeleton />
  }

  if (!films) {
    return <div>No films found</div>
  }

  if (limit) {
    films.results = films.results.slice(0, limit)
  }

  return (
    <>
      {films.results.map((film) => (
        // <FilmCard key={film.id} film={film} />
        <MovieArtwork
          key={film.id}
          movieId={film.id.toString()}
          movie={film}
          className={cn('', className)}
          aspectRatio={aspectRatio ?? 'portrait'}
          width={getImageFormatSize('poster_sizes', width)}
          height={120}
          onClick={(e) => {
            e.preventDefault()
            router.push(
              `/film/${handleTitleSlug(film?.title ?? '')?.slug}/?id=${film.id}`
            )
          }}
        />
      ))}
    </>
  )
}
