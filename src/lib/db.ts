import { type ExecutedQuery } from '@planetscale/database'
import { sql } from 'drizzle-orm'
// import mysql, { FieldPacket } from "mysql2/promise"
import { db } from '@/db'
import type { TableColumns, TableName } from '@/types/db'
import type { MySql2InformationSchemaTables } from '@/types/sql'

export async function clearDbTables(databaseName?: string) {
  const dbName = getDbName(databaseName)

  if (await isDbEmpty(dbName)) {
    return
  }

  const tableNameList = await getTablesName(dbName)

  console.log('🗑️  Preparing delete queries:')

  const queries = tableNameList.map((tableName) => {
    if (!tableName) {
      return
    }

    console.log(`🧨 Preparing delete query for table: ${tableName}`)

    return sql.raw(`DROP TABLE \`${tableName}\`;`)
  })

  await db.transaction(async (tx) => {
    console.log('\nSetting foreign key checks to 0 before sending queries...')
    await tx.execute(sql.raw('SET FOREIGN_KEY_CHECKS = 0;'))

    console.log('\n📨 Sending delete queries...')

    await Promise.all(
      queries.map(async (query) => {
        if (query) await tx.execute(query)
      }),
    )
      .catch((e) => {
        console.error(e)
        throw new Error('Failed to empty the database ❌')
      })
      .finally(() => {
        console.log('\nSetting foreign key checks back to 1\n')

        void tx.execute(sql.raw('SET FOREIGN_KEY_CHECKS = 1;'))
      })
    console.log('🗑️   Database emptied  ✅')
  })
}
export async function getTablesName(
  databaseName?: string,
): Promise<MySql2InformationSchemaTables['TABLE_NAME'][]> {
  const dbName = getDbName(databaseName)

  const result = (await db.execute(
    sql.raw(
      `SELECT TABLE_NAME FROM information_schema.tables WHERE table_schema = '${dbName}' and TABLE_TYPE='BASE TABLE';`,
    ),
  )) as unknown as ExecutedQuery

  if (!result) {
    return []
  }

  const rows = result.rows as MySql2InformationSchemaTables[]

  // log(JSON.stringify(results), 'fg.red')

  return rows.map(
    (row: MySql2InformationSchemaTables) => row.TABLE_NAME,
  ) as unknown as MySql2InformationSchemaTables['TABLE_NAME'][]
}

async function getTablesCountFromDb(databaseName?: string): Promise<number> {
  const dbName = getDbName(databaseName)

  const result = (await db.execute(
    sql.raw(
      `SELECT TABLE_NAME FROM information_schema.tables WHERE table_schema = '${dbName}' and TABLE_TYPE='BASE TABLE';`,
    ),
  )) as unknown as ExecutedQuery

  if (!result?.size) {
    return 0
  }

  return result.size
}

async function isDbEmpty(databaseName?: string): Promise<boolean> {
  const dbName = getDbName(databaseName)

  const total = await getTablesCountFromDb(dbName)

  if (total === 0) {
    console.log(`"${dbName}" database is empty!\n`)
    return true
  }

  return false
}

export async function getTableStatus(
  tableName: TableName,
) /* : Promise<MySql2TableStatus> */ {
  const results = (await db.execute(
    sql.raw(`show table status like ${tableName}`),
  )) as unknown as ExecutedQuery

  return results /* as MySql2TableStatus */
}

export async function getRowsCount(tableName: TableName) {
  const { size } = await getTableStatus(tableName)
  return !size ? 0 : size
}

export async function getTablesInfos(databaseName?: string) {
  const dbName = getDbName(databaseName)

  const results = (await db.execute(
    sql.raw(
      `SELECT * FROM information_schema.tables WHERE table_schema = ${dbName} and TABLE_TYPE='BASE TABLE';`,
    ),
  )) as unknown as ExecutedQuery

  return results
}

export async function makeColumnEmojiFriendly<
  T extends TableName,
  K extends TableColumns<T>,
>(tableName: T, columnName: K) {
  await db.execute(
    sql.raw(
      `ALTER TABLE ${tableName} MODIFY ${
        columnName as string
      } VARCHAR(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`,
    ),
  )
}

export function getDbName(databaseName?: string) {
  const throwIfNotFound = () => {
    throw new Error('No database name found')
  }
  return (
    (!databaseName ? process.env.DB_NAME : databaseName) ?? throwIfNotFound()
  )
}
