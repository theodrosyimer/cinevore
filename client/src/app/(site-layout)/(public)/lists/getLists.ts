import { SelectList } from "@/types/db"

export async function getLists() {
  const data = await fetch(`${process.env.NEXTAUTH_URL}/api/lists`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  return data.json() as Promise<SelectList[]>
}
