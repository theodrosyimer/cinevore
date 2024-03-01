import Link from 'next/link'

import { MovieBackdrop } from '@/components/film/film-backdrop'
import { FilmCardList } from '@/components/film/film-card-list'
import { Icons } from '@/components/icon/icons'
import { Reviews } from '@/components/review/reviews'
import { buttonVariants } from '@/components/ui/button'
import { featuresConfig } from '@/config/features'
import { getImageFormatSize } from '@/lib/tmdb/src/utils'
import { cn } from '@/lib/utils/utils'
import { Suspense } from 'react'
import { FeatureCard } from './_components/feature-card'
import { Section, SectionContent, SectionTitle } from './_components/section'
import { PageTitle } from './_components/page-title'

export const metadata = {
  title: 'Home Page',
  description: 'Welcome to Cinevore, the social network for film lovers',
}
export default async function IndexPage() {
  return (
    <div className="grid gap-12">
      <div className="relative -mt-14 grid">
        <MovieBackdrop
          url={`https://image.tmdb.org/t/p/w1280/nuO8o9ltxhI7AZQxePavEZ4TyHa.jpg`}
          altText="training day backdrop image"
          className="rounded-b-md opacity-40"
        />
      </div>
      <div className="z-10 -mt-20 grid gap-12 sm:-mt-28 lg:-mt-72">
        <Section className="grid items-center justify-items-center gap-4 self-end md:self-center">
          <div className="grid gap-2">
            <PageTitle>
              Track films you&apos;ve watched.
              <br />
              Save those you want to see.
              <br />
              Rate and review them.
              <br />
              Tell your friends what you think.
            </PageTitle>
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
        </Section>

        <Section>
          <Suspense fallback={<div>Loading...</div>}>
            <FilmCardList
              limit={4}
              columnsCount={4}
              aspectRatio="portrait"
              width={342}
              movieImageWidth={getImageFormatSize('poster_sizes', 'w342')}
              isSlider={false}
              hasMenu={false}
            />
          </Suspense>
        </Section>

        <Section>
          <SectionTitle
            id="features"
            className="text-md mb-2 scroll-mt-20 uppercase text-muted-foreground"
          >
            Cinevore lets you
          </SectionTitle>
          <div className="grid grid-cols-1 gap-2  sm:grid-cols-2 lg:grid-cols-3">
            {featuresConfig.map((feature, index) => (
              <FeatureCard
                key={index}
                Icon={Icons[feature.icon]}
                description={feature.description}
              />
            ))}
          </div>
        </Section>

        <Section>
          <SectionContent
            title={
              <SectionTitle className="uppercase text-muted-foreground">
                Just Reviewed...
              </SectionTitle>
            }
            path="/reviews?popular=all-time"
            className="items-center"
          >
            <div className="grid grid-flow-col gap-4 overflow-x-auto overscroll-x-contain">
              <Suspense fallback={<div>Loading...</div>}>
                <FilmCardList
                  limit={12}
                  columnsCount={12}
                  aspectRatio="portrait"
                  width={185}
                  movieImageWidth={getImageFormatSize('poster_sizes', 'w185')}
                  isSlider={true}
                />
              </Suspense>
            </div>
          </SectionContent>
        </Section>

        <Section>
          <p className="text-center text-2xl">
            Write and share reviews. Compile your own lists. Share your life in
            film.
          </p>
          <p className="text-center">
            Below are some popular reviews and lists from this week. Sign up to
            create your own.
          </p>
        </Section>

        <div className="grid gap-20 lg:grid-cols-3">
          <Section className="lg:col-span-2 lg:row-span-2">
            <SectionContent
              title="Popular reviews this week"
              path="/reviews?popular=all-time"
            >
              <Reviews />
            </SectionContent>
          </Section>

          <Section>
            <SectionContent
              title="Popular lists"
              path="/lists?popular=all-time"
            />
          </Section>

          <Section>
            <SectionContent
              title="Popular reviewers"
              path="/members?popular=all-time"
            />
          </Section>
        </div>
      </div>
    </div>
  )
}
