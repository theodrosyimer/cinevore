/* eslint-disable @next/next/no-img-element */
import { searchByID, searchByTitle } from "@/lib/tmdb/src/tmdb"
import { generateTMDBImageUrl } from "@/lib/tmdb/src/utils"
import { cn } from "@/lib/utils"
import { notFound } from "next/navigation"

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

export default async function FilmPage({ params }: { params: { title: string } }) {
  const film = await searchByID({ id: '157336', category: 'movie' })
  // const data = await searchByTitle({ query: decodeURI(params.title), category: 'movie' })
  // const film = data.results[0]

  if (!film) {
    return notFound()
  }

  // console.log('Film:', film)
  const imageUrl = generateTMDBImageUrl('backdrop_sizes', 'w780', film.backdrop_path!)
  // console.log('Image URL:', imageUrl)

  return (
    <>
      <img
        src={imageUrl!}
        alt={film?.title!}
        // width={width}
        height="200"
        lang="en"
        className={cn(
          "h-auto w-auto object-cover aspect-[3/4]",
        )}
      />
      <h1 className="text-4xl font-bold text-center">
        {film?.title}
      </h1>

      <section>
        <p className="">
          {film.overview}
        </p>
      </section>

      <div className="grid">
        {!film ? <div>Loading..</div> : JSON.stringify(film, null, 2)}
      </div>
    </>
  )
}
