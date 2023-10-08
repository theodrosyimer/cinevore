import Link from 'next/link';

// import { env } from "@env.mjs"
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { globalConfig, getPopular } from '@/lib/tmdb/src/tmdb';
import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export default function IndexPage() {
  // const stars = await getGitHubStars()
  // const stars = '10'
  // const { user, isAdmin } = await getCurrentUser()

  return (
    <>
      <AspectRatio ratio={16 / 9} />
      <section className="mt-[-24rem] grid w-full justify-center">
        <div className="w-[36rem] grid gap-4">
          <h1 className="text-4xl font-bold text-center">
            Track films you&apos;ve watched.
            <br />
            Save those you want to see.
            <br />
            Rate and review them.
            <br />
            Tell your friends what you think.
          </h1>

          <div className="flex place-self-end gap-4 pr-16">
            <Link
              href="/register"
              className={cn(
                'text-primary-background  bg-secondary ',
                buttonVariants({ variant: 'secondary' })
              )}
            >
              Get Started
            </Link>
            <Link
              href="/register"
              className={cn(
                'text-primary-background  bg-secondary ',
                buttonVariants({ variant: 'secondary' })
              )}
            >
              Get Started
            </Link>
          </div>
          <p className="text-center text-muted-foreground">
            Cinevore, the social network for film lovers.
          </p>
        </div>
      </section>
    </>
  );
}
