import { FilmCardList } from '@/components/film-card-list'
import { FilmSearchFilter } from '@/components/film-search-filter'
import { Reviews } from '@/components/reviews'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils/utils'
import * as dotenv from 'dotenv'
import Link from 'next/link'
dotenv.config()

export const metadata = {
  title: 'Films Search Page',
  description: 'Find all your preferred films here.',
}

export default function FilmsPage({
  params,
}: {
  params: { username: string }
}) {
  return (
    <div className={cn('grid')}>
      <div className="flex items-center justify-center gap-4 justify-self-center">
        <h2 className="text-xl uppercase">Filter by:</h2>
        <FilmSearchFilter />
      </div>
      <section className="">
        <div className="flex items-center justify-between justify-items-center">
          <h2 className="text-md mb-2 uppercase text-muted-foreground">
            Just Reviewed...
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
        <div className="divide-y divide-border rounded-md border "></div>
        <FilmCardList
          aspectRatio={'portrait'}
          width={185}
          movieImageWidth="w185"
          isSlider={true}
          isSnapped={false}
        />
      </section>
    </div>
  )
}
