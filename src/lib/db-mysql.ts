/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { db } from '@/db/index-mysql2'
import type { TableColumns, TableName } from '@/types/db'
import type {
  MySql2InformationSchemaTables,
  MySql2TableStatus,
} from '@/types/sql'
import { sql } from 'drizzle-orm'
import { type MySqlRawQueryResult } from 'drizzle-orm/mysql2'
import { type FieldPacket } from 'mysql2/promise'

export async function clearDbTables(databaseName?: string) {
  const dbName = getDbName(databaseName)

  if (await isDbEmpty(dbName)) {
    return
  }

  const tableNameList = await getTablesName(dbName)

  console.log('🗑️  Preparing delete queries:')

  const queries = tableNameList.map((tableName) => {
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

async function getTablesCountFromDb(databaseName?: string): Promise<number> {
  const dbName = getDbName(databaseName)

  let total = (await db.execute(
    sql.raw(
      `SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = \'${dbName}\' and TABLE_TYPE='BASE TABLE';`,
    ),
  )) as unknown as [[unknown[]], FieldPacket[]]

  // @ts-expect-error - that's fine
  if (!total?.[0]?.[0]?.['COUNT(*)']) {
    // @ts-expect-error - that's fine
    return (total = 0)
  }

  // @ts-expect-error - that's fine
  total[0] = total[0][0]['COUNT(*)']

  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  console.log(`\n📊 Total tables in the database: ${total[0]}\n`)

  // @ts-expect-error - that's fine
  return total[0] as number
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
): Promise<MySql2TableStatus> {
  const results = (await db.execute(
    sql.raw(`show table status like ${tableName}`),
  )) as unknown as [MySql2TableStatus[], FieldPacket[]]

  return results[0][0]!
}

export async function getRowsCount(tableName: TableName) {
  const tableStatus = await getTableStatus(tableName)
  return !tableStatus ? 0 : tableStatus.Rows
}

export async function getTablesInfos(databaseName?: string) {
  const dbName = getDbName(databaseName)

  const [results] = (await db.execute(
    sql.raw(
      `SELECT * FROM information_schema.tables WHERE table_schema = ${dbName} and TABLE_TYPE='BASE TABLE';`,
    ),
  )) as unknown as [MySql2InformationSchemaTables[], FieldPacket[]]

  return results
}

export async function getTablesName(databaseName?: string) {
  const dbName = getDbName(databaseName)

  const [results] = (await db.execute(
    sql.raw(
      `SELECT TABLE_NAME FROM information_schema.tables WHERE table_schema = ${dbName} and TABLE_TYPE='BASE TABLE';`,
    ),
  )) as unknown as [MySql2InformationSchemaTables[], FieldPacket[]]

  if (!results || (results && !results?.length)) {
    return []
  }

  return results.map((result) => result.TABLE_NAME)
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

// export async function clearDb(databaseName?: string) {
//   const dbName = getDbName(databaseName)
//   const results = await getAllDbNames()
//   console.log('All DB NAMES:', results)
//   if (results.filter(result => result.Database === dbName)) {

//     await db.execute(sql.raw(`DROP DATABASE IF EXISTS \`${dbName}\`;`))
//     console.log("🗑️   Database dropped  ✅")

//   }
// }
// export async function getAllDbNames() {
//   const results = await db.execute(sql.raw(`SHOW DATABASES;`)) as any as [{ Database: string }[], FieldPacket[]]
//   return results[0]
// }

// export async function createDb(databaseName?: string) {
//   const dbName = getDbName(databaseName)
//   await db.execute(sql.raw(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`)).catch((e) => {
//     console.error(e)
//     throw new Error("Failed to create the database ❌")
//   })
// }

// export async function clearDbTablesFromSchema() {
//   if ((await isDbEmpty(process.env.DB_NAME as string))) { return }

//   const tableSchema = db._.schema

//   if (!tableSchema) {
//     throw new Error("No table schema found")
//   }

//   console.log("🗑️  Preparing delete queries:")

//   const queries = Object.values(tableSchema).map((table) => {
//     if (!table.dbName) {
//       return
//     }

//     console.log(`🧨 Preparing delete query for table: ${table.dbName}`)

//     return sql.raw(`DROP TABLE \`${table.dbName}\`;`)
//   })
//   queries.push(sql.raw(`DROP TABLE \`__drizzle_migrations\`;`))

//   await db.transaction(async (tx) => {
//     console.log("\nSetting foreign key checks to 0 before sending queries...")
//     console.log("\n📨 Sending delete queries...")

//     tx.execute(sql.raw("SET FOREIGN_KEY_CHECKS = 0;"))

//     await Promise.all(
//       queries.map(async (query) => {
//         if (query) await tx.execute(query)
//       })
//     ).catch((e) => {
//       console.error(e)
//       throw new Error("Failed to empty the database ❌")
//     }).finally(() => {
//       console.log("\nSetting foreign key checks back to 1\n")

//       tx.execute(sql.raw("SET FOREIGN_KEY_CHECKS = 1;"))
//     })
//     console.log("🗑️   Database emptied  ✅")
//   })
// }
