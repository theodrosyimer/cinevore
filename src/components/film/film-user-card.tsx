/* eslint-disable @next/next/no-img-element */
import { cn } from '@/lib/utils/utils'

import {
  type TMDBImageSizesCategory,
  type TMDBImageSizesCategoryKey,
} from '@/lib/tmdb/types/tmdb-api'
import { generateTMDBImageUrl } from '@/lib/tmdb/src/utils'
import { type SelectMovie } from '@/types/db'

export interface MovieArtworkProps
  extends React.HTMLAttributes<HTMLDivElement> {
  movie: SelectMovie
  movieImageWidth: TMDBImageSizesCategory[keyof TMDBImageSizesCategory]
  aspectRatio: 'portrait' | 'video'
  width: number
  // width: LT<T>
  layout?: 'fill' | 'fixed' | 'responsive' | 'intrinsic'
}

type T = TMDBImageSizesCategory[keyof TMDBImageSizesCategory]

type LT<T extends string> = T extends `w${infer Width}` ? Width : never

const a: LT<T> = '154'

export function FilmCardDisplay({
  movie,
  movieImageWidth,
  aspectRatio,
  width,
  layout,
  className,
  ...props
}: MovieArtworkProps) {
  let imageUrl: string | undefined

  let kind: TMDBImageSizesCategoryKey
  let size: TMDBImageSizesCategory[typeof kind] = 'w300'

  // console.log('WIDTH:', width)
  if (aspectRatio === 'portrait') {
    kind = 'poster_sizes'
    size = movieImageWidth // 'w154'
    imageUrl = generateTMDBImageUrl({
      format: kind,
      // TODO: fix this type
      // @ts-expect-error - fix type
      size: movieImageWidth,
      defaultImage: movie.posterPath,
    })
  }

  if (aspectRatio === 'video') {
    kind = 'backdrop_sizes'
    size = movieImageWidth // 'w300'
    imageUrl = generateTMDBImageUrl({
      format: kind,
      // TODO: fix this type
      // @ts-expect-error - fix type
      size: movieImageWidth,
      defaultImage: movie.backdropPath,
    })
  }

  return (
    <div
      className={cn(
        `group relative grid w-[154px] gap-2 overflow-hidden rounded-md shadow-2xl`,
        className,
      )}
      {...props}
    >
      <img
        src={imageUrl}
        // TODO: get the title instead of the tmdbId
        alt={movie.tmdbId.toString()}
        width={width}
        lang="en"
        className={cn(
          'h-auto w-auto rounded-md object-cover transition-all focus:rounded-md ',
          aspectRatio === 'portrait' ? 'aspect-[0.667]' : 'aspect-video',
          `w-[${size.slice(1)}px]`,
        )}
      />
    </div>
  )
}
