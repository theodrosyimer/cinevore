import { routeContextSchema } from '@/app/api/users/[userId]/route'
import { isAdmin } from '@/lib/auth'
import { db } from '@/lib/db'
import {
  getUserIdFromUrl,
  getUserResourceIdFromUrl,
} from '@/app/api/users/[userId]/get-user-id-from-url'
import { formatSimpleErrorMessage } from '@/lib/utils/utils'
import { getToken } from 'next-auth/jwt'
import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'
import { insertReviewSchema } from '@/lib/validations/review'
import { movieReview } from '@/db/planetscale'

export async function GET(req: NextRequest) {
  try {
    // const { params } = routeContextSchema.parse(context)

    const token = await getToken({ req })
    const userIdFromParams = getUserIdFromUrl(req)
    const userReviewId = getUserResourceIdFromUrl(req)

    if (token && (userIdFromParams === token.id || isAdmin(token))) {
      const reviewComments = await db.query.movieReview.findMany({
        where: (movieReview, { eq, and }) =>
          and(
            eq(movieReview.id, userReviewId),
            eq(movieReview.userId, userIdFromParams!),
          ),
      })

      if (!reviewComments) {
        return new Response(`Review comments not found`, { status: 404 })
      }

      return NextResponse.json(reviewComments)
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

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req })

    if (token && !isAdmin(token)) {
      return new Response('Unauthorized', { status: 403 })
    }

    const json = await req.json()
    const body = insertReviewSchema.parse(json)

    await db.insert(movieReview).values(body)

    return new Response('Review comment created successfully', { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    if (error instanceof Error) {
      console.log(error)
      return new Response(formatSimpleErrorMessage(error), { status: 500 })
    }

    return new Response(
      `Error creating a comment to the review from the database.`,
      {
        status: 500,
      },
    )
  }
}
