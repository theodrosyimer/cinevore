import {
  getUserIdFromUrl,
  getUserResourceIdFromUrl,
} from '@/app/api/users/[userId]/get-user-id-from-url'
import { comment, commentToMovieReview } from '@/db/planetscale'
import { isAdmin } from '@/lib/auth'
import { db } from '@/lib/db'
import { formatSimpleErrorMessage } from '@/lib/utils/utils'
import { commentPOSTSchema } from '@/lib/validations/comment'
import { getToken } from 'next-auth/jwt'
import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'

const routeContextSchema = z.object({
  params: z.object({
    reviewId: z.coerce.number(),
    userId: z.string(),
  }),
})

export async function GET(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    const { params } = routeContextSchema.parse(context)
    const { reviewId, userId } = params

    const token = await getToken({ req })

    if (token && (userId === token.id || isAdmin(token))) {
      const reviewComments = await db.query.commentToMovieReview.findMany({
        where: (commentToMovieReview, { eq }) =>
          eq(commentToMovieReview.movieReviewId, reviewId),
        columns: {},
        with: {
          comment: true,
        },
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

export async function POST(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    const { params } = routeContextSchema.parse(context)
    const { reviewId, userId } = params

    const token = await getToken({ req })

    if (!token || (token && !(userId === token.id || isAdmin(token)))) {
      return new Response('Unauthorized', { status: 403 })
    }

    const json = await req.json()
    const body = commentPOSTSchema.parse(json)

    await db.transaction(async (tx) => {
      const resultHeaders = await tx.insert(comment).values(body)
      await tx.insert(commentToMovieReview).values({
        commentId: Number(resultHeaders.insertId),
        movieReviewId: reviewId,
      })
      // console.log('HEADERS:', resultHeaders.insertId, result)
    })

    return NextResponse.json(
      { message: 'Review comment created successfully' },
      { status: 201 },
    )
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
