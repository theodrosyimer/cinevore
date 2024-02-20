import { Review } from '@/components/review/review'
import { toast } from '@/components/ui/use-toast'
import { db } from '@/db'
import { searchByID } from '@/lib/tmdb/src/tmdb'
import { type User } from 'next-auth'

export async function MemberReviews({
  children,
  user,
}: {
  children?: React.ReactNode
  user: User
}) {
  // const searchParams = useSearchParams()
  // const sortBy = searchParams.get('sortBy') /* || 'popular' */

  let memberReviews = []
  try {
    memberReviews = await db.query.movieReview.findMany({
      where: (review, { eq }) => eq(review.userId, user.id),
      with: {
        user: true,
        comments: true,
        likes: true,
      },
    })

    // console.log('Reviews Page:', memberReviews)
    return (
      <>
        <section className="grid grid-rows-[max-content]">
          {memberReviews.map(async (review) => {
            const film = await searchByID({
              id: review.movieId.toString(),
              category: 'movie',
            }).catch((error) => {
              if (error instanceof Error) {
                toast({
                  title: error.name,
                  description: error.message,
                })
                return
              }
            })

            if (!film) return

            return (
              // TODO: fix this type error
              <Review key={review.id} review={review} film={film} />
            )
          })}
        </section>
      </>
    )
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      return
    }
    return /* notFound() */
  }
}
