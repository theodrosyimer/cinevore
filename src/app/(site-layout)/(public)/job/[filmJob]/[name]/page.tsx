/* eslint-disable @next/next/no-img-element */
import { ActorFilmCardList } from '@/components/actor-films-credits'
import { FilmCardList } from '@/components/film-card-list'
import { FilmCardDisplay } from '@/components/film-user-card'
import { toast } from '@/components/ui/use-toast'
import { getPersonByID } from '@/lib/tmdb/src/tmdb'
import { generateTMDBImageUrl } from '@/lib/tmdb/src/utils'
import { cn } from '@/lib/utils/utils'
import { notFound } from 'next/navigation'

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
      <div className="relative grid gap-8 md:grid-cols-[_minmax(_12rem,_0.33fr),_1fr] md:gap-8 lg:gap-12">
        <div className="sm:grid sm:grid-cols-[_0.33fr,_1fr] sm:gap-4 md:block">
          <div className="col-auto grid gap-2 xs:justify-items-center">
            <img
              src={posterImageUrl!}
              alt={person?.name!}
              width={300}
              // height="200"
              lang="en"
              className={cn(
                'col-auto mb-4 aspect-[0.667] h-auto rounded-md object-cover',
              )}
            />
            {/* <p className="text-md text-center font-bold md:hidden">
              {person?.name}
            </p> */}
          </div>
          <p className="text-sm text-muted-foreground lg:text-base ">
            {person.biography}
          </p>
        </div>
        <div className="grid gap-2">
          <section>
            <div className="grid items-center justify-between">
              <p className="text-md uppercase text-muted-foreground">
                Films starring
              </p>
              <h1 className="text-start text-2xl font-bold">{person?.name}</h1>
            </div>
            <div className="my-4 divide-y divide-border rounded-md border"></div>

            {/* <ActorFilmCardList moviesCredits={person.credits?.cast} /> */}

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
        </div>
        {/* <div className="divide-y divide-border rounded-md border"></div> */}
      </div>
    </>
  )
}
