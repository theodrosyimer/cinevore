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
  width: number
  // width: LT<T>
  hasMenu?: boolean
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
  hasMenu = true,
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
      size,
      defaultImage: movie.poster_path!,
    })
  }

  if (aspectRatio === 'video') {
    kind = 'backdrop_sizes'
    size = movieImageWidth // 'w300'
    imageUrl = generateTMDBImageUrl({
      format: kind,
      // TODO: fix this type
      // @ts-expect-error - fix type
      size,
      defaultImage: movie.backdrop_path!,
    })
  }

  return (
    <div
      className={cn(
        `group relative z-0 grid w-[154px] gap-2 overflow-hidden rounded-md shadow-2xl transition-all hover:z-50 hover:brightness-50`,
        className,
      )}
      {...props}
    >
      <Link
        href={`/film/${handleSlug(movie?.title ?? '')?.slug}/?id=${movie.id}`}
        // tabindex="-1"
        className={cn('w-[154px]')}
      >
        <img
          src={imageUrl}
          alt={movie.title}
          width={width}
          lang="en"
          className={cn(
            'h-auto w-auto rounded-md object-cover transition-all focus:rounded-md ',
            hasMenu ? 'hover:cursor-pointer ' : '',
            aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-video',
            `w-[${size.slice(1)}px]`,
          )}
        />
      </Link>
      {hasMenu && (
        <MovieMenubar className="invisible absolute bottom-0 w-[98%] justify-self-center group-hover:visible" />
      )}
    </div>
  )
}
