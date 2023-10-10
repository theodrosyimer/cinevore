import { user } from '@/db/planetscale'
import { isAdmin } from '@/lib/auth'
import { hashPassword } from '@/lib/bcrypt'
import { db } from '@/lib/db'
import { RequiresProPlanError } from '@/lib/exceptions'
import { formatSimpleErrorMessage } from '@/lib/utils/utils'
import { userPOSTSchema } from '@/lib/validations/user'
import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'
import * as z from 'zod'

export async function GET() {
  try {

    const users = await db.query.user.findMany({
      columns: {
        password: false,
      },
    })

    if (!users || !users[0]) {
      return new Response('Users  not found', { status: 404 })
    }

    return new Response(JSON.stringify(users), { status: 200 })
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
    const body = userPOSTSchema.parse(json)
    let hashedPassword = null

    if (body?.password) {
      hashedPassword = await hashPassword(body?.password)
    }

    await db.insert(user).values({
      ...body,
      // have to cast out `void` type returned from `hashPassword`
      password: hashedPassword ?? null,
    })

    return new Response('User created successfully', { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    if (error instanceof RequiresProPlanError) {
      return new Response('Requires Pro Plan', { status: 402 })
    }

    if (error instanceof Error) {
      console.log(error)
      return new Response(formatSimpleErrorMessage(error), { status: 500 })
    }

    return new Response(`Error creating a user from the database.`, {
      status: 500,
    })
  }
}
