import { FilmCardList } from '@/components/film-card-list'
import { FilmSearchFilter } from '@/components/film-search-filter'
import { FilmSearchFilterPopover } from '@/components/film-search-filter-popover'
import { Reviews } from '@/components/reviews'
import { buttonVariants } from '@/components/ui/button'
import { db } from '@/lib/db'
import { cn } from '@/lib/utils/utils'
import * as dotenv from 'dotenv'
import Link from 'next/link'
dotenv.config()

export const metadata = {
  title: 'Films Search Page',
  description: 'Find all your preferred films here.'
}

export default async function FilmsPage() {
  return (
    <div className={cn('grid gap-8')}>
      <div className="hidden items-center justify-center gap-4 justify-self-start md:flex">
        <h2 className="uppercase md:text-lg">Browse by:</h2>
        <FilmSearchFilter />
      </div>
      <div className="flex items-center justify-center gap-4 justify-self-end md:hidden">
        <FilmSearchFilterPopover />
      </div>
      <FilmsPageDefaultContent />
    </div>
  )
}

async function FilmsPageDefaultContent() {
  const filmsReviewedByUsers = await db.query.movie.findMany({
    with: {
      movieReviews: {
        with: {
          movie: true,
          comments: true,
          likes: true,
          user: {
            columns: {
              password: false,
            },
          },
        },
      },
    },
  })

  if (!filmsReviewedByUsers.length) {
    return <div>No lists found</div>
  }

  return (
    <>
      <section className="">
        <div className="flex items-center justify-between justify-items-center">
          <h2 className="text-md mb-2 uppercase text-muted-foreground">
            Popular films this week
          </h2>
          <Link
            href={`${process.env.NEXT_PUBLIC_APP_URL}/reviews?sortBy=popular`}
            className={cn(
              'text-sm uppercase',
              buttonVariants({
                variant: 'link',
                className: 'pr-0 text-muted-foreground/50',
              }),
            )}
          >
            More
          </Link>
        </div>
        <div className="mb-4 divide-y divide-border rounded-md border"></div>
        <FilmCardList
          limit={4}
          columnsCount={4}
          aspectRatio={'portrait'}
          width={342}
          movieImageWidth="w342"
          isSlider={true}
          isSnapped={false}
        />
      </section>
      <section className="">
        <div className="flex items-center justify-between justify-items-center">
          <h2 className="text-md mb-2 uppercase text-muted-foreground">
            Just reviewed...
          </h2>
          <Link
            href={`${process.env.NEXT_PUBLIC_APP_URL}/reviews?sortBy=popular`}
            className={cn(
              'text-sm uppercase',
              buttonVariants({
                variant: 'link',
                className: 'pr-0 text-muted-foreground/50',
              }),
            )}
          >
            More
          </Link>
        </div>
        <div className="mb-4 divide-y divide-border rounded-md border"></div>
        <FilmCardList
          limit={12}
          columnsCount={12}
          aspectRatio={'portrait'}
          width={92}
          movieImageWidth="w92"
          isSlider={false}
          isSnapped={false}
        />
      </section>
      <div className="grid gap-20 lg:grid-cols-3">
        <section className="lg:col-span-2 lg:row-span-2">
          <div className="flex items-center justify-between justify-items-center">
            <h2 className="text-md mb-2 uppercase text-muted-foreground">
              Popular reviews this week
            </h2>
            <Link
              href={`${process.env.NEXT_PUBLIC_APP_URL}/reviews?sortBy=popular`}
              className={cn(
                'text-sm uppercase',
                buttonVariants({
                  variant: 'link',
                  className: 'pr-0 text-muted-foreground/50',
                }),
              )}
            >
              More
            </Link>
          </div>
          <div className="mb-4 divide-y divide-border  rounded-md border "></div>
          {/* {filmsReviewedByUsers[0]!.movieReviews.map((review) => {
            return (
              <FilmCardList
                key={review.movie.tmdbId}
                filmList={review.movie}
                limit={4}
                // colsCount={10}
                aspectRatio={'portrait'}
                // width={185}
                movieImageWidth="w185"
              />
            )
          })} */}
          <Reviews />
          {/* <UserFilmListDisplay
            filmList={filmsReviewedByUsers[0]!}
            limit={4}
            // colsCount={10}
            aspectRatio={'portrait'}
            // width={185}
            movieImageWidth="w185"
          /> */}
        </section>
        <section className="">
          <div className="flex items-end justify-between justify-items-center">
            <h2 className="text-md mb-2 uppercase text-muted-foreground">
              Crew Picks
            </h2>
            <Link
              href={`${process.env.NEXT_PUBLIC_APP_URL}/lists?sortBy=popular`}
              className={cn(
                'text-sm uppercase',
                buttonVariants({
                  variant: 'link',
                  className: 'pr-0 text-muted-foreground/50',
                }),
              )}
            >
              More
            </Link>
          </div>
          <div className="mb-4 divide-y divide-border  rounded-md border "></div>
        </section>
        <section className="">
          <div className="flex items-center justify-between justify-items-center">
            <h2 className="text-md mb-2 uppercase text-muted-foreground">
              Popular reviewers
            </h2>
            <Link
              href={`${process.env.NEXT_PUBLIC_APP_URL}/members?sortBy=popular`}
              className={cn(
                'text-sm uppercase',
                buttonVariants({
                  variant: 'link',
                  className: 'pr-0 text-muted-foreground/50',
                }),
              )}
            >
              More
            </Link>
          </div>
          <div className="mb-4 divide-y divide-border  rounded-md border"></div>
        </section>
      </div>
    </>
  )
}
