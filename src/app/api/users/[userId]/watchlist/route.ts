import * as z from 'zod'

import { watchlistToMovies } from '@/db/planetscale'
import { isAdmin } from '@/lib/auth'
import { db } from '@/lib/db'
import { RequiresProPlanError } from '@/lib/exceptions'
import { movieToWatchlistPOSTSchema } from '@/lib/validations/routes/watchlist'
import { getToken } from 'next-auth/jwt'
import { NextResponse, type NextRequest } from 'next/server'

const routeContextSchema = z.object({
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
    const { userId } = params

    const token = await getToken({ req })

    if (!token || !(userId === token.id || isAdmin(token))) {
      return new Response('Unauthorized', { status: 403 })
    }
    const userWatchlist = await db.query.watchlist.findFirst({
      where: (watchlist, { eq }) => eq(watchlist.userId, userId),
      with: {
        movies: true,
      },
    })

    if (!userWatchlist) {
      return new Response("User's watchlist not found", { status: 404 })
    }

    return NextResponse.json(userWatchlist, {
      status: 200,
    })
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

export async function POST(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    const { params } = routeContextSchema.parse(context)
    const { userId } = params

    const token = await getToken({ req })

    if (!token || !(userId === token.id || isAdmin(token))) {
      return new Response('Unauthorized', { status: 403 })
    }

    const json = await req.json()
    const body = movieToWatchlistPOSTSchema.parse(json)

    const userWatchlist = await db.query.watchlist.findFirst({
      where: (watchlist, { eq }) => eq(watchlist.userId, userId),
      columns: {
        id: true,
      },
      with: {
        movies: true,
      },
    })

    const isFound = userWatchlist?.movies?.find(
      (movie) => movie.movieId === body.movieId,
    )

    if (isFound) {
      return new Response('Movie already added to watchlist', { status: 409 })
    }

    await db
      .insert(watchlistToMovies)
      .values({ ...body, watchlistId: userWatchlist?.id! })

    return new Response('Movie added successfully to watchlist', {
      status: 201,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    if (error instanceof RequiresProPlanError) {
      return new Response('Requires Pro Plan', { status: 402 })
    }

    return new Response(null, { status: 500 })
  }
}
