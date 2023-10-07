/* eslint-disable @next/next/no-img-element */
import { toast } from "@/components/ui/use-toast"
import { searchByID, searchByTitle } from "@/lib/tmdb/src/tmdb"
import { generateTMDBImageUrl } from "@/lib/tmdb/src/utils"
import { cn } from "@/lib/utils"
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
  // const data = await searchByTitle({ query: decodeURI(params.title), category: 'movie' })
  // const film = data.results[0]

  if (!film) {
    return notFound()
  }

  // console.log('Film:', film)
  const backdropImageUrl = generateTMDBImageUrl('backdrop_sizes', 'w780', film.images?.backdrops[0]?.file_path!)
  const posterImageUrl = generateTMDBImageUrl('poster_sizes', 'w185', film.images?.posters[1]?.file_path!)
  // console.log('Image URL:', imageUrl)

  return (
    <>
      <div className="grid justify-items-center gap-4">
        <img
          src={backdropImageUrl!}
          alt={film?.title!}
          // width={width}
          // height="200"
          lang="en"
          className={cn(
            "h-auto w-auto object-cover aspect-[3/4] rounded-md",
          )}
        />
        <div className="grid grid-cols-3">
          <img
            src={posterImageUrl!}
            alt={film?.title!}
            // width={width}
            // height="200"
            lang="en"
            className={cn(
              "h-auto w-auto object-cover aspect-[3/4] rounded-md justify-items-end items-center grid-",
            )}
          />
          <div className="grid gap-2">
            <h1 className="text-2xl font-bold text-start">
              {film?.title}
            </h1>
            <section>
              <p className="text-md text-muted-foreground">
                {film.overview}
              </p>
            </section>
          </div>
        </div>
      </div>



      <div className="grid">
        {!film ? <div>Loading..</div> : JSON.stringify(film, null, 2)}
      </div>
    </>
  )
}
