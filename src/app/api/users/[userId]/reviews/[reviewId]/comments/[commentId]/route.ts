import {
  getUserIdFromUrl,
  getUserResourceIdFromUrl,
} from '@/app/api/users/[userId]/get-user-id-from-url'
import { comment, movieReview } from '@/db/planetscale'
import { isAdmin } from '@/lib/auth'
import { db } from '@/lib/db'
import { formatSimpleErrorMessage } from '@/lib/utils/utils'
import { commentPATCHSchema } from '@/lib/validations/comment'
import { and, eq } from 'drizzle-orm'
import { getToken } from 'next-auth/jwt'
import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'

const reviewCommentRouteContextSchema = z.object({
  params: z.object({
    commentId: z.coerce.number(),
  }),
})

export async function GET(
  req: NextRequest,
  context: z.infer<typeof reviewCommentRouteContextSchema>,
) {
  try {
    const { params } = reviewCommentRouteContextSchema.parse(context)

    const token = await getToken({ req })
    const userId = getUserIdFromUrl(req)
    const userReviewId = getUserResourceIdFromUrl(req)

    if (token && (userId === token.id || isAdmin(token))) {
      const userReviews = await db.query.commentToMovieReview.findMany({
        where: (commentToMovieReview, { eq, and }) =>
          and(
            eq(commentToMovieReview.movieReviewId, userReviewId),
            eq(commentToMovieReview.commentId, params.commentId),
          ),
        columns: {},
        with: {
          comment: true,
        },
      })

      if (!userReviews) {
        return new Response('User not found', { status: 404 })
      }

      return NextResponse.json(userReviews)
    }

    return new Response('Unauthorized', { status: 403 })
  } catch (error) {
    if (error instanceof Error) {
      console.log(error)
      return new Response(formatSimpleErrorMessage(error), { status: 500 })
    }

    return new Response(null, { status: 500 })
  }
}

export async function PATCH(
  req: NextRequest,
  context: z.infer<typeof reviewCommentRouteContextSchema>,
) {
  try {
    // Validate the route context.
    const { params } = reviewCommentRouteContextSchema.parse(context)

    // Ensure user is authenticated and has access to this resource.
    const token = await getToken({ req })
    const userIdFromParams = getUserIdFromUrl(req)

    if (token && (userIdFromParams === token.id || isAdmin(token))) {
      // Get the request body and validate it.
      const json = await req.json()
      const body = commentPATCHSchema.parse(json)

      // Update the comment review.
      await db
        .update(comment)
        .set(body)
        .where(
          and(eq(comment.id, params.commentId), eq(comment.authorId, token.id)),
        )

      return new Response('Review updated successfully!', { status: 200 })
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

    return new Response(null, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  context: z.infer<typeof reviewCommentRouteContextSchema>,
) {
  try {
    // Validate the route params.
    const { params } = reviewCommentRouteContextSchema.parse(context)

    // Ensure user is authentication and has access to this resource.
    const token = await getToken({ req })
    const userIdFromParams = getUserIdFromUrl(req)

    if (token && (userIdFromParams === token.id || isAdmin(token))) {
      // Delete the list.
      const resultHeader = await db
        .delete(comment)
        .where(eq(comment.id, params.commentId))

      console.log('Deleted rows:', resultHeader.rowsAffected)

      if (!resultHeader.rowsAffected) {
        return new Response(
          'This review does not exist or is already deleted!',
          { status: 404 },
        )
      }

      return new Response(`Deleted review with id: ${params.commentId}`, {
        status: 200,
      })
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
