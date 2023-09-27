import * as z from "zod"

import { db } from "@/lib/db"
import { movieListPostSchema } from "@/lib/validations/movie-list"
import { movieList, user } from "@/schema"
import { and, eq } from "drizzle-orm"
import { getCurrentUser } from "@/lib/session"
import { formatSimpleErrorMessage } from "@/lib/utils"

const routeContextSchema = z.object({
  params: z.object({
    listId: z.coerce.number(),
  }),
})

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context)

    // Check if the user has access to this list.
    if (!(await verifyCurrentUserHasAccessToMovieList(params.listId))) {
      return new Response('Unauthorized!', { status: 403 })
    }

    // Delete the list.
    await db.delete(movieList).where(and(eq(movieList.listId, params.listId), eq(movieList.userId, user.id)))

    return new Response(null, { status: 204 })
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

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate route params.
    const { params } = routeContextSchema.parse(context)

    // Check if the user has access to this list.
    if (!(await verifyCurrentUserHasAccessToMovieList(params.listId))) {
      return new Response(null, { status: 403 })
    }

    // Get the request body and validate it.
    const json = await req.json()
    const body = movieListPostSchema.parse(json)

    // Update the list.
    await db.update(movieList).set(body).where(and(eq(movieList.movieId, params.listId), eq(movieList.userId, user.id)))

    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    if (error instanceof Error) {
      console.log(error)
      return new Response(formatSimpleErrorMessage(error), { status: 500 })
    }

    return new Response(`Error updating movie list from the database.`, { status: 500 })
  }
}

async function verifyCurrentUserHasAccessToMovieList(listId: number) {
  const user = await getCurrentUser()

  if (!user) {
    return false
  }

  const result = await db.query.movieList.findMany({
    where: and(eq(movieList.userId, user.id), eq(movieList.movieId, listId)),
  })

  //  or (not sure if this is correct):
  // const count = await db.select({ count: sql<number>`count(*)` }).from(list).where(and(eq(list.id, listId), eq(list.userId, session.user.id)))

  return result.length > 0
}
