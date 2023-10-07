import * as dotenv from "dotenv"
dotenv.config()

import { userGETSchema } from "@/lib/validations/user"
import { z } from "zod"

const usersSchemas = z.array(userGETSchema)

export async function getUsers() {
  const data = await fetch(`${process.env.SERVER_URL}/api/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    // cache: "no-cache",
  })
  const json = await data.json() as unknown
  const validatedUsers = usersSchemas.safeParse(json)

  if (!validatedUsers.success) {
    console.error(validatedUsers.error.message)
    return []
  }

  return validatedUsers.data
}
