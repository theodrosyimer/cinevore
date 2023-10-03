import * as dotenv from "dotenv"
dotenv.config({ path: '.env.local' })

import * as schema from '@/db-planetscale'
import { connect, type ExecutedQuery } from '@planetscale/database'
import { sql } from "drizzle-orm"
import { drizzle } from "drizzle-orm/planetscale-serverless"
// import mysql, { FieldPacket } from "mysql2/promise"
// import { env } from '@env'
import { log } from "@/lib/utils"
import { TableColumns, TableName } from "@/types/db"
import { MySql2InformationSchemaTables, MySql2TableStatus } from "@/types/sql"
import { Inspect } from "@/types/utility"

const connection = connect({
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD
})

export const db = drizzle(connection, { schema })

export async function clearDbTables(databaseName?: string) {
  const dbName = getDbName(databaseName)

  if ((await isDbEmpty(dbName))) { return }

  const tableNameList = await getTablesName(dbName)

  console.log("🗑️  Preparing delete queries:")

  const queries = tableNameList.map((tableName) => {
    if (!tableName) {
      return
    }

    console.log(`🧨 Preparing delete query for table: ${tableName}`)

    return sql.raw(`DROP TABLE \`${tableName}\`;`)
  })

  await db.transaction(async (tx) => {
    console.log("\nSetting foreign key checks to 0 before sending queries...")
    tx.execute(sql.raw("SET FOREIGN_KEY_CHECKS = 0;"))

    console.log("\n📨 Sending delete queries...")

    await Promise.all(
      queries.map(async (query) => {
        if (query) await tx.execute(query)
      })
    ).catch((e) => {
      console.error(e)
      throw new Error("Failed to empty the database ❌")
    }).finally(() => {
      console.log("\nSetting foreign key checks back to 1\n")

      tx.execute(sql.raw("SET FOREIGN_KEY_CHECKS = 1;"))
    })
    console.log("🗑️   Database emptied  ✅")
  })
}
export async function getTablesName(databaseName?: string): Promise<MySql2InformationSchemaTables['TABLE_NAME'][]> {
  const dbName = getDbName(databaseName)

  const result = await db.execute(sql.raw(`SELECT TABLE_NAME FROM information_schema.tables WHERE table_schema = '${dbName}' and TABLE_TYPE='BASE TABLE';`)) as ExecutedQuery

  if (!result) {
    return []
  }

  const rows = result['rows'] as MySql2InformationSchemaTables[]
  // log(JSON.stringify(results), 'fg.red')
  return rows.map((row: MySql2InformationSchemaTables) => row['TABLE_NAME']) as MySql2InformationSchemaTables['TABLE_NAME'][]
}

async function getTablesCountFromDb(databaseName?: string): Promise<number> {
  const dbName = getDbName(databaseName)

  const result = await db.execute(sql.raw(`SELECT TABLE_NAME FROM information_schema.tables WHERE table_schema = '${dbName}' and TABLE_TYPE='BASE TABLE';`)) as ExecutedQuery

  if (!result || !result['size']) {
    return 0
  }

  // log(JSON.stringify(results), 'fg.red')
  return result['size']
}

// async function getTablesCountFromDb(databaseName?: string): Promise<number> {
//   const dbName = getDbName(databaseName)

//   let total = await db.execute(sql.raw(`SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = \'${dbName}\' and TABLE_TYPE='BASE TABLE';`)) as ExecutedQuery

//   log(JSON.stringify(total['fields']), 'fg.red')

//   if (!total || !total['fields'] || !total['fields'][0] || !total['fields'][0]['columnLength']) {
//     return 0
//   }

//   console.log(`\n📊 Total tables in the database: ${total['fields'][0]['columnLength']}\n`)

//   return total['fields'][0]['columnLength'] as number
// }


async function isDbEmpty(databaseName?: string): Promise<boolean> {
  const dbName = getDbName(databaseName)

  const total = await getTablesCountFromDb(dbName)

  if (total === 0) {
    console.log(`"${dbName}" database is empty!\n`)
    return true
  }

  return false
}

export async function getTableStatus(tableName: TableName)/* : Promise<MySql2TableStatus> */ {
  const results = await db.execute(sql.raw(`show table status like ${tableName}`)) as ExecutedQuery

  return results /* as MySql2TableStatus */
}

export async function getRowsCount(tableName: TableName) {
  const { size } = await getTableStatus(tableName)
  return !size ? 0 : size
}

export async function getTablesInfos(databaseName?: string) {
  const dbName = getDbName(databaseName)

  const results = await db.execute(sql.raw(`SELECT * FROM information_schema.tables WHERE table_schema = ${dbName} and TABLE_TYPE='BASE TABLE';`)) as ExecutedQuery

  return results
}

export async function makeColumnEmojiFriendly<T extends TableName, K extends TableColumns<T>>(tableName: T, columnName: K) {
  await db.execute(sql.raw(`ALTER TABLE ${tableName} MODIFY ${columnName as string} VARCHAR(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`))
}

export function getDbName(databaseName?: string) {
  const throwIfNotFound = () => { throw new Error("No database name found") }
  return (!databaseName ? process.env.DB_NAME : databaseName) ?? throwIfNotFound()
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
