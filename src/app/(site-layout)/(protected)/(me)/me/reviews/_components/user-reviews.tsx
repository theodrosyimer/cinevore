import { Review } from '@/components/review/review'
import { db } from '@/db'
import { searchByID } from '@/lib/tmdb/src/tmdb'
import { type User } from 'next-auth'

export async function UserReviews({
  children,
  user,
}: {
  children?: React.ReactNode
  user: User
}) {
  // const searchParams = useSearchParams()
  // const sortBy = searchParams.get('sortBy') /* || 'popular' */

  let reviews = []
  try {
    reviews = await db.query.movieReview.findMany({
      where: (movieReview, { eq }) => eq(movieReview.userId, user.id),
      with: {
        user: true,
        comments: true,
        likes: true,
      },
    })

    // console.log('Reviews Page:', reviews)
    return (
      <>
        <section className="grid gap-4">
          {reviews.map(async (review) => {
            const film = await searchByID({
              id: review.movieId.toString(),
              category: 'movie',
            }).catch((error) => {
              // console.log(error.message)
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
