import { FilmCardList } from '@/components/film-card-list'
import { FilmSearchFilter } from '@/components/film-search-filter'
import { UserFilmListDisplay } from '@/components/film-user-card-list'
import { Reviews } from '@/components/reviews'
import { Button, buttonVariants } from '@/components/ui/button'
import { db } from '@/lib/db'
import { cn } from '@/lib/utils/utils'
import * as dotenv from 'dotenv'
import Link from 'next/link'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { getPopular } from '@/lib/tmdb/src/tmdb'
dotenv.config()

export const metadata = {
  title: 'Films Search Page',
  description: 'Find all your preferred films here.',
}

export default async function SearchFilmsPage() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['popularMovies'],
    queryFn: () => getPopular({ category: 'movie', page: '1' }),
  })
  const dehydratedState = dehydrate(queryClient)

  return (
    <div className={cn('grid gap-8')}>
      <div className="flex items-center justify-center gap-4 justify-self-start">
        <h2 className="text-lg uppercase">Browse by:</h2>
        <FilmSearchFilter />
      </div>
      <section className="">
        <div className="flex items-center justify-between justify-items-center">
          <h2 className="text-md mb-2 uppercase text-muted-foreground">
            Films
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
        <HydrationBoundary state={dehydratedState}>
          <FilmCardList
            // limit={12}
            columnsCount={12}
            aspectRatio={'portrait'}
            width={92}
            movieImageWidth="w92"
            isSlider={false}
            isSnapped={false}
          />
        </HydrationBoundary>
      </section>
      <div className="flex gap-2 justify-self-end">
        <Button>Prev</Button>
        <Button>Next</Button>
      </div>
    </div>
  )
}
