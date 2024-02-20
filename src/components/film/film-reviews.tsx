import { FilmReview } from '@/components/film/film-review'
import { toast } from '@/components/ui/use-toast'
import { db } from '@/db'
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
              if (error instanceof Error) {
                toast({
                  title: error.name,
                  description: error.message,
                })
                return
              }
            })

            if (!film) return null

            return (
              // TODO: fix this type error
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
