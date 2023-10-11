import { getUserListsAndReviewsWithCommentsAndLikes } from "@/lib/actions/admin/getUserListsAndReviewsWithCommentsAndLikes"
import { isAdmin } from "@/lib/auth"
import { formatSimpleErrorMessage } from "@/lib/utils/utils"
import { getToken } from "next-auth/jwt"
import type { NextRequest } from "next/server"
import { z } from "zod"

const routeContextSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
})

export async function GET(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)
    const token = await getToken({ req })

    if (token && (params.userId === token.id || isAdmin(token))) {
      const [dbUser] = await getUserListsAndReviewsWithCommentsAndLikes(params.userId)

      if (!dbUser) {
        return new Response('User not found', { status: 404 })
      }

      return NextResponse.json(dbUser)
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
