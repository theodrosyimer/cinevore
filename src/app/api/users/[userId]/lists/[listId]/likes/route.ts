import { like, likeToMovieReview } from '@/db/planetscale'
import { isAdmin } from '@/lib/auth'
import { db } from '@/lib/db'
import { formatSimpleErrorMessage } from '@/lib/utils/utils'
import { getToken } from 'next-auth/jwt'
import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'

const routeContextSchema = z.object({
  params: z.object({
    listId: z.coerce.number(),
    userId: z.string(),
  }),
})

export async function GET(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    const { params } = routeContextSchema.parse(context)
    const { listId, userId } = params

    const token = await getToken({ req })

    if (token && (userId === token.id || isAdmin(token))) {
      const reviewLikes = await db.query.list.findMany({
        where: (list, { eq }) => eq(list.id, listId),
        columns: {},
        with: {
          likes: true,
        },
      })

      if (!reviewLikes) {
        return new Response(`Review comments not found`, { status: 404 })
      }

      return NextResponse.json(reviewLikes)
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
    const { listId, userId } = params

    const token = await getToken({ req })

    if (!token || (token && !(userId === token.id || isAdmin(token)))) {
      return new Response('Unauthorized', { status: 403 })
    }

    const result = await db.transaction(async (tx) => {
      // check if user already like this review
      const results = await tx.query.list.findMany({
        where: (list, { eq }) => eq(list.id, listId),
        columns: {},
        with: {
          likes: {
            // TODO: fill a bug report for this
            // @ts-ignore
            where: (like, { eq }) => eq(like.authorId, userId!),
            // columns: {
            //   authorId: true,
            // },
          },
        },
      })

      // TODO: fill a bug report for this
      // @ts-ignore
      const filteredResults = results.filter((result) => result.like !== null)

      // if result is `undefined`, then user has not liked this review yet
      if (filteredResults.length) {
        return filteredResults
      }

      // get the like author id
      const resultHeaders = await tx.insert(like).values({
        authorId: userId!,
      })
      // then use the like id to create a likeToMovieReview
      await tx.insert(likeToMovieReview).values({
        likeId: Number(resultHeaders.insertId),
        movieReviewId: listId,
      })
    })

    // if result has a value, then user has already liked this review
    if (result) {
      return new Response('User already like this review!', { status: 409 })
    }

    return NextResponse.json(
      { message: 'Review like created successfully' },
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
      `Error creating adding a like to the review from the database.`,
      {
        status: 500,
      },
    )
  }
}
