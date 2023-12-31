import { routeContextSchema } from '@/app/api/users/[userId]/route'
import { isAdmin } from '@/lib/auth'
import { db } from '@/db'
import { formatSimpleErrorMessage } from '@/lib/utils/utils'
import { and, or, sql } from 'drizzle-orm'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export async function GET(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    const { params } = routeContextSchema.parse(context)

    const token = await getToken({ req })

    if ((token && params.userId === token.id) || isAdmin(token)) {
      const moviesInfos = await db.query.movieInfosToUser.findMany({
        where: (movieInfosToUser, { eq }) =>
          and(
            eq(movieInfosToUser.userId, params.userId),
            or(
              eq(movieInfosToUser.watched, true),
              eq(movieInfosToUser.reviewed, true),
            ),
          ),
      })

      if (!moviesInfos) {
        return new Response('Movies infos not found', { status: 404 })
      }

      return NextResponse.json(moviesInfos)
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
