import { Review, ReviewAndCommentsProps } from '@/components/review'
import { db } from '@/lib/db'
import { searchByID } from '@/lib/tmdb/src/tmdb'
import { useSearchParams } from 'next/navigation'

export async function Reviews({ children }: { children?: React.ReactNode }) {
  // const searchParams = useSearchParams()
  // const sortBy = searchParams.get('sortBy') /* || 'popular' */


  let reviews = []
  try {
    reviews = await db.query.movieReview.findMany({
      with: {
        user: true,
        comments: {
          with: {
            comment: true,
          }
        },
        likes: {
          with: {
            likes: true,
          }
        },
      }
    })

    // console.log('Reviews Page:', reviews)
    return (
      <>
        <section className="grid gap-2">
          {
            reviews.map(async (review) => {

              const film = await searchByID({
                id: review.movieId.toString(), category: 'movie'
              }).catch(error => {
                console.log(error.message)
              })

              if (!film) return

              return (
                // TODO: fix this type error
                // @ts-ignore
                <Review key={review.id} review={review} film={film} />
              )
            })
          }
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
