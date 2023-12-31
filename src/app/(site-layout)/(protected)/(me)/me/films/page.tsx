import { UserFilmsTabs } from '@/app/(site-layout)/(protected)/(me)/me/films/_components/user-films-tabs'
import { db } from '@/db'
import { getCurrentUser } from '@/lib/session'
import { notFound } from 'next/navigation'

export const metadata = {
  title: 'Films Page',
  description: 'All your films in one place.',
}

export default async function UserFilmsPage({
  params,
}: {
  params: {
    username: string
    id: number
  }
}) {
  const { user: currentUser, isAdmin } = await getCurrentUser()

  if (!currentUser) {
    notFound()
  }

  const userMovies = await db.query.user.findFirst({
    where: (user, { eq }) => eq(user.id, currentUser.id),
    with: {
      movieInfosToUser: true,
    },
  })
  // console.log('userMovies', userMovies)
  // const moviesInfos = await db.query.movieInfosToUser.findMany({
  //   where: (movieInfosToUser, { eq }) =>
  //     and(
  //       eq(movieInfosToUser.userId, params.userId),
  //       or(
  //         eq(movieInfosToUser.watched, true),
  //         eq(movieInfosToUser.reviewed, true),
  //       ),
  //     ),
  // })

  return (
    <>
      {/* <h1 className="text-center text-4xl font-bold">
        Your movies {params.username}
      </h1>

      <section className="flex space-x-4 pb-4">
        <FilmCardList
          // limit={12}
          columnsCount={12}
          aspectRatio="portrait"
          width={92}
          movieImageWidth="w92"
          isSlider={true}
          isSnapped={true}
        />
      </section> */}
      <UserFilmsTabs userMovies={userMovies} />
    </>
  )
}
