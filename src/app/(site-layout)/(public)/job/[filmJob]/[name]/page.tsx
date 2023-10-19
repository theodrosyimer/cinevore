/* eslint-disable @next/next/no-img-element */
import { MovieBackdrop } from '@/components/film-backdrop'
import { FilmCardList } from '@/components/film-card-list'
import MovieReviewList from '@/components/film-review-list'
import { MovieInfosTabs } from '@/components/film-tabs'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { UserMovieActions } from '@/components/user-movie-infos'
import { getCurrentUser } from '@/lib/session'
import {
  getPersonByID,
  globalConfig,
  searchByID,
  searchByTitle,
} from '@/lib/tmdb/src/tmdb'
import { generateTMDBImageUrl } from '@/lib/tmdb/src/utils'
import { cn, convertMinutesToHoursAndMinutes } from '@/lib/utils/utils'
import Link from 'next/link'
import { notFound, useSearchParams } from 'next/navigation'

export const metadata = {
  title: 'Job Details Page',
  description: 'Job details by name.',
}

type JobDetailsPageProps = {
  params: {
    filmJob: string
    name: string
  }
  searchParams: {
    id: string
  }
}

export default async function JobDetailsPage({
  params,
  searchParams,
}: JobDetailsPageProps) {
  const { user } = await getCurrentUser()
  const person = await getPersonByID({
    id: `${searchParams.id}`,
  }).catch((error) => {
    toast({
      title: error.name,
      description: error.message,
    })
    return
  })

  if (!person) {
    return notFound()
  }

  // console.log('Film:', film)
  // const backdropImageUrl = generateTMDBImageUrl({
  //   format: 'backdrop_sizes',
  //   size: 'original',
  //   paths: person.images?.backdrops,
  //   defaultImage: person.backdrop_path,
  // })
  const posterImageUrl = generateTMDBImageUrl({
    format: 'poster_sizes',
    size: 'w185',
    paths: person.images?.profiles,
    defaultImage: person.profile_path ?? '',
  })
  // console.log('Image URL:', imageUrl)

  return (
    <>
      <div className="grid w-full justify-center gap-8">
        {/* <MovieBackdrop
          url={posterImageUrl}
          altText={person.title}
          className="rounded-b-md bg-gradient-to-r from-background"
        /> */}

        <div className="relative grid gap-8 md:grid-cols-[_0.33fr,_1fr] md:gap-8 lg:gap-12">
          <div className="sm:grid sm:grid-cols-[_0.33fr,_1fr] sm:gap-4 md:block">
            <img
              src={posterImageUrl!}
              alt={person?.name!}
              width={300}
              // height="200"
              lang="en"
              className={cn(
                'col-auto mb-4 aspect-[0.667] h-auto w-80 rounded-md object-cover',
              )}
            />
            <p className="xs:text-sm text-sm text-muted-foreground sm:text-base ">
              {person.biography}
            </p>
          </div>
          <div className="grid gap-2 self-center">
            <section>
              <div className="grid items-center justify-between">
                <p className="text-md uppercase text-muted-foreground">
                  Films starring
                </p>
                <h1 className="text-start text-2xl font-bold">
                  {person?.name}
                </h1>
              </div>
              <div className="my-4 divide-y divide-border rounded-md border"></div>
              <FilmCardList
                // limit={12}
                columnsCount={4}
                aspectRatio={'portrait'}
                width={185}
                movieImageWidth="w185"
                isSlider={false}
                isSnapped={false}
              />
            </section>
            <div className="divide-y divide-border rounded-md border "></div>
          </div>
        </div>
      </div>
    </>
  )
}
