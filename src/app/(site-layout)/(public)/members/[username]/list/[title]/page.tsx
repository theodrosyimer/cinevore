import { UserFilmCard } from '@/components/user-film-card'
import { searchByID } from '@/lib/tmdb/src/tmdb'
import listsModel from '@/models/lists'

export type MemberListPageProps = {
  params: {
    username: string
    title: string
  }
  searchParams: {
    id: string
  }
}

export default async function MemberListPage({
  params,
  searchParams,
}: MemberListPageProps) {
  // console.log('params', params)

  const title = params.title.replace(/-/g, ' ')

  const list = await listsModel.getById(+searchParams.id)
  // console.log('list', list)

  return (
    <>
      <section>
        <h1 className="text-md mb-2 uppercase">{list?.title}</h1>
        <article className="flex gap-2">
          {list?.movies.map(async (movie) => {
            const film = await searchByID({
              id: movie.movieId.toString(),
              category: 'movie',
            })
            return (
              <UserFilmCard
                movie={film}
                key={film.id}
                movieImageWidth="w185"
                aspectRatio="portrait"
              />
            )
          })}
        </article>
      </section>
      <section>Comments</section>
    </>
  )
}
