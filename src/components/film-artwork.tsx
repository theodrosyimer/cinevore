/* eslint-disable @next/next/no-img-element */
import * as dotenv from 'dotenv'
dotenv.config()
import Image from 'next/image'
import { PlusCircledIcon } from '@radix-ui/react-icons'

import { cn } from '@/lib/utils/utils'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'

import { Album } from '../data/albums'
import { playlists } from '../data/playlists'
import {
  SearchMovie,
  TMDBImageSizesCategory,
  TMDBImageSizesCategoryKey,
} from '@/lib/tmdb/types/tmdb-api'
import { generateTMDBImageUrl } from '@/lib/tmdb/src/utils'
import { MovieInfosPopover } from '@/components/user-movie-infos-popover'
import { AspectRatio } from '@/components/ui/aspect-ratio'

export interface MovieArtworkProps
  extends React.HTMLAttributes<HTMLDivElement> {
  movie: SearchMovie
  movieId: string
  aspectRatio: 'portrait' | 'video'
  width: TMDBImageSizesCategory[keyof TMDBImageSizesCategory]
  // width: LT<T>
  height?: number
  layout?: 'fill' | 'fixed' | 'responsive' | 'intrinsic'
}

type T = TMDBImageSizesCategory[keyof TMDBImageSizesCategory]

type LT<T extends string> = T extends `w${infer Width}` ? Width : never

let a: LT<T> = '154'
export type MovieArtworkPropsX<
  TImageFormat extends keyof TMDBImageSizesCategory,
> = MovieArtworkProps & {
  aspectRatio: TImageFormat
  width: TMDBImageSizesCategory[TImageFormat]
}
export function MovieArtwork({
  movie,
  movieId,
  aspectRatio,
  width,
  height,
  layout,
  className,
  ...props
}: MovieArtworkProps) {
  let imageUrl

  let kind: TMDBImageSizesCategoryKey
  let size: TMDBImageSizesCategory[typeof kind] = 'w300'

  // console.log('WIDTH:', width)
  if (aspectRatio === 'portrait') {
    kind = 'poster_sizes'
    // size = 'w154'
    // TODO: fix this type
    // @ts-ignore
    imageUrl = generateTMDBImageUrl({
      format: kind,
      size: width,
      defaultImage: movie.poster_path!,
    })
  }

  if (aspectRatio === 'video') {
    kind = 'backdrop_sizes'
    // size = 'w300'
    // TODO: fix this type
    // @ts-ignore
    imageUrl = generateTMDBImageUrl({
      format: kind,
      size: width,
      defaultImage: movie.backdrop_path!,
    })
  }

  return (
    <div className={cn('space-y-3', className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="overflow-hidden rounded-md">
            {/* <AspectRatio ratio={16 / 9} className={cn('bg-muted', className)}> */}
            <img
              src={imageUrl!}
              alt={movie.title!}
              width={width}
              height={height}
              lang="en"
              className={cn(
                'h-auto w-auto object-cover transition-all hover:scale-105',
                aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-video',
                `w-[${size.slice(1)}px]`,
              )}
            />
            {/* </AspectRatio> */}
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-40">
          <ContextMenuItem>Add to Watchlist</ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>Add to List</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem>
                <PlusCircledIcon className="mr-2 h-4 w-4" />
                New List
              </ContextMenuItem>
              <ContextMenuSeparator />
              {playlists.map((playlist) => (
                <ContextMenuItem key={playlist}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="mr-2 h-4 w-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 15V6M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM12 12H3M16 6H3M12 18H3" />
                  </svg>
                  {playlist}
                </ContextMenuItem>
              ))}
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem>Review</ContextMenuItem>
          <ContextMenuItem>Like</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      {/* <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{movie.title}</h3>
        <p className="text-xs text-muted-foreground">Popularity:{movie.popularity}</p>
      </div> */}
    </div>
  )
}
