import { CardSkeleton } from '@/components/card-skeleton'
import { FilmCard, type MovieArtworkProps } from '@/components/film/film-card'
import { getImageFormatSize } from '@/lib/tmdb/src/utils'
import { type TMDBImageSizesCategory } from '@/lib/tmdb/types/tmdb-api'
import { cn } from '@/lib/utils/utils'
import { getPopular } from '@/lib/tmdb/src/tmdb'

export interface FilmCardProps extends Pick<MovieArtworkProps, 'aspectRatio'> {
  columnsCount: keyof typeof gridColumnsConfig
  movieImageWidth: TMDBImageSizesCategory[keyof TMDBImageSizesCategory]
  limit?: keyof typeof gridColumnsConfig
  width?: number
  hasMenu?: boolean
  className?: string
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

export async function FilmCardList(
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
  }: FilmCardProps & FilmListOptions = {} as FilmCardProps & FilmListOptions,
) {
  // if (isLoading) {
  //   return <CardSkeleton />
  // }

  const films = await getPopular({ category: 'movie', page: '1' })

  if (!films) {
    return <div>No films found</div>
  }

  // if (limit) {
  //   films.results = films.results.slice(0, limit)
  // }

  return (
    <div className="relative grid grid-flow-col grid-cols-[12] gap-2 overflow-x-auto overscroll-x-contain hover:rounded-md">
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
            // @ts-expect-error - fix type
            width={width}
            movieImageWidth={getImageFormatSize(
              'poster_sizes',
              // TODO: fix `movieImageWidth` type
              // @ts-expect-error - fix type
              movieImageWidth,
            )}
            hasMenu={hasMenu}
          />
        ))}
      </article>
    </div>
  )
}
