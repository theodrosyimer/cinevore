/* eslint-disable @next/next/no-img-element */
import { cn } from '@/lib/utils/utils'

import {
  type SearchMovie,
  type TMDBImageSizesCategory,
  type TMDBImageSizesCategoryKey,
} from '@/lib/tmdb/types/tmdb-api'
import { generateTMDBImageUrl } from '@/lib/tmdb/src/utils'
import { MovieMenubar } from '@/components/film/film-menubar'
import Link from 'next/link'
import { handleSlug } from '@/lib/utils/slugify'

export interface MovieArtworkProps
  extends React.HTMLAttributes<HTMLDivElement> {
  movie: SearchMovie
  movieImageWidth: TMDBImageSizesCategory[keyof TMDBImageSizesCategory]
  aspectRatio: 'portrait' | 'video'
  // width: LT<T>
  hasMenu?: boolean
  layout?: 'fill' | 'fixed' | 'responsive' | 'intrinsic'
}

type T = TMDBImageSizesCategory[keyof TMDBImageSizesCategory]

const gridColumnsConfig = {
  video: {
    300: 'film-backdrop-300',
    780: 'film-backdrop-780',
    1280: 'film-backdrop-1280',
  },
  portrait: {
    92: 'film-poster-92',
    154: 'film-poster-154',
    185: 'film-poster-185',
    342: 'film-poster-342',
    500: 'film-poster-500',
    780: 'film-poster-780',
  },
} as const

export function UserFilmCard({
  movie,
  movieImageWidth,
  aspectRatio,
  layout,
  className,
  hasMenu = true,
  ...props
}: MovieArtworkProps) {
  let imageUrl: string | undefined

  let kind: TMDBImageSizesCategoryKey

  const calculatedWidth = movieImageWidth.slice(1)

  // console.log('calculatedWidth:', calculatedWidth)

  // console.log('WIDTH:', width)
  if (aspectRatio === 'portrait') {
    kind = 'poster_sizes'
    imageUrl = generateTMDBImageUrl({
      format: kind,
      // TODO: fix this type
      // @ts-expect-error - fix type
      size: `w${calculatedWidth}`,
      defaultImage: movie.poster_path!,
    })
  }

  if (aspectRatio === 'video') {
    kind = 'backdrop_sizes'
    imageUrl = generateTMDBImageUrl({
      format: kind,
      // TODO: fix this type
      // @ts-expect-error - fix type
      size: `w${calculatedWidth}`,
      defaultImage: movie.backdrop_path!,
    })
  }

  return (
    <div
      className={cn(
        `group relative grid gap-2 overflow-hidden rounded-md w-${
          gridColumnsConfig[aspectRatio][
            +calculatedWidth as keyof (typeof gridColumnsConfig)[typeof aspectRatio]
          ]
        }`,
        className,
      )}
      {...props}
    >
      <Link
        href={`/film/${handleSlug(movie?.title ?? '')}/?id=${movie.id}`}
        // tabindex="-1"
      >
        <img
          src={imageUrl}
          alt={movie.title}
          width={Number(calculatedWidth)}
          lang="en"
          className={cn(
            'h-auto w-auto rounded-md object-cover transition-all hover:brightness-50 focus:rounded-md',
            hasMenu ? 'hover:cursor-pointer ' : '',
            aspectRatio === 'portrait' ? 'aspect-[0.667]' : 'aspect-video',
          )}
        />
      </Link>
      {hasMenu && (
        <MovieMenubar className="invisible absolute bottom-0 w-[98%] justify-self-center group-hover:visible" />
      )}
    </div>
  )
}
