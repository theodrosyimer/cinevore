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
      <h1 className="text-center text-4xl font-bold">Likes</h1>

      <section>
        <FilmCardList
          aspectRatio="portrait"
          width={92}
          movieImageWidth="w92"
          isSlider={true}
          isSnapped={true}
        />
      </section>
    </>
  )
}
