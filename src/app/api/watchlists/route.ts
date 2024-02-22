import * as z from 'zod'

import { watchlistToMovies } from '@/db/schema/planetscale'
import { isAdmin } from '@/lib/auth'
import { db } from '@/db'
import { RequiresProPlanError } from '@/lib/exceptions'
import { movieToWatchlistPOSTSchema } from '@/lib/validations/routes/watchlist'
import { getToken } from 'next-auth/jwt'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req })

    if (!token || !isAdmin(token)) {
      return new Response('Unauthorized', { status: 403 })
    }
    const watchlists = await db.query.watchlist.findMany({
      with: {
        movies: true,
      },
    })

    if (!watchlists) {
      return new Response("User's watchlist not found", { status: 404 })
    }

    return NextResponse.json(watchlists, {
      status: 200,
    })
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}
