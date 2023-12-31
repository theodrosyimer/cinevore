import { userGETSchema } from '@/lib/validations/routes/user'
import { z } from 'zod'

const usersSchemas = z.array(userGETSchema)

export async function getUsers() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/users`, {
    method: 'GET',
    cache: 'no-cache',
  })

  if (!data.ok) {
    console.error('Failed to get users')
    return []
  }

  const json = (await data.json()) as unknown
  const validatedUsers = usersSchemas.safeParse(json)

  if (!validatedUsers.success) {
    console.error(validatedUsers.error.message)
    return []
  }

  return validatedUsers.data
}
