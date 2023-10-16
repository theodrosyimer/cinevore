import { FilmCardList } from '@/components/film-card-list'
import { authOptions } from '@/lib/auth'
import { getCurrentUser } from '@/lib/session'
import { redirect } from 'next/navigation'

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
  // const { user, isAdmin } = await getCurrentUser()

  // if (!user) {
  //   redirect(authOptions?.pages?.signIn || "/login")
  // }

  return (
    <>
      <h1 className="text-center text-4xl font-bold">
        Your movies {params.username}
      </h1>

      <section className="flex space-x-4 pb-4">
        <FilmCardList aspectRatio="portrait" width="w92" />
      </section>
    </>
  )
}
