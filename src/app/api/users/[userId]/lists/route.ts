import { isAdmin } from '@/lib/auth'
import { db } from '@/db'
import { formatSimpleErrorMessage } from '@/lib/utils/utils'
import { getToken } from 'next-auth/jwt'
import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'
import { insertReviewSchema } from '@/lib/validations/routes/review'
import { list, movieReview } from '@/db/schema/planetscale'
import { insertListSchema } from '@/lib/validations/routes/list'
import listsModel from '@/models/lists'

const routeContextSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
})

export async function GET(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    const { params } = routeContextSchema.parse(context)
    const { userId } = params

    const token = await getToken({ req })

    if (token && (userId === token.id || isAdmin(token))) {
      const lists = await listsModel.getAllByUserId(userId)

      if (!lists) {
        return new Response(`User's lists not found`, { status: 404 })
      }

      return NextResponse.json(lists)
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
    const { userId } = params

    const token = await getToken({ req })

    if (!token || (token && !(userId === token.id || isAdmin(token)))) {
      return new Response('Unauthorized', { status: 403 })
    }

    const json = (await req.json()) as unknown
    const body = insertListSchema.parse(json)

    await db.insert(list).values({ ...body, userId })

    return new Response('List created successfully', { status: 201 })
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
