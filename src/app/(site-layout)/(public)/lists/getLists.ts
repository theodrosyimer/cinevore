import * as dotenv from 'dotenv'
dotenv.config()

import { userGETSchema } from '@/lib/validations/user'
import { z } from 'zod'
import { selectListSchema } from '@/lib/validations/list'

const listsSchema = z.array(selectListSchema)

export async function getLists() {
  const data = await fetch(`${process.env.SERVER_URL}/api/lists`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-cache',
  })
  const json = await data.json() as unknown
  console.log('json', json)
  const validatedLists = listsSchema.safeParse(json)

  if (!validatedLists.success) {
    console.error(validatedLists.error.message)
    return []
  }

  console.log('validatedLists', validatedLists)
  return validatedLists.data
}
