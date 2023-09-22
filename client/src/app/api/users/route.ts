import * as z from "zod"

import { db } from "@/lib/db"
import { RequiresProPlanError } from "@/lib/exceptions"
import { getUserSubscriptionPlan } from "@/lib/subscription"
import UsersModel from "@/drizzle/users"
import { getCurrentUser } from "@/lib/session"
import { hashPassword } from "@/lib/bcrypt"
// import { getTableStatus } from "@/lib/utils"

const userCreateSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(25),
  name: z.string().min(2).max(50),
})
export async function GET() {
  try {
    const user = await getCurrentUser()
    // const tableStatus = await getTableStatus('user')

    // const usersCount = tableStatus.Rows
    // console.log('USERS COUNT:', usersCount)
    // console.log('CURRENT USER user.role:', user?.role)

    if (!(user?.role === "admin")) {
      return new Response("Unauthorized", { status: 403 })
    }

    const users = await UsersModel.getAll()

    return new Response(JSON.stringify(users))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()

    if (!user || !(user?.role === "admin")) {
      return new Response("Unauthorized", { status: 403 })
    }

    // const subscriptionPlan = await getUserSubscriptionPlan(user.id)

    // // If user is on a free plan.
    // // Check if user has reached limit of 3 posts.
    // if (!subscriptionPlan?.isPro) {
    //   const count = await db.post.count({
    //     where: {
    //       authorId: user.id,
    //     },
    //   })

    //   if (count >= 3) {
    //     throw new RequiresProPlanError()
    //   }
    // }

    const json = await req.json()
    const body = userCreateSchema.parse(json)

    const hashedPassword = await hashPassword(body.password)

    if (!hashedPassword) {
      throw new Error("Failed to hash password")
      // return null
    }

    await UsersModel.create({
      email: body.email,
      password: hashedPassword,
      name: body.name,
    }).catch((error) => {
      console.log("ERROR", error)
    })

    return new Response('User created succesfully', { status: 201 })
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
