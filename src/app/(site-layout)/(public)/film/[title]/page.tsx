/* eslint-disable @next/next/no-img-element */
import { UserMovieActions } from '@/app/(site-layout)/(public)/film/[title]/_components/user-movie-infos'
import { MovieBackdrop } from '@/components/film/film-backdrop'
import { FilmReviews } from '@/components/film/film-reviews'
import { SimilarFilmCardDisplay } from '@/components/film/similar-film-user-card'
import { buttonVariants } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { getCurrentUser } from '@/lib/session'
import { getSimilarByID, searchByID } from '@/lib/tmdb/src/tmdb'
import { generateTMDBImageUrl } from '@/lib/tmdb/src/utils'
import { cn, convertMinutesToHoursAndMinutes } from '@/lib/utils/utils'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MovieInfosTabs } from './_components/film-tabs'

export const metadata = {
  title: 'Film Details ',
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

  const similarFilms = await getSimilarByID({
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
  const backdropImageUrl = generateTMDBImageUrl({
    format: 'backdrop_sizes',
    size: 'original',
    paths: film.images?.backdrops,
    defaultImage: film.backdrop_path,
  })
  const posterImageUrl = generateTMDBImageUrl({
    format: 'poster_sizes',
    size: 'w185',
    paths: film.images?.posters,
    defaultImage: film.poster_path,
  })
  // console.log('Image URL:', imageUrl)

  return (
    <>
      <div className="-mt-14 grid w-full justify-center gap-8">
        {backdropImageUrl ? (
          <MovieBackdrop
            url={backdropImageUrl}
            altText={film.title}
            className="rounded-b-md bg-gradient-to-r from-background"
          />
        ) : null}

        {/* <div className="relative grid grid-cols-[_minmax(_4rem,_6rem),_1fr,max-content] gap-4 sm:grid-cols-[_minmax(_5rem,_8rem),_1fr,max-content] md:grid-cols-[max-content,_1fr,max-content]"> */}
        <div className="relative grid grid-cols-[1] gap-4 sm:grid-cols-[_minmax(_5rem,_8rem),_1fr,max-content] md:grid-cols-[max-content,_1fr,max-content]">
          <img
            src={posterImageUrl}
            alt={film?.title}
            // width={width}
            // height="200"
            lang="en"
            className={cn(
              'col-auto aspect-[3/4] h-auto w-16 rounded-md object-cover sm:sticky sm:top-20 sm:z-40 sm:col-auto sm:w-auto',
            )}
          />
          <div className=" grid gap-2 justify-self-center ">
            <h1 className="text-start text-2xl font-bold">{film?.title}</h1>
            <section>
              <p className="text-muted-foreground">{film.overview}</p>
            </section>
            <section>
              <MovieInfosTabs
                credits={film.credits}
                genres={film.genres}
                className="w-full"
              />
            </section>
            <span className={cn('text-sm text-muted-foreground')}>
              {convertMinutesToHoursAndMinutes(film.runtime)}min. More at{' '}
              <Link href={`https://api.themoviedb.org/3/movie/${film.id}`}>
                TMDB
              </Link>{' '}
              or{' '}
              <Link
                href={`https://imdb.com/title/${film.imdb_id}/maindetails`}
              >
                iMDB
              </Link>
            </span>
            <section className="mt-12 flex items-center justify-between justify-items-center">
              <h2 className="text-md uppercase text-muted-foreground">
                Popular Reviews
              </h2>
              <Link
                href={'/reviews?popular=all-time'}
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
            <FilmReviews movieId={film.id} />
            <section className="mt-12 flex items-center justify-between justify-items-center">
              <h2 className="text-md uppercase text-muted-foreground">
                Similar Films
              </h2>
              <Link
                href={`${process.env.NEXT_PUBLIC_APP_URL}/films?filter=similar`}
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
            <div className="grid grid-cols-3 gap-y-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
              {similarFilms?.results?.slice(0, 6).map((film) => {
                if (!film.poster_path) return null
                return (
                  <SimilarFilmCardDisplay
                    key={film.id}
                    movie={film}
                    movieImageWidth="w92"
                    aspectRatio="portrait"
                    width={92}
                    className="col-auto"
                  />
                )
              })}
            </div>
            <section className="mt-12 flex items-center justify-between justify-items-center">
              <h2 className="text-md uppercase text-muted-foreground">
                Popular Lists
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
            </section>
            <div className="divide-y divide-border rounded-md border "></div>
          </div>
          {user ? <UserMovieActions className="col-auto" /> : null}
        </div>
      </div>
    </>
  )
}
