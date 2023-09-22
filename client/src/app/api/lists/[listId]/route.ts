import * as z from "zod"

import { db } from "@/lib/db"
import { movieListPatchSchema } from "@/lib/validations/movie-list"
import { movieList, user } from "@/drizzle/schema"
import { and, eq } from "drizzle-orm"
import { getCurrentUser } from "@/lib/session"

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
    await db.delete(movieList).where(and(eq(movieList.movieId, params.listId), eq(movieList.authorId, user.id)))

    return new Response(null, { status: 204 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
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
    if (!(await verifyCurrentUserHasAccessToMovieList(params.listId))) {
      return new Response(null, { status: 403 })
    }

    // Get the request body and validate it.
    const json = await req.json()
    const body = movieListPatchSchema.parse(json)

    // Update the list.
    // TODO: Implement sanitization for content.
    await db.update(movieList).set({
      title: body.title,
      authorId: body.authorId,
      movieId: body.movieId,
    }).where(and(eq(movieList.movieId, params.listId), eq(movieList.authorId, user.id))).catch((error) => {
      console.log("ERROR", error)
    })

    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

async function verifyCurrentUserHasAccessToMovieList(listId: number) {
  const user = await getCurrentUser()

  if (!user) {
    return false
  }

  const result = await db.query.movieList.findMany({
    where: and(eq(movieList.movieId, listId), eq(movieList.authorId, user.id)),
  })

  //  or (not sure if this is correct):
  // const count = await db.select({ count: sql<number>`count(*)` }).from(list).where(and(eq(list.id, listId), eq(list.authorId, session.user.id)))

  return result.length > 0
}
