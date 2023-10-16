'use client'

import { CardSkeleton } from '@/components/card-skeleton'
import { FilmCard, MovieArtworkProps } from '@/components/film-card'
import { FilmCardDisplay } from '@/components/film-user-card'
import { useFilms } from '@/hooks/useFilms-zod'
import { getImageFormatSize } from '@/lib/tmdb/src/utils'
import {
  TMDBImageSizesCategory,
  TMDBMovieResponse,
} from '@/lib/tmdb/types/tmdb-api'
import { handleSlug } from '@/lib/utils/slugify'
import { cn } from '@/lib/utils/utils'
import {
  SelectList,
  SelectMovie,
  SelectMovieList,
  SelectUser,
} from '@/types/db'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

export interface FilmCardProps extends Pick<MovieArtworkProps, 'aspectRatio'> {
  limit?: number
  className?: string
  width?: number
  movieImageWidth: TMDBImageSizesCategory[keyof TMDBImageSizesCategory]
  filmList: SelectList & {
    movies: {
      movieId: number
      listId: number
      addedAt: Date
      movie: SelectMovie
    }[]
    user?: Pick<SelectUser, 'name'>
  }
}
export function UserFilmListDisplay(
  {
    limit = 4,
    className,
    aspectRatio,
    width,
    movieImageWidth,
    filmList,
  }: FilmCardProps = {} as FilmCardProps,
) {
  // const { data: filmList, isLoading } = useFilms()

  // if (isLoading) {
  //   return <CardSkeleton />
  // }

  // if (!filmList) {
  //   return <div>No filmList found</div>
  // }

  if (limit) {
    filmList.movies = filmList.movies.slice(0, limit)
  }

  return (
    <>
      <article
        className={cn(
          'grid overflow-x-hidden overscroll-x-contain transition-all hover:z-50 hover:scale-[1.01] hover:brightness-75',
          `w-[44rem] grid-cols-12`,
        )}
      >
        {filmList.movies.map((filmList) => (
          <>
            {' '}
            <FilmCardDisplay
              key={filmList.movie.tmdbId}
              movie={filmList.movie}
              className={cn('', className)}
              aspectRatio={aspectRatio ?? 'portrait'}
              // TODO: fix `width` type
              // @ts-ignore
              width={width}
              movieImageWidth={getImageFormatSize(
                'poster_sizes',
                // @ts-ignore
                movieImageWidth,
              )}
            />
          </>
        ))}
        <p>{filmList.user?.name}</p>
      </article>
    </>
  )
}
