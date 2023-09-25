import * as z from "zod"

import { hashPassword } from "@/lib/bcrypt"
import { db } from "@/lib/db"
import { RequiresProPlanError } from "@/lib/exceptions"
import { getCurrentUser } from "@/lib/session"
import { userPostSchema } from "@/lib/validations/user"
import UsersModel from "@/models/users"
import { user } from "@/schema"

export async function GET() {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser || !(currentUser?.role === "admin" || currentUser?.role === "superadmin")) {
      return new Response("Unauthorized", { status: 403 })
    }

    console.log('Before DB query')
    /* const users = await db.query.user.findMany({
      columns: {},
      with: {
        list: true,
      },
       })
    */

    const users = await UsersModel.getAll()
      .catch((error) => {
        if (error instanceof Error) {
          console.log('Failed to get user list\n', error)
        } else {
          console.log(`Error getting all users from the database.`)
        }
      })

    console.log(users)
    if (!users || !users[0]) {
      return new Response('User with list not found', { status: 404 })
    }

    return new Response(JSON.stringify(users))
  } catch (error) {
    return new Response('OOOOH', { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser || !(currentUser?.role === "admin" || currentUser?.role === "superadmin")) {
      return new Response("Unauthorized", { status: 403 })
    }

    const json = await req.json()
    const body = userPostSchema.parse(json)
    let hashedPassword = null

    if (body?.password) {
      hashedPassword = await hashPassword(body?.password)
    }

    await db.insert(user).values({
      ...body,
      password: !hashedPassword ? null : hashedPassword,
    }).catch((error) => {
      if (error instanceof Error) {
        console.log(error)
        return new Response(null, { status: 500 })

      } else {
        console.log(`Error creating a new list with "userIdId: ${currentUser.id}" from the database.`)
        return new Response(null, { status: 500 })

      }
    })

    return new Response('User created successfully', { status: 201 })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    if (error instanceof RequiresProPlanError) {
      return new Response("Requires Pro Plan", { status: 402 })
    }

    return new Response(null, { status: 500 })
  }
}
