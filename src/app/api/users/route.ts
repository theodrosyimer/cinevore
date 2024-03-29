import { user } from '@/db/schema/planetscale'
import { isAdmin } from '@/lib/auth'
import { hashPassword } from '@/lib/bcrypt'
import { db } from '@/db'
import { formatSimpleErrorMessage } from '@/lib/utils/utils'
import { userPOSTSchema } from '@/lib/validations/routes/user'
import usersModel from '@/models/users'
import { getToken } from 'next-auth/jwt'
import { NextResponse, type NextRequest } from 'next/server'
import * as z from 'zod'

export async function GET() {
  try {
    const users = await db.query.user.findMany({
      columns: {
        password: false,
      },
    })

    if (!users?.[0]) {
      return new Response('Users  not found', { status: 404 })
    }

    return NextResponse.json(users, { status: 200 })
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

    const json = (await req.json()) as unknown
    const body = userPOSTSchema.parse(json)
    let hashedPassword = null

    if (body?.password) {
      hashedPassword = await hashPassword(body?.password)
    }
    await usersModel.create({
      ...body,
      // have to cast out `void` type returned from `hashPassword`
      password: hashedPassword ?? null,
    })

    return new Response('User created successfully', { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
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
