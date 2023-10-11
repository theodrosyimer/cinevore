import {
  getUserIdFromUrl,
  getUserResourceIdFromUrl,
} from '@/app/api/users/[userId]/get-user-id-from-url'
import { like, likeToMovieReview } from '@/db/planetscale'
import { isAdmin } from '@/lib/auth'
import { db } from '@/lib/db'
import { formatSimpleErrorMessage } from '@/lib/utils/utils'
import { eq } from 'drizzle-orm'
import { getToken } from 'next-auth/jwt'
import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req })
    const userId = getUserIdFromUrl(req)
    const userReviewId = getUserResourceIdFromUrl(req)

    if (token && (userId === token.id || isAdmin(token))) {
      const reviewLikes = await db.query.likeToMovieReview.findMany({
        where: (likeToMovieReview, { eq }) =>
          eq(likeToMovieReview.movieReviewId, userReviewId),
        columns: {},
        with: {
          like: true,
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

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req })
    const userId = getUserIdFromUrl(req)
    const userReviewId = getUserResourceIdFromUrl(req)

    if (!token || (token && !(userId === token.id || isAdmin(token)))) {
      return new Response('Unauthorized', { status: 403 })
    }

    const result = await db.transaction(async (tx) => {
      // check if user already like this review
      const results = await tx.query.likeToMovieReview.findMany({
        where: (likeToMovieReview, { eq }) =>
          eq(likeToMovieReview.movieReviewId, userReviewId),
        columns: {},
        with: {
          like: {
            where: (like, { eq }) => eq(like.authorId, userId!),
            // columns: {
            //   authorId: true,
            // },
          },
        },
      })

      const filteredResults = results.filter((result) => result.like !== null)

      // if result is `undefined`, then user has not liked this review yet
      if (filteredResults) {
        // console.log('RESULT:', filteredResults)
        return filteredResults
      }

      // get the like author id
      const resultHeaders = await tx.insert(like).values({
        authorId: userId!,
      })
      // then use the like id to create a likeToMovieReview
      await tx.insert(likeToMovieReview).values({
        likeId: Number(resultHeaders.insertId),
        movieReviewId: userReviewId,
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

export async function DELETE(req: NextRequest) {
  try {
    // Validate the route params.

    // Ensure user is authentication and has access to this resource.
    const token = await getToken({ req })
    const userId = getUserIdFromUrl(req)
    const userReviewId = getUserResourceIdFromUrl(req)

    if (token && (userId === token.id || isAdmin(token))) {
      // Delete the list.
      const resultHeader = await db
        .delete(like)
        .where(eq(like.authorId, userId!))

      console.log('Deleted rows:', resultHeader.rowsAffected)

      if (!resultHeader.rowsAffected) {
        return new Response('This like does not exist or is already deleted!', {
          status: 404,
        })
      }

      return new Response(`Deleted like to review with id: ${userReviewId}`, {
        status: 200,
      })
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

    return new Response(`Error deleting movie list from the database.`, {
      status: 500,
    })
  }
}
