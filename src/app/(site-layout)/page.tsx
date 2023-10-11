import Link from 'next/link';

// import { env } from "@env.mjs"
import { MovieBackdrop } from '@/components/film-backdrop';
import { FilmCardList } from '@/components/film-card-list';
import { Icons } from '@/components/icons';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { featuresConfig } from '@/config/features';
import { globalConfig } from '@/lib/tmdb/src/tmdb';
import { cn } from '@/lib/utils/utils';
import { Reviews } from '@/components/reviews';
import { Review } from '@/components/review';
import { db } from '@/lib/db';
import { getImageFormatSize } from '@/lib/tmdb/src/utils';
import { compare } from 'bcrypt';

export const metadata = {
  title: 'Home Page',
  description: 'Welcome to Cinevore, the social network for film lovers',
};
export default async function IndexPage() {
  return (
    <>
      <div className="grid gap-12">
        <div className="grid -mt-14">
          <MovieBackdrop
            url={`${globalConfig.IMAGE_BASE_URI}/original/yUa0iCocBPsGJ79BwrshHqz45Qc.jpg`}
            altText=""
            className="rounded-b-md brightness-50 blur-[2px] w-full "
          />
          <section className="grid w-full">
            <div className="w-[36rem] grid gap-2">
              <h1 className="text-4xl font-bold text-left">
                Track films you&apos;ve watched.
                <br />
                Save those you want to see.
                <br />
                Rate and review them.
                <br />
                Tell your friends what you think.
              </h1>
              <p className="text-left text-muted-foreground">
                Cinevore, the social network for film lovers. Join us today!
              </p>
              <div className="flex justify-center gap-4">
                <Link
                  href="/register"
                  className={cn(buttonVariants({ variant: 'default' }))}
                >
                  Get Started
                </Link>
                <Link
                  href="/register"
                  className={cn(buttonVariants({ variant: 'secondary' }))}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </section>
        </div>
        <section>
          <div className="grid gap-4 grid-cols-7">
            <FilmCardList
              limit={7}
              aspectRatio="portrait"
              width={getImageFormatSize('poster_sizes', 'w185')}
            />
          </div>
        </section>
        <section>
          <h2
            id="features"
            className="text-md text-muted-foreground uppercase mb-2 scroll-mt-20"
          >
            Cinevore lets you
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-2">
            {featuresConfig.map((feature, index) => {
              return (
                <Card key={index} className="p-4">
                  <CardContent className="grid grid-cols-2">
                    <Icons.watched className="h-10 w-10 col-auto" />
                    <CardDescription className="text-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
        <section>
          <h2 className="text-md text-muted-foreground uppercase mb-2">
            Just reviewed...
          </h2>
          <div className="grid gap-4 grid-cols-12">
            <FilmCardList
              limit={12}
              aspectRatio="portrait"
              width={getImageFormatSize('poster_sizes', 'w92')}
            />
          </div>
        </section>
        <section>
          <p className="text-2xl text-center">
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
            <div className="flex items-center justify-items-center justify-between">
              <h2 className="text-md text-muted-foreground uppercase mb-2">
                Popular reviews this week
              </h2>
              <Link
                href={`${process.env.NEXT_PUBLIC_APP_URL}/reviews?sortBy=popular`}
                className={cn(
                  'text-sm uppercase',
                  buttonVariants({
                    variant: 'link',
                    className: 'text-muted-foreground/50 pr-0',
                  })
                )}
              >
                More
              </Link>
            </div>
            <div className="divide-y divide-border rounded-md border "></div>
            <Reviews />
          </section>

          <section className="">
            <div className="flex items-end justify-items-center justify-between">
              <h2 className="text-md text-muted-foreground uppercase mb-2">
                Popular lists
              </h2>
              <Link
                href={`${process.env.NEXT_PUBLIC_APP_URL}/lists?sortBy=popular`}
                className={cn(
                  'text-sm uppercase',
                  buttonVariants({
                    variant: 'link',
                    className: 'text-muted-foreground/50 pr-0',
                  })
                )}
              >
                More
              </Link>
            </div>
            <div className="divide-y divide-border rounded-md border "></div>
          </section>

          <section className="">
            <div className="flex items-center justify-items-center justify-between">
              <h2 className="text-md text-muted-foreground uppercase mb-2">
                Popular reviewers
              </h2>
              <Link
                href={`${process.env.NEXT_PUBLIC_APP_URL}/members?sortBy=popular`}
                className={cn(
                  'text-sm uppercase',
                  buttonVariants({
                    variant: 'link',
                    className: 'text-muted-foreground/50 pr-0',
                  })
                )}
              >
                More
              </Link>
            </div>
            <div className="divide-y divide-border rounded-md border"></div>
          </section>
        </div>
      </div>
    </>
  );
}
