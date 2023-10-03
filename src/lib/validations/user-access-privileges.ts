import * as schema from "@/db-planetscale"

import { getCurrentUser } from "@/lib/session"
import { TableName, TableColumns } from "@/types/db"

export async function verifyUserAccessPrivileges<T extends TableName, C extends TableColumns<T>>(tableName: T, column: C/* , value: ColumnDataType<T, C> */) {
  const { user } = await getCurrentUser()
  let result

  if (!user) {
    console.log('\nhasAccess:', false)
    return false
  }

  if (column in schema[tableName]) {
    // schema['user']['id']
    // TODO: fix this type
    // @ts-ignore
    const key = schema[tableName][column]
    // @ts-ignore
    result = await db.query[tableName].findFirst({
      // @ts-ignore
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
