import { user } from '@/db/planetscale'
import { isAdmin } from '@/lib/auth'
import { db } from '@/lib/db'
import { formatSimpleErrorMessage } from '@/lib/utils/utils'
import { userPatchSchema } from '@/lib/validations/user'
import UsersModel from '@/models/users'
import { eq } from 'drizzle-orm'
import { getToken } from 'next-auth/jwt'
import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'

export const routeContextSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
})

export async function GET(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    const { params } = routeContextSchema.parse(context)

    const token = await getToken({ req })

    if (token && (params.userId === token.id || isAdmin(token))) {
      const dbUser = await UsersModel.getById(params.userId)

      if (!dbUser) {
        return new Response('User not found', { status: 404 })
      }

      return NextResponse.json(dbUser, {
        status: 200,
      })
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
    // Validate the route context.
    const { params } = routeContextSchema.parse(context)

    // Ensure user is authenticated and has access to this resource.
    const token = await getToken({ req })

    if (token && (params.userId === token.id || isAdmin(token))) {
      // Get the request body and validate it.
      const json = await req.json()
      const body = userPatchSchema.parse(json)

      // Update the user.
      await db.update(user).set(body).where(eq(user.id, params.userId))

      return new Response('User updated successfully!', { status: 200 })
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

    // Ensure user is authentication and has access to this user.
    const token = await getToken({ req })

    if (token && (params.userId === token.id || isAdmin(token))) {
      // Delete the list.
      const resultHeader = await db
        .delete(user)
        .where(eq(user.id, params.userId))

      console.log('Deleted rows:', resultHeader.rowsAffected)

      if (!resultHeader.rowsAffected) {
        return new Response('User does not exist or is already deleted!', {
          status: 404,
        })
      }

      return new Response(`Deleted user with id: ${params.userId}`, {
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
