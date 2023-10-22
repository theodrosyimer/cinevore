import { FilmCardList } from '@/components/film-card-list'
import { Reviews } from '@/components/reviews'
import { UserReviews } from '@/components/user-reviews'
import { authOptions } from '@/lib/auth'
import { getCurrentUser } from '@/lib/session'
import { notFound, redirect } from 'next/navigation'

export const metadata = {
  title: 'Diary Page',
  description: 'Your diary of films.',
}

export default async function UserReviewsPage({
  params,
}: {
  params: {
    username: string
    id: number
  }
}) {
  const { user } = await getCurrentUser()

  if (!user) {
    return notFound()
  }

  return (
    <>
      <h1 className="text-center text-4xl font-bold">Reviews</h1>
      <section>
        <UserReviews user={user} />
      </section>
    </>
  )
}
