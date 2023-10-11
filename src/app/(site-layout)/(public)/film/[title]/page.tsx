/* eslint-disable @next/next/no-img-element */
import { MovieBackdrop } from '@/components/film-backdrop'
import MovieReviewList from '@/components/film-review-list'
import { MovieInfosTabs } from '@/components/film-tabs'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { UserMovieActions } from '@/components/user-movie-infos'
import { getCurrentUser } from '@/lib/session'
import { globalConfig, searchByID, searchByTitle } from '@/lib/tmdb/src/tmdb'
import { generateTMDBImageUrl } from '@/lib/tmdb/src/utils'
import { cn, convertMinutesToHoursAndMinutes } from '@/lib/utils/utils'
import Link from 'next/link'
import { notFound, useSearchParams } from 'next/navigation'

export const metadata = {
  title: "Film Details ",
  description: 'All the details of the film you searched for.',
}

export default async function FilmPage({
  params,
  searchParams,
}: {
  params: { title: string }
  searchParams: { id: string }
}) {
  const { user } = await getCurrentUser()
  const film = await searchByID({
    id: `${searchParams.id}`,
    category: 'movie',
  }).catch((error) => {
    toast({
      title: error.name,
      description: error.message,
    })
    return
  })

  if (!film) {
    return notFound()
  }

  // console.log('Film:', film)
  const backdropImageUrl = generateTMDBImageUrl(
    {
      format: 'backdrop_sizes',
      size: 'original',
      paths: film.images?.backdrops,
      defaultImage: film.backdrop_path
    }
  )
  const posterImageUrl = generateTMDBImageUrl(
    {
      format: 'poster_sizes',
      size: 'w185',
      paths: film.images?.posters,
      defaultImage: film.poster_path
    }
  )
  // console.log('Image URL:', imageUrl)

  return (
    <>
      <div className="grid w-full justify-center gap-8">
        <MovieBackdrop url={backdropImageUrl} altText={film.title} />

        <div className="grid grid-cols-5 gap-4 relative max-w-[1080px]">
          <img
            src={posterImageUrl!}
            alt={film?.title!}
            // width={width}
            // height="200"
            lang="en"
            className={cn(
              'sticky top-20 z-40 h-auto w-auto object-cover aspect-[3/4] rounded-md col-auto'
            )}
          />
          <div className="grid gap-2 col-span-3 self-center">
            <h1 className="text-2xl font-bold text-start">{film?.title}</h1>
            <section>
              <p className="text-md text-muted-foreground">{film.overview}</p>
            </section>
            <section>
              <MovieInfosTabs
                credits={film.credits}
                genres={film.genres}
                className="hidden sm:block w-full"
              />
            </section>
            <span className={cn('text-sm text-muted-foreground')}>
              {convertMinutesToHoursAndMinutes(film.runtime)}min. More at{' '}
              <Link href={`${globalConfig.BASE_URI}/movie/${film.id}`}>
                TMDB
              </Link>{' '}
              or{' '}
              <Link
                href={`${globalConfig.IMDB_BASE_URI}/${film.imdb_id}/maindetails`}
              >
                iMDB
              </Link>
            </span>
            {/* <MovieReviewList /> */}
          </div>
          {user ? <UserMovieActions className="col-auto" /> : null}
        </div>
      </div>
    </>
  )
}
