import { isAdmin } from '@/lib/auth'
import { db } from '@/lib/db'
import { getToken } from 'next-auth/jwt'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req })

    if (!token || !isAdmin(token)) {
      return new Response('Unauthorized', { status: 403 })
    }
    const movieReviews = await db.query.movieReview.findMany({})

    if (!movieReviews.length) {
      return new Response('No watchlist not found', { status: 404 })
    }

    return NextResponse.json(
      { total: movieReviews.length },
      {
        status: 200,
      },
    )
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}
