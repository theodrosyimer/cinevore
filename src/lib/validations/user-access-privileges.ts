/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as schema from '@/db/schema/planetscale'
import { db } from '@/db'

import { getCurrentUser } from '@/lib/session'
import { type TableName, type TableColumns } from '@/types/db'
import { eq } from 'drizzle-orm'

export async function verifyUserAccessPrivileges<
  T extends TableName,
  C extends TableColumns<T>,
>(tableName: T, column: C /* , value: ColumnDataType<T, C> */) {
  const { user } = await getCurrentUser()
  let result

  if (!user) {
    console.log('\nhasAccess:', false)
    return false
  }

  if (column in schema[tableName]) {
    // schema['user']['id']
    // TODO: fix this type
    // @ts-expect-error - fix type
    const key = schema[tableName][column]

    // TODO: fix this type
    // @ts-expect-error - fix type
    result = await db.query[tableName].findFirst({
      where: eq(key, user.id),
    })
  }

  //  or (not sure if this is correct):
  // const count = await db.select({ count: sql<number>`count(*)` }).from(list).where(and(eq(list.id, listId), eq(list.userId, session.user.id)))

  if (!result) {
    console.log('\nhasAccess:', false)
    return false
  }

  console.log('\nresult:', result)
  console.log('hasAccess:', true)
  return true
}
