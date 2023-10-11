import { FilmCardList } from '@/components/film-card-list'
import { authOptions } from '@/lib/auth'
import { getCurrentUser } from '@/lib/session'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Diary Page',
  description: 'Your diary of films.',
}

export default async function DiaryPage({
  params,
}: {
  params: {
    username: string
    id: number
  }
}) {
  // const { user, isAdmin } = await getCurrentUser()

  return (
    <>
      <h1 className="text-4xl font-bold text-center">Likes</h1>

      <section>
        <FilmCardList aspectRatio="portrait" width="w92" />
      </section>
    </>
  )
}
