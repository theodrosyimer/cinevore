import { getTopRated, getUpcoming, searchByID, searchByTitle, searchMulti } from "@/lib/tmdb/src/tmdb"

export const metadata = {
  title: "Film's Details Page",
  description: "All the details of the film you searched for.",
}

type Params = { infos: string }
export function generateStaticParams() {
  return [
    { category: 'a', product: '1' },
    { category: 'b', product: '2' },
    { category: 'c', product: '3' },
  ]
}

export default async function FilmPage({ params }: { params: { title: string } }) {
  // const film = await searchByID({ id: '157336', category: 'movie' })
  const film = await searchByTitle({ query: params.title, category: 'movie' })
  // const film = await getUpcoming({ page: '1', category: 'movie' })
  return (
    <>
      <h1 className="text-4xl font-bold text-center">
        Film Description
      </h1>
      <p className='text-center'>Details of the film you searched for.</p>
      <div>Film: {params.title}</div>
      <div className="container grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {!film ? <div>Loading..</div> : JSON.stringify(film, null, 2)}
      </div>
    </>
  )
}
