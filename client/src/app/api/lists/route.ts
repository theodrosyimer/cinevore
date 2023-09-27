import * as z from "zod"

import { list, movieList, user } from "@/schema"
import { db } from "@/lib/db"
import { RequiresProPlanError } from "@/lib/exceptions"
import { getCurrentUser } from "@/lib/session"
// import { movieListPostSchema } from "@/lib/validations/movie-list"
import { eq } from "drizzle-orm"
import { formatSimpleErrorMessage } from "@/lib/utils"

export async function GET() {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser || !(currentUser?.role === "admin" || currentUser?.role === "superadmin")) {
      return new Response("Unauthorized", { status: 403 })
    }

    console.log("currentUser:", currentUser)

    const lists = await db.query.list.findMany({
      // where: eq(list.userId, currentUser.id),
      // with: {
      //   movieList: true,
      //   with: {
      //     comments: true,
      //   }
      // },
    })

    return new Response(JSON.stringify(lists))

  } catch (error) {
    if (error instanceof Error) {
      console.log(error)
      return new Response(formatSimpleErrorMessage(error), { status: 500 })
    }

    return new Response(null, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()

    if (!user || !(user?.role === "admin" || user?.role === "superadmin")) {
      return new Response("Unauthorized", { status: 403 })
    }

    // const subscriptionPlan = await getUserSubscriptionPlan(user.id)

    // If user is on a free plan.
    // Check if user has reached limit of 3 posts.
    // if (!subscriptionPlan?.isPro) {
    //   const result = await db.query.list.findMany({
    //     where: eq(list.authorId, user.id),
    //   })

    //   if (result.length >= 3) {
    //     throw new RequiresProPlanError()
    //   }
    // }

    const json = await req.json()
    const body = movieListPostSchema.parse(json)

    const results = await db.insert(list).values({})

    if (!results) {
      return new Response(null, { status: 500 })
    }

    console.log("insert id:", results[0].insertId)

    if (body?.movieId) {
      await db.insert(movieList).values({ ...body, listId: results[0].insertId, movieId: body.movieId, userId: user.id })

      return new Response("List created", { status: 201 })
    }

    return new Response("List created", { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    if (error instanceof RequiresProPlanError) {
      return new Response("Requires Pro Plan", { status: 402 })
    }

    if (error instanceof Error) {
      console.log(error)
      return new Response(formatSimpleErrorMessage(error), { status: 500 })
    }

    return new Response(`Error creating a list from the database.`, { status: 500 })
  }
}
