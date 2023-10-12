import { comment } from '@/db/planetscale'
import { isAdmin } from '@/lib/auth'
import { db } from '@/lib/db'
import { formatSimpleErrorMessage } from '@/lib/utils/utils'
import { userCommentPATCHSchema } from '@/lib/validations/comment'
import { and, eq } from 'drizzle-orm'
import { getToken } from 'next-auth/jwt'
import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'

const routeContextSchema = z.object({
  params: z.object({
    commentId: z.coerce.number(),
    reviewId: z.coerce.number(),
    userId: z.string(),
  }),
})

export async function GET(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    const { params } = routeContextSchema.parse(context)
    const { commentId, reviewId, userId } = params

    const token = await getToken({ req })

    if (token && (userId === token.id || isAdmin(token))) {
      const userComment = await db.query.comment.findMany({
        where: (comment, { eq, and }) =>
          and(eq(comment.resourceId, reviewId), eq(comment.id, commentId)),
      })

      if (!userComment) {
        return new Response('Comment not found', { status: 404 })
      }

      return NextResponse.json(userComment)
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
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    const { params } = routeContextSchema.parse(context)
    const { commentId, reviewId, userId } = params

    const token = await getToken({ req })

    if (token && (userId === token.id || isAdmin(token))) {
      const json = await req.json()
      const body = userCommentPATCHSchema.parse(json)

      const result = await db
        .update(comment)
        .set(body)
        .where(
          and(
            eq(comment.id, commentId),
            eq(comment.authorId, userId),
            eq(comment.resourceId, reviewId),
          ),
        )

      if (!result.rowsAffected) {
        return new Response(
          "This review comment can't be updated, it does not exist or is already deleted or is on another resource!",
          { status: 404 },
        )
      }

      return new Response('Review comment updated successfully!', {
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

    return new Response(null, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context)
    const { commentId, reviewId, userId } = params

    // Ensure user is authentication and has access to this resource.
    const token = await getToken({ req })

    if (token && (userId === token.id || isAdmin(token))) {
      // Delete the list.
      const resultHeader = await db
        .delete(comment)
        .where(
          and(
            eq(comment.resourceType, 'movie_review'),
            eq(comment.authorId, userId),
            eq(comment.resourceId, reviewId),
          ),
        )

      console.log('Deleted rows:', resultHeader.rowsAffected)

      if (!resultHeader.rowsAffected) {
        return new Response(
          'This review comment does not exist or is already deleted!',
          { status: 404 },
        )
      }

      return new Response(`Deleted review comment with id: ${commentId}`, {
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

    return new Response(`Error deleting review comment from the database.`, {
      status: 500,
    })
  }
}
