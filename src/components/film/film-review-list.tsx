import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { db } from '@/db'
import { getCurrentUser } from '@/lib/session'

export default async function MovieReviewList() {
  const { user } = await getCurrentUser()
  const reviews = await db.query.movie.findMany({
    with: {
      movieReviews: true,
    },
  })

  return (
    <>
      <h3>Popular Reviews</h3>
      <div className="divide-y divide-border rounded-md border"></div>
      <Avatar className="">
        <AvatarImage src={user?.image ?? undefined} />
        <AvatarFallback>OM</AvatarFallback>
      </Avatar>
    </>
  )
}
