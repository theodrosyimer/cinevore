/* eslint-disable @next/next/no-img-element */
import { MovieBackdrop } from "@/components/film-backdrop"
import MovieReviewList from "@/components/film-review-list"
import { MovieInfosTabs } from "@/components/film-tabs"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { UserMovieActions } from "@/components/user-movie-infos"
import { globalConfig, searchByID, searchByTitle } from "@/lib/tmdb/src/tmdb"
import { generateTMDBImageUrl } from "@/lib/tmdb/src/utils"
import { cn, convertMinutesToHoursAndMinutes } from "@/lib/utils"
import Link from "next/link"
import { notFound, useSearchParams } from "next/navigation"

export const metadata = {
  title: "Film's Details Page",
  description: "All the details of the film you searched for.",
}

// type Params = { infos: string }
// export function generateStaticParams() {
//   return [
//     { category: 'a', product: '1' },
//     { category: 'b', product: '2' },
//     { category: 'c', product: '3' },
//   ]
// }

export default async function FilmPage({ params, searchParams }: { params: { title: string }, searchParams: { id: string } }) {

  const film = await searchByID({ id: `${searchParams.id}`, category: 'movie' }).catch((error) => {
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
  const backdropImageUrl = generateTMDBImageUrl('backdrop_sizes', 'w1280', film.images?.backdrops[0]?.file_path!)
  const posterImageUrl = generateTMDBImageUrl('poster_sizes', 'w185', film.images?.posters[1]?.file_path!)
  // console.log('Image URL:', imageUrl)

  return (
    <>
      <div className="grid mx-auto max-w-[980px] gap-8">
        <MovieBackdrop url={backdropImageUrl} altText={film.title} />

        <div className="grid grid-cols-5 gap-4 relative">
          <img
            src={posterImageUrl!}
            alt={film?.title!}
            // width={width}
            // height="200"
            lang="en"
            className={cn(
              "sticky top-20 z-40 h-auto w-auto object-cover aspect-[3/4] rounded-md col-auto",
            )}
          />
          <div className="grid gap-2 col-span-3 self-center justify-items-start">
            <h1 className="text-2xl font-bold text-start">
              {film?.title}
            </h1>
            <section>
              <p className="text-md text-muted-foreground">
                {film.overview}
              </p>
            </section>
            <section >
              <MovieInfosTabs
                credits={film.credits}
                genres={film.genres}
                className="hidden sm:block" />
            </section>
            <span className="text-sm text-muted-foreground">{convertMinutesToHoursAndMinutes(film.runtime)}min. More at <Link href={`${globalConfig.BASE_URI}/movie/${film.id}`}>TMDB</Link > or <Link href={`${globalConfig.IMDB_BASE_URI}/${film.imdb_id}/maindetails`}>iMDB</Link >
            </span>
            <MovieReviewList />
          </div>
          <UserMovieActions className="col-auto" />
        </div>
      </div >
    </>
  )
}
