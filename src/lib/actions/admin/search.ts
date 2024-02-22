import { user } from '@/db/schema/planetscale'
import { db } from '@/db'
import { sql } from 'drizzle-orm'

const preparedSearchByName = db
  .select()
  .from(user)
  .where(sql`${user.name} like ${sql.placeholder('name')}`)
  .prepare()

export async function searchByName(name: string) {
  const [user] = await preparedSearchByName.execute({
    name: `%${name.toLowerCase()}%`,
  })
  return user
}
