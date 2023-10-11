import * as z from 'zod'

import * as schema from '@/db/planetscale'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'
import { formatSimpleErrorMessage } from '@/lib/utils/utils'
import { insertListSchema } from '@/lib/validations/list'
import { verifyUserAccessPrivileges } from '@/lib/validations/user-access-privileges'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'

const routeContextSchema = z.object({
  params: z.object({
    listId: z.coerce.number(),
  }),
})

export async function GET(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)

    const { user, isAdmin } = await getCurrentUser()

    if (!user || !(await verifyUserAccessPrivileges('list', 'userId'))) {
      return new Response('Unauthorized', { status: 403 })
    }

    const userList = await db.query.movieList.findFirst({
      where: eq(schema.movieList.listId, params.listId),
      // with: {
      //   commentsToMovieList: true,
      // },
    })

    if (!userList) {
      return new Response('User not found', { status: 404 })
    }

    return NextResponse.json(userList)
  } catch (error) {
    if (error instanceof Error) {
      console.log(error)
      return new Response(formatSimpleErrorMessage(error), { status: 500 })
    }

    return new Response(null, { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate route params.
    const { params } = routeContextSchema.parse(context)

    // Check if the user has access to this list.
    if (!(await verifyUserAccessPrivileges('list', 'id'))) {
      return new Response(null, { status: 403 })
    }

    // Get the request body and validate it.
    const json = await req.json()
    const body = insertListSchema.parse(json)

    // Update the list.
    await db
      .update(schema.list)
      .set(body)
      .where(eq(schema.list.id, params.listId))

    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    if (error instanceof Error) {
      console.log(error)
      return new Response(formatSimpleErrorMessage(error), { status: 500 })
    }

    return new Response(`Error updating movie list from the database.`, {
      status: 500,
    })
  }
}

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context)

    // Check if the user has access to this list.
    if (!(await verifyUserAccessPrivileges('list', 'userId'))) {
      return new Response('Unauthorized!', { status: 403 })
    }

    // Delete the list.
    // await db.delete(schema.movieList).where(and(eq(schema.movieList.listId, params.listId), eq(schema.movieList.userId, user.id)))

    return new Response(null, { status: 204 })
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
