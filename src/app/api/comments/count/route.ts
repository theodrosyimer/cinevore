import { isAdmin } from '@/lib/auth'
import { db } from '@/db'
import { formatSimpleErrorMessage } from '@/lib/utils/utils'
import { getToken } from 'next-auth/jwt'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req })

    if (!token || !isAdmin(token)) {
      return new Response('Unauthorized', { status: 403 })
    }
    const comments = await db.query.comment.findMany({})

    if (!comments.length) {
      return new Response('No watchlist not found', { status: 404 })
    }

    return NextResponse.json(
      { total: comments.length },
      {
        status: 200,
      },
    )
  } catch (error) {
    if (error instanceof Error) {
      console.log(error)
      return new Response(formatSimpleErrorMessage(error), { status: 500 })
    }
    return new Response(null, { status: 500 })
  }
}
