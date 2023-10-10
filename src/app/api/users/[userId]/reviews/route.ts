import { routeContextSchema } from "@/app/api/users/[userId]/route"
import { getUserListsAndReviewsWithCommentsAndLikes } from "@/lib/actions/admin/getUserListsAndReviewsWithCommentsAndLikes"
import { isAdmin } from "@/lib/auth"
import { db } from "@/lib/db"
import { getUserIdFromUrl } from "@/app/api/users/[userId]/get-user-id-from-url"
import { log } from "@/lib/utils/log"
import { formatSimpleErrorMessage } from "@/lib/utils/utils"
import { getToken } from "next-auth/jwt"
import type { NextRequest } from "next/server"
import { z } from "zod"
import { insertReviewSchema } from "@/lib/validations/review"
import { movieReview } from "@/db/planetscale"

export async function GET(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)

    const token = await getToken({ req })
    const userIdFromParams = getUserIdFromUrl(req)


    if (token && (userIdFromParams === token.id || isAdmin(token))) {
      const reviews = await db.query.movieReview.findMany({
        where: (movieReview, { eq }) => eq(movieReview.userId, token.id)
      })

      if (!reviews) {
        return new Response(`User's reviews not found`, { status: 404 })
      }

      return new Response(JSON.stringify(reviews))
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

    return new Response('Review created successfully', { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    if (error instanceof Error) {
      console.log(error)
      return new Response(formatSimpleErrorMessage(error), { status: 500 })
    }

    return new Response(`Error creating a review from the database.`, {
      status: 500,
    })
  }
}
