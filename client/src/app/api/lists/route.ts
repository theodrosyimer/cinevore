import * as z from "zod"

import { db } from "@/lib/db"
import { RequiresProPlanError } from "@/lib/exceptions"
import { getUserSubscriptionPlan } from "@/lib/subscription"
import { movieList } from "@/drizzle/schema"
import { and, eq } from "drizzle-orm"
import { getCurrentUser } from "@/lib/session"
import { NewMovieList } from "@/types/db"

const listCreateSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
})

export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user || !(user?.role === "admin" || user?.role === "superadmin")) {
      return new Response("Unauthorized", { status: 403 })
    }

  } catch (error) {
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
    const body = listCreateSchema.parse(json)

    console.log("BODY", {
      title: body.title,
      content: body.content,
      authorId: user.id,
    })

    // const data: NewList
    await db.insert(movieList).values({
      title: body.title,
      content: body.content,
      authorId: user.id,
      movieId: 87101,
    } as NewMovieList).catch((error) => {
      console.log("ERROR", error)
    })

    return new Response("List created", { status: 201 })
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
