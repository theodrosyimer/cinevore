'use client'

import { CardSkeleton } from '@/components/card-skeleton'
import { FilmCard, MovieArtworkProps } from '@/components/film-card'
import { FilmCardDisplay } from '@/components/film-user-card'
import { UserInfos } from '@/components/user-infos'
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
import { z } from 'zod'

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
    user?: SelectUser
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

  let zindex = filmList.movies.length + 1

  return (
    <>
      <div className="grid gap-2">
        <article
          className={cn(
            'relative grid overflow-x-hidden overscroll-x-contain transition-all hover:z-50 hover:scale-[1.01] hover:brightness-75',
            `grid-cols-12 z-[${zindex}]`,
          )}
        >
          {filmList.movies.map((filmList) => {
            zindex--
            return (
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
            )
          })}
        </article>
        <p>{filmList.title}</p>
        <UserInfos user={filmList.user!} showUserName={false} />
      </div>
    </>
  )
}
