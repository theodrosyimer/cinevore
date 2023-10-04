import * as dotenv from "dotenv"
dotenv.config()

import { SelectList } from "@/types/db"

export async function getLists() {
  console.log("process.env.SERVER_URL", process.env.SERVER_URL)

  const data = await fetch(`${process.env.SERVER_URL}/api/lists`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })

  return data.json() as Promise<SelectList[]>
}
