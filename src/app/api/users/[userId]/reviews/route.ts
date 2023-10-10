import { routeContextSchema } from "@/app/api/users/[userId]/route"
import { getUserListsAndReviewsWithCommentsAndLikes } from "@/lib/actions/admin/getUserListsAndReviewsWithCommentsAndLikes"
import { isAdmin } from "@/lib/auth"
import { db } from "@/lib/db"
import { formatSimpleErrorMessage } from "@/lib/utils/utils"
import { getToken } from "next-auth/jwt"
import type { NextRequest } from "next/server"
import { z } from "zod"

export async function GET(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)
    const token = await getToken({ req })
    console.log('token', token)

    if (token?.id && (params.userId === token.id || isAdmin(token))) {
      const reviews = await db.query.user.findMany({
        where: (user, { eq }) => eq(user.id, token.id),

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
