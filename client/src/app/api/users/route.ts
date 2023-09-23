import * as z from "zod"

import { RequiresProPlanError } from "@/lib/exceptions"
import UsersModel from "@/drizzle/users"
import { getCurrentUser } from "@/lib/session"
import { insertUserSchema } from "@/lib/validations/user"

const userCreateSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(25),
  name: z.string().min(2).max(50),
})

export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user || !(user?.role === "admin" || user?.role === "superadmin")) {
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

    if (!user || !(user?.role === "admin" || user?.role === "superadmin")) {
      return new Response("Unauthorized", { status: 403 })
    }

    const json = await req.json()
    const body = insertUserSchema.parse(json)

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
