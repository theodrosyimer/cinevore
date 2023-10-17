'use client'

import { CardSkeleton } from '@/components/card-skeleton'
import { FilmCard, MovieArtworkProps } from '@/components/film-card'
import { FilmCardDisplay } from '@/components/film-user-card'
import { Icons } from '@/components/icons'
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
  SelectComment,
  SelectLike,
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
    user?: Omit<SelectUser, 'password'>
    likes?: SelectLike[]
    comments?: SelectComment[]
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
      <div className="relative grid gap-2 overflow-x-hidden hover:rounded-md">
        <article
          className={cn(
            `z-[${zindex}] grid grid-cols-[repeat(4,_minmax(0,_100px))] xs:grid-cols-[repeat(${limit},_minmax(0,_50px))] grid-rows-[min-content] overflow-x-hidden overscroll-x-contain rounded-md transition-all hover:z-50 hover:scale-[1.01]  hover:brightness-75`,
          )}
        >
          {filmList.movies.map((filmList) => {
            zindex--
            return (
              <FilmCardDisplay
                limit={limit}
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
            )
          })}
        </article>
        <p className="text-xl font-bold">{filmList.title}</p>
        <div className="flex items-center gap-6">
          <UserInfos
            user={filmList.user!}
            showUserName={false}
            avatarWidth={8}
          />
          <div className="flex gap-2">
            <div className="flex gap-1">
              <Icons.like width={20} />
              <span>{filmList.likes?.length ?? 0}</span>
            </div>
            <div className="flex gap-1">
              <Icons.comment width={20} />
              {filmList.comments?.length ?? 0}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
