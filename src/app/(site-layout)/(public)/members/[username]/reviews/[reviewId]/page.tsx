import { Review } from '@/components/review/review'
import { db } from '@/db'
import { searchByID } from '@/lib/tmdb/src/tmdb'

export type MemberReviewPageProps = {
  params: {
    username: string
    reviewId: string
  }
}

export default async function MemberReviewPage({
  params,
}: MemberReviewPageProps) {
  // console.log('params', params)

  // const title = params.title.replace(/-/g, ' ')

  const review = await db.query.movieReview.findFirst({
    where: (review, { eq }) => eq(review.id, +params.reviewId),
    with: {
      user: true,
      comments: true,
      likes: true,
    },
  })
  console.log('list', review)
  const film = await searchByID({
    id: review?.movieId.toString(),
    category: 'movie',
  })
  return (
    <>
      <section>
        {/* <h1 className="text-md mb-2 uppercase">{review?.title}</h1> */}
        <article className="flex gap-2">
          {review ? <Review review={review} film={film} /> : null}
        </article>
      </section>
      <section>Comments</section>
    </>
  )
}
