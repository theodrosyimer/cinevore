import { FilmReview } from '@/components/film-review'
import { db } from '@/lib/db'
import { searchByID } from '@/lib/tmdb/src/tmdb'

type ReviewsProps = {
  children?: React.ReactNode
  movieId: number
}
export async function FilmReviews({ movieId, children }: ReviewsProps) {
  // const searchParams = useSearchParams()
  // const sortBy = searchParams.get('sortBy') /* || 'popular' */

  let reviews = []
  try {
    reviews = await db.query.movieReview.findMany({
      where: (movieReview, { eq }) => eq(movieReview.movieId, movieId),
      with: {
        user: true,
        comments: true,
        likes: true,
      },
    })

    // console.log('Reviews Page:', reviews)
    return (
      <>
        <section className="grid gap-2">
          {reviews.map(async (review) => {
            const film = await searchByID({
              id: review.movieId.toString(),
              category: 'movie',
            }).catch((error) => {
              console.log(error.message)
            })

            if (!film) return

            return (
              // TODO: fix this type error
              // @ts-ignore
              <FilmReview key={review.id} review={review} film={film} />
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
