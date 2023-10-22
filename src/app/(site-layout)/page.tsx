import Link from 'next/link'

// import { env } from "@env.mjs"
import { MovieBackdrop } from '@/components/film-backdrop'
import { FilmCardList } from '@/components/film-card-list'
import { Icons } from '@/components/icons'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription } from '@/components/ui/card'
import { featuresConfig } from '@/config/features'
import { globalConfig } from '@/lib/tmdb/src/tmdb'
import { cn } from '@/lib/utils/utils'
import { Reviews } from '@/components/reviews'
import { getImageFormatSize } from '@/lib/tmdb/src/utils'

export const metadata = {
  title: 'Home Page',
  description: 'Welcome to Cinevore, the social network for film lovers',
}
export default async function IndexPage() {
  return (
    <>
      <div className="grid gap-12">
        <div className="relative -mt-14 grid">
          <MovieBackdrop
            url={`${globalConfig.IMAGE_BASE_URI}/w1280/nuO8o9ltxhI7AZQxePavEZ4TyHa.jpg`}
            altText="training day backdrop image"
            className="rounded-b-md opacity-40"
          ></MovieBackdrop>
          <section className="absolute grid items-center justify-items-start gap-4 self-end sm:left-16 md:self-center">
            <div className="grid gap-2">
              <h1 className="text-left font-bold sm:text-xl md:text-3xl lg:text-4xl">
                Track films you&apos;ve watched.
                <br />
                Save those you want to see.
                <br />
                Rate and review them.
                <br />
                Tell your friends what you think.
              </h1>
              <p className="text-left text-xs text-muted-foreground sm:text-sm md:text-lg lg:text-xl">
                Cinevore, the social network for film lovers. Join us today!
              </p>
              <div className="flex justify-end gap-4">
                <Link
                  href="/register"
                  className={cn(buttonVariants({ variant: 'default' }))}
                >
                  Get Started
                </Link>
                <Link
                  href="/films"
                  className={cn(buttonVariants({ variant: 'secondary' }))}
                >
                  Browse Films
                </Link>
              </div>
            </div>
          </section>
        </div>
        <section>
          <FilmCardList
            limit={4}
            columnsCount={4}
            aspectRatio="portrait"
            width={342}
            movieImageWidth={getImageFormatSize('poster_sizes', 'w342')}
            isSlider={false}
            hasMenu={true}
          />
        </section>
        <section>
          <h2
            id="features"
            className="text-md mb-2 scroll-mt-20 uppercase text-muted-foreground"
          >
            Cinevore lets you
          </h2>
          <div className="grid grid-cols-1 gap-2  sm:grid-cols-2 lg:grid-cols-3">
            {/* {featuresConfig.map((feature, index) => {
              let icon = Icons[feature.icon]
              return (
                <Card key={index} className="p-4">
                  <CardContent className="grid grid-cols-2">
                    <Icons.watched className="col-auto h-10 w-10" />
                    <CardDescription className="text-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })} */}
            <Card className="grid items-center p-4">
              <CardContent className="grid grid-cols-[auto,_1fr] items-center gap-8 p-2">
                <Icons.watched className="place-self-center md:h-10 md:w-10" />
                <CardDescription className="sm:text-foreground">
                  {featuresConfig[0]?.description}
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="grid items-center p-4">
              <CardContent className="grid grid-cols-[auto,_1fr] items-center gap-8 p-2">
                <Icons.like className="place-self-center md:h-10 md:w-10" />
                <CardDescription className="sm:text-foreground">
                  {featuresConfig[1]?.description}
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="grid items-center p-4">
              <CardContent className="grid grid-cols-[auto,_1fr] items-center gap-8 p-2">
                <Icons.page className="place-self-center md:h-10 md:w-10" />
                <CardDescription className="sm:text-foreground">
                  {featuresConfig[2]?.description}
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="grid items-center p-4">
              <CardContent className="grid grid-cols-[auto,_1fr] items-center gap-8 p-2">
                <Icons.star className="place-self-center md:h-10 md:w-10" />
                <CardDescription className="sm:text-foreground">
                  {featuresConfig[3]?.description}
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="grid items-center p-4">
              <CardContent className="grid grid-cols-[auto,_1fr] items-center gap-8 p-2">
                <Icons.calendar className="place-self-center md:h-10 md:w-10" />
                <CardDescription className="sm:text-foreground">
                  {featuresConfig[4]?.description}
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="grid items-center p-4">
              <CardContent className="grid grid-cols-[auto,_1fr] items-center gap-8 p-2">
                <Icons.layoutGrid className="place-self-center md:h-10 md:w-10" />
                <CardDescription className="sm:text-foreground">
                  {featuresConfig[5]?.description}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>
        <section>
          <div className="flex items-center justify-between justify-items-center">
            <h2 className="uppercase text-muted-foreground">
              Just Reviewed...
            </h2>
            <Link
              href={`${process.env.NEXT_PUBLIC_APP_URL}/reviews?popular=all-time`}
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
          <div className="grid grid-flow-col gap-4 overflow-x-auto overscroll-x-contain">
            <FilmCardList
              limit={12}
              columnsCount={12}
              aspectRatio="portrait"
              width={185}
              movieImageWidth={getImageFormatSize('poster_sizes', 'w185')}
              isSlider={true}
            />
          </div>
        </section>
        <section>
          <p className="text-center text-2xl">
            Write and share reviews. Compile your own lists. Share your life in
            film.
          </p>
          <p className="text-center">
            Below are some popular reviews and lists from this week. Sign up to
            create your own.
          </p>
        </section>

        <div className="grid gap-20 lg:grid-cols-3">
          <section className="lg:col-span-2 lg:row-span-2">
            <div className="flex items-center justify-between justify-items-center">
              <h2 className="text-md mb-2 uppercase text-muted-foreground">
                Popular reviews this week
              </h2>
              <Link
                href={`${process.env.NEXT_PUBLIC_APP_URL}/reviews?popular=all-time`}
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
            <Reviews />
          </section>

          <section className="">
            <div className="flex items-end justify-between justify-items-center">
              <h2 className="text-md mb-2 uppercase text-muted-foreground">
                Popular lists
              </h2>
              <Link
                href={`${process.env.NEXT_PUBLIC_APP_URL}/lists?popular=all-time`}
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
                Popular reviewers
              </h2>
              <Link
                href={`${process.env.NEXT_PUBLIC_APP_URL}/members?popular=all-time`}
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
        </div>
      </div>
    </>
  )
}
