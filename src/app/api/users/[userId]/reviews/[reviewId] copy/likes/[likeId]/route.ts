import { like, likeToMovieReview } from '@/db/planetscale'
import { isAdmin } from '@/lib/auth'
import { db } from '@/lib/db'
import { formatSimpleErrorMessage } from '@/lib/utils/utils'
import { eq, and } from 'drizzle-orm'
import { getToken } from 'next-auth/jwt'
import { NextRequest } from 'next/server'
import { z } from 'zod'

const routeContextSchema = z.object({
  params: z.object({
    likeId: z.coerce.number(),
    reviewId: z.coerce.number(),
    userId: z.string(),
  }),
})

export async function DELETE(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context)
    const { likeId, reviewId, userId } = params
    // Ensure user is authentication and has access to this resource.
    const token = await getToken({ req })

    if (token && (userId === token.id || isAdmin(token))) {
      const result = await db.transaction(async (tx) => {
        // Delete the list and the relationship to the review.
        const resultHeader = await tx.delete(like).where(eq(like.id, likeId!))

        // if no like was deleted, return early
        if (!resultHeader.rowsAffected) {
          return resultHeader.rowsAffected
        }

        // Delete the like relationship to the review.
        await tx
          .delete(likeToMovieReview)
          .where(
            and(
              eq(likeToMovieReview.movieReviewId, reviewId),
              eq(likeToMovieReview.likeId, likeId!),
            ),
          )

        return resultHeader.rowsAffected
      })

      if (result) {
        return new Response(`Deleted like to review with id: ${reviewId}`, {
          status: 200,
        })
      }

      if (!result) {
        return new Response('This like does not exist or is already deleted!', {
          status: 409,
        })
      }
    }

    return new Response('Unauthorized', { status: 403 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    if (error instanceof Error) {
      console.log(error)
      return new Response(formatSimpleErrorMessage(error), { status: 500 })
    }

    return new Response(`Error deleting movie list from the database.`, {
      status: 500,
    })
  }
}
