import { selectListSchema } from '@/lib/validations/routes/list'
import { z } from 'zod'

const listsSchema = z.array(selectListSchema)

export async function getLists() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/lists`, {
    method: 'GET',
    cache: 'no-cache',
  })

  if (!data.ok) {
    console.error('Failed to get lists')
    return []
  }

  // console.log('data', data)

  const json = (await data.json()) as unknown
  // console.log('json', json)
  const validatedLists = listsSchema.safeParse(json)

  if (!validatedLists.success) {
    console.error(validatedLists.error.message)
    return []
  }

  // console.log('validatedLists', validatedLists)
  return validatedLists.data
}
