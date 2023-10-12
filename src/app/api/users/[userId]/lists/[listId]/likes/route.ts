import { like } from '@/db/planetscale'
import { isAdmin } from '@/lib/auth'
import { db } from '@/lib/db'
import { formatSimpleErrorMessage } from '@/lib/utils/utils'
import { and, eq } from 'drizzle-orm'
import { getToken } from 'next-auth/jwt'
import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'

const routeContextSchema = z.object({
  params: z.object({
    listId: z.coerce.number(),
    userId: z.string(),
  }),
})

export async function GET(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    const { params } = routeContextSchema.parse(context)
    const { listId, userId } = params

    const token = await getToken({ req })

    if (token && (userId === token.id || isAdmin(token))) {
      const reviewLikes = await db.query.like.findMany({
        where: (like, { eq, and }) =>
          and(eq(like.resourceId, listId), eq(like.resourceType, 'movie_list')),
      })

      if (!reviewLikes) {
        return new Response(`Review likes not found`, { status: 404 })
      }

      return NextResponse.json(reviewLikes)
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

export async function POST(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    const { params } = routeContextSchema.parse(context)
    const { listId, userId } = params

    const token = await getToken({ req })

    if (!token || (token && !(userId === token.id || isAdmin(token)))) {
      return new Response('Unauthorized', { status: 403 })
    }

    const isLikeAdded = await db.transaction(async (tx) => {
      const foundLike = await tx.query.like.findFirst({
        where: (like, { eq, and }) =>
          and(
            eq(like.resourceId, listId),
            eq(like.resourceType, 'movie_list'),
            eq(like.authorId, userId),
          ),
      })

      if (foundLike) {
        return false
      }

      await tx.insert(like).values({
        resourceId: listId,
        resourceType: 'movie_list',
        authorId: userId,
      })
      // if NOT `result.rowsAffected`, then user has already liked this review

      return true
    })

    if (!isLikeAdded) {
      return new Response('User already like this review!', { status: 409 })
    }
    return NextResponse.json(
      { message: 'Review like added successfully' },
      { status: 201 },
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    if (error instanceof Error) {
      console.log(error)
      return new Response(formatSimpleErrorMessage(error), { status: 500 })
    }

    return new Response(
      `Error creating adding a like to the review from the database.`,
      {
        status: 500,
      },
    )
  }
}

export async function DELETE(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context)
    const { listId, userId } = params
    // Ensure user is authentication and has access to this resource.
    const token = await getToken({ req })

    if (token && (userId === token.id || isAdmin(token))) {
      const result = await db.transaction(async (tx) => {
        // Delete the list and the relationship to the review.
        const resultHeader = await tx
          .delete(like)
          .where(
            and(
              eq(like.resourceType, 'movie_list'),
              eq(like.authorId, userId),
              eq(like.resourceId, listId),
            ),
          )

        // if no like was deleted, return early
        if (!resultHeader.rowsAffected) {
          return resultHeader.rowsAffected
        }

        // Delete the like relationship to the review.
        await tx
          .delete(like)
          .where(
            and(
              eq(like.resourceId, listId),
              eq(like.resourceType, 'movie_list'),
              eq(like.authorId, userId),
            ),
          )

        return resultHeader.rowsAffected
      })

      if (result) {
        return new Response(`Deleted like to list with id: ${listId}`, {
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

    return new Response(`Error deleting list like from the database.`, {
      status: 500,
    })
  }
}
