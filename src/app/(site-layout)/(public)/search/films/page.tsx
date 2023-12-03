import { FilmCardList } from '@/components/film/film-card-list'
import { FilmSearchFilter } from '@/components/search-filter/search-filter'
import { FilmSearchFilterPopover } from '@/components/search-filter/search-filter-popover'
import { Button, buttonVariants } from '@/components/ui/button'
import { getPopular } from '@/lib/tmdb/src/tmdb'
import { cn } from '@/lib/utils/utils'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import Link from 'next/link'

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
      <div className="hidden items-center justify-center gap-4 justify-self-start md:flex">
        <h2 className="uppercase md:text-lg">Browse by:</h2>
        <FilmSearchFilter />
      </div>
      <div className="flex items-center justify-center gap-4 justify-self-end md:hidden">
        <FilmSearchFilterPopover />
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
