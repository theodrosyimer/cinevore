import { MovieArtworkProps } from '@/components/film-card'
import { FilmCardDisplay } from '@/components/film-user-card'
import { Icons } from '@/components/icons'
import { UserInfos } from '@/components/user-infos'
import { getImageFormatSize } from '@/lib/tmdb/src/utils'
import { TMDBImageSizesCategory } from '@/lib/tmdb/types/tmdb-api'
import { cn } from '@/lib/utils/utils'
import {
  SelectComment,
  SelectLike,
  SelectList,
  SelectMovie,
  SelectUser,
} from '@/types/db'
import type { MouseEvent } from 'react'

export interface FilmCardProps extends Pick<MovieArtworkProps, 'aspectRatio'> {
  columnsCount: keyof (typeof gridColumnsConfig)['default' | 'xs']
  movieImageWidth: TMDBImageSizesCategory[keyof TMDBImageSizesCategory]
  limit?: keyof (typeof gridColumnsConfig)['default' | 'xs']
  width?: number
  className?: string
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

const gridColumnsConfig = {
  default: {
    1: 'grid-cols-[repeat1,_minmax(0,_100px))]',
    2: 'grid-cols-[repeat(2,_minmax(0,_100px))]',
    3: 'grid-cols-[repeat(3,_minmax(0,_100px))]',
    4: 'grid-cols-[repeat(4,_minmax(0,_100px))]',
    5: 'grid-cols-[repeat(5,_minmax(0,_100px))]',
    6: 'grid-cols-[repeat(6,_minmax(0,_100px))]',
    7: 'grid-cols-[repeat(7,_minmax(0,_100px))]',
    8: 'grid-cols-[repeat(8,_minmax(0,_100px))]',
    9: 'grid-cols-[repeat(9,_minmax(0,_100px))]',
    10: 'grid-cols-[repeat(10,_minmax(0,_100px))]',
    11: 'grid-cols-[repeat(11,_minmax(0,_100px))]',
    12: 'grid-cols-[repeat(12,_minmax(0,_100px))]',
    13: 'grid-cols-[repeat(13,_minmax(0,_100px))]',
    14: 'grid-cols-[repeat(14,_minmax(0,_100px))]',
  },
  xs: {
    1: 'grid-cols-[repeat(1,_minmax(0,_50px))]',
    2: 'grid-cols-[repeat(2,_minmax(0,_50px))]',
    3: 'grid-cols-[repeat(3,_minmax(0,_50px))]',
    4: 'grid-cols-[repeat(4,_minmax(0,_50px))]',
    5: 'grid-cols-[repeat(5,_minmax(0,_50px))]',
    6: 'grid-cols-[repeat(6,_minmax(0,_50px))]',
    7: 'grid-cols-[repeat(7,_minmax(0,_50px))]',
    8: 'grid-cols-[repeat(8,_minmax(0,_50px))]',
    9: 'grid-cols-[repeat(9,_minmax(0,_50px))]',
    10: 'grid-cols-[repeat(10,_minmax(0,_50px))]',
    11: 'grid-cols-[repeat(11,_minmax(0,_50px))]',
    12: 'grid-cols-[repeat(12,_minmax(0,_50px))]',
    13: 'grid-cols-[repeat(13,_minmax(0,_50px))]',
    14: 'grid-cols-[repeat(14,_minmax(0,_50px))]',
  },
} as const

const zindexConfig = {
  1: 'z-[1]',
  2: 'z-[2]',
  3: 'z-[3]',
  4: 'z-[4]',
  5: 'z-[5]',
  6: 'z-[6]',
  7: 'z-[7]',
  8: 'z-[8]',
  9: 'z-[9]',
  10: 'z-[10]',
  11: 'z-[11]',
  12: 'z-[12]',
  13: 'z-[13]',
  14: 'z-[14]',
} as const

export function UserFilmListDisplay(
  {
    limit,
    className,
    aspectRatio,
    width,
    movieImageWidth,
    filmList,
    columnsCount,
  }: FilmCardProps = {} as FilmCardProps,
) {
  let zindex = columnsCount
  console.log('FILMLIST:', filmList)
  if (limit) {
    filmList.movies = filmList?.movies?.slice(0, limit)
    zindex = limit
  }

  if (limit) {
    filmList.movies = filmList?.movies?.slice(0, limit)
    zindex = limit
  }

  function handleCLick(e: MouseEvent<HTMLDivElement, MouseEvent>) {
    console.log('clicked')
  }

  return (
    <>
      <div
        // onClick={(e) => handleCLick}
        className="relative grid gap-2 overflow-x-hidden hover:rounded-md"
      >
        <article
          className={cn(
            `grid ${
              gridColumnsConfig['default'][
                columnsCount as keyof (typeof gridColumnsConfig)['default']
              ]
            } xs:${
              gridColumnsConfig['xs'][
                columnsCount as keyof (typeof gridColumnsConfig)['xs']
              ]
            } grid-rows-[min-content] overflow-x-hidden overscroll-x-contain rounded-md transition-all hover:z-50 hover:scale-[1.01]  hover:brightness-75`,
          )}
        >
          {filmList?.movies?.map((filmList) => {
            zindex--
            return (
              <FilmCardDisplay
                limit={limit}
                key={filmList.movie.tmdbId}
                movie={filmList.movie}
                className={cn(
                  `${zindexConfig[zindex as keyof typeof zindexConfig]}`,
                  className,
                )}
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
            avatarWidth="h-8 w-8"
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
