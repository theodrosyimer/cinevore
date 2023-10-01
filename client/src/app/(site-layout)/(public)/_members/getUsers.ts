import * as dotenv from "dotenv"
dotenv.config()

import { SelectUser } from "@/types/db"

export async function getUsers() {
  const data = await fetch(`${process.env.SERVER_URL}/api/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  const json = await data.json() as SelectUser[]
  return json
}
