import Link from 'next/link'

// import { env } from "@env.mjs"
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import { getCurrentUser } from '@/lib/session'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { globalConfig, getPopular } from '@/lib/tmdb/src/tmdb'
import Image from 'next/image'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { MovieBackdrop } from '@/components/film-backdrop'
import FilmCardList from '@/components/film-card-list'

export default function IndexPage() {
  // const stars = await getGitHubStars()
  // const stars = '10'
  // const { user, isAdmin } = await getCurrentUser()

  return (
    <>
      <MovieBackdrop url={`${globalConfig.IMAGE_BASE_URI}/w1280/huD4cMhHtLkxcdM6PbKBcivBZuE.jpg`} altText='' className='absolute top-0 rounded-b-md brightness-50 blur-[2px]' />
      <section className="grid relative w-full justify-center">
        <div className="absolute z-40 w-[36rem] mt-[-24rem] grid gap-6">
          <h1 className="text-4xl font-bold text-center">
            Track films you&apos;ve watched.
            <br />
            Save those you want to see.
            <br />
            Rate and review them.
            <br />
            Tell your friends what you think.
          </h1>
          <p className="text-center text-muted-foreground">
            Cinevore, the social network for film lovers. Join us today!
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/register"
              className={cn(
                buttonVariants({ variant: 'default' })
              )}
            >
              Get Started
            </Link>
            <Link
              href="/register"
              className={cn(
                buttonVariants({ variant: 'secondary' })
              )}
            >
              Get Started
            </Link>
          </div>

        </div>
      </section>
      <section>
        <div className="grid gap-4 grid-cols-7">
          <FilmCardList limit={7} />
        </div>
      </section>
    </>
  )
}
