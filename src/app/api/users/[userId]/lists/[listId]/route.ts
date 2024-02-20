import { list, movieReview } from '@/db/schema/planetscale'
import { isAdmin } from '@/lib/auth'
import { db } from '@/db'
import { formatSimpleErrorMessage } from '@/lib/utils/utils'
import { listPATCHSchema } from '@/lib/validations/routes/list'
import { reviewPATCHSchema } from '@/lib/validations/routes/review'
import { eq } from 'drizzle-orm'
import { getToken } from 'next-auth/jwt'
import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'

const reviewRouteContextSchema = z.object({
  params: z.object({
    userId: z.string(),
    listId: z.coerce.number(),
  }),
})

export async function GET(
  req: NextRequest,
  context: z.infer<typeof reviewRouteContextSchema>,
) {
  try {
    // Validate the route context.
    const { params } = reviewRouteContextSchema.parse(context)
    const { listId, userId } = params

    // Ensure user is authenticated and has access to this resource.
    const token = await getToken({ req })

    if (token && (userId === token.id || isAdmin(token))) {
      const userReviews = await db.query.list.findMany({
        where: (list, { eq, and }) =>
          and(eq(list.userId, userId), eq(list.id, listId)),
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
  context: z.infer<typeof reviewRouteContextSchema>,
) {
  try {
    // Validate the route context.
    const { params } = reviewRouteContextSchema.parse(context)
    const { listId, userId } = params

    // Ensure user is authenticated and has access to this resource.
    const token = await getToken({ req })

    if (token && (userId === token.id || isAdmin(token))) {
      // Get the request body and validate it.
      const json = (await req.json()) as unknown
      const body = listPATCHSchema.parse(json)

      // Update the list.
      await db.update(list).set(body).where(eq(list.id, listId))

      return new Response('List updated successfully!', { status: 200 })
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
  context: z.infer<typeof reviewRouteContextSchema>,
) {
  try {
    // Validate the route params.
    const { params } = reviewRouteContextSchema.parse(context)
    const { listId, userId } = params

    // Ensure user is authentication and has access to this resource.
    const token = await getToken({ req })

    if (token && (userId === token.id || isAdmin(token))) {
      // Delete the list.
      const resultHeader = await db.delete(list).where(eq(list.id, listId))

      console.log('Deleted rows:', resultHeader.rowsAffected)

      if (!resultHeader.rowsAffected) {
        return new Response(
          'This review does not exist or is already deleted!',
          { status: 404 },
        )
      }

      return new Response(`Deleted review with id: ${listId}`, {
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
