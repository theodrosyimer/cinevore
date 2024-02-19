import { CardSkeleton } from '@/components/card-skeleton'
import { MovieArtworkProps } from '@/components/film/film-card'
import { gridColumnsConfig } from '@/components/film/film-card-list'
import { FilmCardDisplay } from '@/components/film/film-user-card'
import { getPopular } from '@/lib/tmdb/src/tmdb'
import { getImageFormatSize } from '@/lib/tmdb/src/utils'
import { TMDBImageSizesCategory } from '@/lib/tmdb/types/tmdb-api'
import { cn } from '@/lib/utils/utils'

export interface FilmCardProps extends Pick<MovieArtworkProps, 'aspectRatio'> {
  limit?: keyof typeof gridColumnsConfig

  className?: string
  width?: number
  movieImageWidth: TMDBImageSizesCategory[keyof TMDBImageSizesCategory]
}

export interface FilmListOptions {
  isSlider: boolean
  isSnapped?: boolean
}

export async function UserFilmListDisplay(
  {
    limit = 8,
    className,
    aspectRatio,
    width,
    movieImageWidth,
    isSlider = false,
    isSnapped = false,
  }: FilmCardProps & FilmListOptions = {} as FilmCardProps & FilmListOptions,
) {

  // if (isLoading) {
  //   return <CardSkeleton />
  // }

  const films = await getPopular({ category: 'movie', page: '3' })
  if (!films) {
    return <div>No films found</div>
  }

  if (limit) {
    films.results = films.results.slice(0, limit)
  }

  return (
    <>
      <div
        className={cn(
          'grid',
          isSlider
            ? `grid-cols-11 gap-4 overflow-x-hidden overscroll-x-contain`
            : `grid-cols-[${films.results.length}] gap-4`,
          isSnapped ? 'snap-x snap-mandatory' : '',
        )}
      >
        {films.results.map((film) => (
          <FilmCardDisplay
            key={film.id}
            // movie={film}
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
            hasMenu={false}
          />
        ))}
      </div>
    </>
  )
}
