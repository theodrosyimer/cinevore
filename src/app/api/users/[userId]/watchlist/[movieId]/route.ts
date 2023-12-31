import { watchlistToMovies } from '@/db/schema/planetscale'
import { isAdmin } from '@/lib/auth'
import { db } from '@/db'
import { formatSimpleErrorMessage } from '@/lib/utils/utils'
import { movieToWatchlistDELETESchema } from '@/lib/validations/routes/watchlist'
import { and, eq } from 'drizzle-orm'
import { getToken } from 'next-auth/jwt'
import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'

const routeContextSchema = z.object({
  params: z.object({
    movieId: z.coerce.number(),
    userId: z.string(),
  }),
})

export async function DELETE(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context)
    const { movieId, userId } = params

    // Ensure user is authentication and has access to this resource.
    const token = await getToken({ req })

    // const json = await req.json()
    // const body = movieTowatchlistDELETESchema.parse(json)

    if (token && (userId === token.id || isAdmin(token))) {
      // Find the user watchlist.
      const userWatchlist = await db.query.watchlist.findFirst({
        where: (watchlist, { eq }) => eq(watchlist.userId, userId),
        columns: {
          id: true,
        },
        with: {
          movies: true,
        },
      })

      // Delete the movie from the user watchlist.
      const resultHeader = await db
        .delete(watchlistToMovies)
        .where(
          and(
            eq(watchlistToMovies.watchlistId, userWatchlist?.id!),
            eq(watchlistToMovies.movieId, movieId),
          ),
        )

      console.log('Deleted rows:', resultHeader.rowsAffected)

      if (!resultHeader.rowsAffected) {
        return new Response(
          'This movie does not exist in this user watchlist!',
          { status: 404 },
        )
      }

      return NextResponse.json(
        { message: `Deleted movie to watchlist with id: ${userWatchlist?.id}` },
        {
          status: 200,
        },
      )
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
