import { Lists } from '@/app/(site-layout)/(public)/lists/lists'
import { UserFilmListDisplay } from '@/components/film-user-card-list'
import { Reviews } from '@/components/reviews'
import { Button, buttonVariants } from '@/components/ui/button'
import { db } from '@/lib/db'
import { handleSlug } from '@/lib/utils/slugify'
import { cn } from '@/lib/utils/utils'
import Link from 'next/link'

export const metadata = {
  title: 'Lists Page',
  description: 'Your lists of films.',
}

export default async function ListsPage() {
  let limit = 4
  const userLists = await db.query.list.findMany({
    with: {
      movies: {
        with: {
          movie: true,
        },
      },
      user: {
        columns: {
          password: false,
        },
      },
    },
  })

  if (!userLists.length) {
    return <div>No lists found</div>
  }

  // console.log('USER LISTS:', JSON.stringify(userLists, null, 2))

  return (
    <>
      <div className="w-full">
        <section className="mb-12 grid gap-6">
          <h1 className="text-center text-3xl text-muted-foreground">
            Collect, curate, and share. Lists are the perfect way to group
            films.
          </h1>
          <Link
            href="/list/new"
            className={cn(
              'w-max justify-self-center',
              buttonVariants({ variant: 'default' }),
            )}
          >
            Start your own list
          </Link>
        </section>
        {/* <Lists /> */}
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {userLists.map((list) => (
            <Link
              key={list.id}
              href={`/members/${list.user.name}/list/${handleSlug(list.title)
                ?.slug}/?id=${list.id}`}
              className="justify-self-center"
            >
              {' '}
              <UserFilmListDisplay
                filmList={list}
                limit={4}
                // colsCount={10}
                aspectRatio={'portrait'}
                // width={185}
                movieImageWidth="w185"
              />
            </Link>
          ))}
        </section>
        <div className="mt-12 grid gap-20 lg:grid-cols-3">
          <section className="lg:col-span-2 lg:row-span-2">
            <div className="flex items-center justify-between justify-items-center">
              <h2 className="text-md mb-2 uppercase text-muted-foreground">
                Recently Liked
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
            <UserFilmListDisplay
              filmList={userLists[0]!}
              limit={4}
              // colsCount={10}
              aspectRatio={'portrait'}
              // width={185}
              movieImageWidth="w185"
            />
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
            <div className="divide-y divide-border rounded-md border "></div>
          </section>
          <section className="">
            <div className="flex items-center justify-between justify-items-center">
              <h2 className="text-md mb-2 uppercase text-muted-foreground">
                Popular Lists
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
            <div className="divide-y divide-border rounded-md border"></div>
          </section>
        </div>
        <section className="flex items-center justify-between justify-items-center">
          <h2 className="text-md mb-2 uppercase text-muted-foreground">
            Recently Added
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
        </section>
        <div className="divide-y divide-border rounded-md border "></div>
      </div>
    </>
  )
}
