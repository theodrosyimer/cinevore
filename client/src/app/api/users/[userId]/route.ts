import { z } from "zod"
import { eq } from "drizzle-orm"

import { db } from "@/lib/db"
import UsersModel from "@/drizzle/users"
import { user } from "@/drizzle/schema"
import { getCurrentUser } from "@/lib/session"
import { userNameSchema } from "@/lib/validations/user"

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
    console.log("params", params)

    const currentUser = await getCurrentUser()

    if (!currentUser || params.userId !== currentUser?.id) {
      return new Response("Unauthorized", { status: 403 })
    }

    const dbUser = await UsersModel.getById(params.userId).catch((error) => {
      console.log("ERROR", error)
    })

    if (!dbUser) {
      return new Response('User not found', { status: 404 })
    }

    return new Response(JSON.stringify(dbUser[0]))
  } catch (error) {
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

    // Ensure user is authentication and has access to this user.
    const currentUser = await getCurrentUser()
    if (!currentUser || params.userId !== currentUser?.id) {
      return new Response(null, { status: 403 })
    }

    // Get the request body and validate it.
    const body = await req.json()
    const payload = userNameSchema.parse(body)

    // Update the user.
    await db.update(user).set(payload).where(eq(user.id, params.userId)).catch((error) => {
      console.log("ERROR", error)
    })

    return new Response('User updated successfully!', { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
