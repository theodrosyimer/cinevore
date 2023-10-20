'use client'
import { CardSkeleton } from '@/components/card-skeleton'
import { FilmCard, MovieArtworkProps } from '@/components/film-card'
import { getImageFormatSize } from '@/lib/tmdb/src/utils'
import { TMDBImageSizesCategory } from '@/lib/tmdb/types/tmdb-api'
import { cn } from '@/lib/utils/utils'
import { getPersonByID, getPopular, searchByID } from '@/lib/tmdb/src/tmdb'
import { useQuery } from '@tanstack/react-query'
import { MovieCast } from '@/lib/tmdb/types/tmdb-api-movie-details'

export interface FilmCardProps extends Pick<MovieArtworkProps, 'aspectRatio'> {
  columnsCount: keyof typeof gridColumnsConfig
  movieImageWidth: TMDBImageSizesCategory[keyof TMDBImageSizesCategory]
  limit?: keyof typeof gridColumnsConfig
  width?: number
  hasMenu?: boolean
  className?: string
  moviesCredits: MovieCast[]
}

export interface FilmListOptions {
  isSlider: boolean
  isSnapped?: boolean
}

export const gridColumnsConfig = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  7: 'grid-cols-7',
  8: 'grid-cols-8',
  9: 'grid-cols-9',
  10: 'grid-cols-10',
  11: 'grid-cols-11',
  12: 'grid-cols-12',
  13: 'grid-cols-[13]',
  14: 'grid-cols-[14]',
} as const

export async function ActorFilmCardList(
  {
    limit,
    className,
    aspectRatio,
    width,
    movieImageWidth,
    isSlider = true,
    isSnapped = true,
    hasMenu = false,
    columnsCount,
    moviesCredits,
  }: FilmCardProps & FilmListOptions = {} as FilmCardProps & FilmListOptions,
) {
  // const { data: films, isLoading } = useQuery({
  //   queryKey: ['personCredits'],
  //   queryFn: () => getPersonByID({ id }),
  // })
  // // const { data: films, isLoading } = useFilms()

  // if (isLoading) {
  //   return <CardSkeleton />
  // }

  // if (!films) {
  //   return <div>No films found</div>
  // }

  // if (limit) {
  //   films.results = films.results.slice(0, limit)
  // }

  // {
  //   moviesCredits.map(async (movie) => {
  //     const film = await searchByID({
  //       id: movie.id.toString(),
  //       category: 'movie',
  //     }).catch((error) => {
  //       console.log(error.message)
  //     })

  //     if (!film) return

  //     return (
  //       // TODO: fix this type error
  //       // @ts-ignore
  //       <Review key={movie.id} review={movie} film={film} />
  //     )
  //   })
  // }

  return (
    <>
      <div className="relative grid w-full gap-2 overflow-x-hidden hover:rounded-md">
        <article
          className={cn(
            'grid',
            isSlider
              ? `${
                  gridColumnsConfig[
                    columnsCount as keyof typeof gridColumnsConfig
                  ]
                } gap-4 overflow-x-auto overscroll-x-contain`
              : `${
                  gridColumnsConfig[
                    columnsCount as keyof typeof gridColumnsConfig
                  ]
                } gap-4`,
            isSnapped ? 'snap-x snap-mandatory' : '',
          )}
        >
          {films.results.map((film) => (
            <FilmCard
              key={film.id}
              movie={film}
              className={cn('', isSnapped ? 'snap-start' : '', className)}
              aspectRatio={aspectRatio ?? 'portrait'}
              // TODO: fix `width` type
              // @ts-ignore
              width={width}
              movieImageWidth={getImageFormatSize(
                'poster_sizes',
                // @ts-ignore
                movieImageWidth,
              )}
              hasMenu={hasMenu}
            />
          ))}
        </article>
      </div>
    </>
  )
}
