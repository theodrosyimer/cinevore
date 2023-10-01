import { z } from "zod"
import { eq } from "drizzle-orm"

import { db } from "@/lib/db
import UsersModel from "@/models/users"
import { user } from "@/db-planetscale"
import { getCurrentUser } from "@/lib/session"
import { userPatchSchema } from "@/lib/validations/user"
import { formatSimpleErrorMessage } from "@/lib/utils"

const routeContextSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
})

export async function GET(
  req: Request,
  context: z.infer<typeof routeContextSchema>) {
  try {
    const { params } = routeContextSchema.parse(context)

    const { user, isAdmin } = await getCurrentUser()

    if (user && params.userId === user.id || isAdmin) {
      const dbUser = await UsersModel.getById(params.userId)

      if (!dbUser || !dbUser[0]) {
        return new Response('User not found', { status: 404 })
      }

      return new Response(JSON.stringify(dbUser[0]))
    }

    return new Response("Unauthorized", { status: 403 })
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
    // Validate the route context.
    const { params } = routeContextSchema.parse(context)

    // Ensure user is authenticated and has access to this user.
    const { user: currentUser, isAdmin } = await getCurrentUser()

    if (currentUser && params.userId === currentUser.id || isAdmin) {
      // Get the request body and validate it.
      const json = await req.json()
      const body = userPatchSchema.parse(json)

      // Update the user.
      await db.update(user).set(body).where(eq(user.id, params.userId))

      return new Response('User updated successfully!', { status: 200 })
    }

    return new Response("Unauthorized", { status: 403 })
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
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context)

    // Ensure user is authentication and has access to this user.
    const { user: currentUser, isAdmin } = await getCurrentUser()

    if (currentUser && params.userId === currentUser.id || isAdmin) {
      // Delete the list.
      const [resultHeader] = await db.delete(user).where(eq(user.id, params.userId))

      if (!resultHeader.affectedRows) {
        console.log('Deleted rows:', resultHeader.affectedRows)
        return new Response('User already deleted!', { status: 404 })
      }

      return new Response(`User ${params.userId} deleted`, { status: 200 })
    }
    return new Response("Unauthorized", { status: 403 })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    if (error instanceof Error) {
      console.log(error)
      return new Response(formatSimpleErrorMessage(error), { status: 500 })
    }

    return new Response(`Error deleting movie list from the database.`, { status: 500 })
  }
}
