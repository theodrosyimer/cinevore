import { Review } from '@/components/review/review'
import { toast } from '@/components/ui/use-toast'
import { db } from '@/db'
import { searchByID } from '@/lib/tmdb/src/tmdb'

export async function Reviews({ children }: { children?: React.ReactNode }) {
  // const searchParams = useSearchParams()
  // const sortBy = searchParams.get('sortBy') /* || 'popular' */

  let reviews = []
  try {
    reviews = await db.query.movieReview.findMany({
      with: {
        user: true,
        comments: true,
        likes: true,
      },
      limit: 10,
    })
  } catch (error) {
    if (error instanceof Error) {
      toast({
        title: error.name,
        description: error.message,
        variant: 'destructive',
      })
      return
    }
    return /* notFound() */
  }

  const filmsReviewed = await Promise.all(
    reviews.map(async (review) => {
      const film = await searchByID({
        id: review.movieId.toString(),
        category: 'movie',
      }).catch((error) => {
        if (error instanceof Error) {
          toast({
            title: error.name,
            description: error.message,
            variant: 'destructive',
          })
          return
        }
      })

      if (!film) return

      return { review, film }
    }),
  )
  console.log('Reviews Page:', filmsReviewed)
  // const filmsReviewed = reviews.map(async (review) => {
  //   const film = await searchByID({
  //     id: review.movieId.toString(),
  //     category: 'movie',
  //   }).catch((error) => {
  //     if (error instanceof Error) {
  //       toast({
  //         title: error.name,
  //         description: error.message,
  //         variant: 'destructive',
  //       })
  //       return
  //     }
  //   })

  //   if (!film) return

  //   return { review, film }
  // })

  return (
    <section className="grid gap-4">
      {filmsReviewed.map((filmReviewed) =>
        filmReviewed ? (
          <Review
            key={filmReviewed.review.id}
            review={filmReviewed.review}
            film={filmReviewed.film}
          />
        ) : null,
      )}
    </section>
  )
}
