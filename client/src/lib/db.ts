import * as schema from '@/schema'
import { sql } from "drizzle-orm"
import { drizzle } from "drizzle-orm/mysql2"
import mysql, { FieldPacket } from "mysql2/promise"

import * as dotenv from "dotenv"
dotenv.config({ path: '.env.local' })

import { TableColumns, TableName } from "@/types/db"
import { InformationSchemaTables, TableStatus } from "@/types/sql"

const clientPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_ADMIN,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  // password: process.env.DB_PASSWORD,
})

export const db = drizzle(clientPool, { schema, mode: 'default' })

export async function clearDbTables(databaseName?: string) {
  const dbName = getDbName(databaseName)

  if ((await isDbEmpty(dbName))) { return }

  const tableNameList = await getTablesName(dbName)

  console.log("🗑️  Preparing delete queries:")

  const queries = tableNameList.map((tableName) => {
    console.log(`🧨 Preparing delete query for table: ${tableName}`)

    return sql.raw(`DROP TABLE \`${tableName}\`;`)
  })

  await db.transaction(async (tx) => {
    console.log("\nSetting foreign key checks to 0 before sending queries...")
    console.log("\n📨 Sending delete queries...")

    tx.execute(sql.raw("SET FOREIGN_KEY_CHECKS = 0;"))

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

async function getTablesCountFromDb(databaseName?: string): Promise<number> {
  const dbName = getDbName(databaseName)

  let [total] = await db.execute(sql.raw(`SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = \'${dbName}\' and TABLE_TYPE='BASE TABLE';`)) as any

  if (!total || !total[0] || !total[0]['COUNT(*)']) {
    return total = 0
  }

  total = total[0]['COUNT(*)']

  console.log(`\n📊 Total tables in the database: ${total}\n`)

  return total as number
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

export async function getTableStatus(tableName: TableName): Promise<TableStatus> {
  const [results] = await db.execute(sql`show table status like ${tableName}`) as any

  return results[0] as TableStatus
}

export async function getRowsCount(tableName: TableName) {
  const tableStatus = await getTableStatus(tableName)
  return !tableStatus ? 0 : tableStatus.Rows
}

export async function getTablesInfos(databaseName?: string) {
  const dbName = getDbName(databaseName)

  const [results] = await db.execute(sql`SELECT * FROM information_schema.tables WHERE table_schema = ${dbName} and TABLE_TYPE='BASE TABLE';`) as any as [InformationSchemaTables[], FieldPacket[]]

  return results
}

export async function getTablesName(databaseName?: string) {
  const dbName = getDbName(databaseName)

  const [results] = await db.execute(sql`SELECT TABLE_NAME FROM information_schema.tables WHERE table_schema = ${dbName} and TABLE_TYPE='BASE TABLE';`) as any as [InformationSchemaTables[], FieldPacket[]]

  if (!results || (results && !results?.length)) {
    return []
  }

  return results.map((result) => result.TABLE_NAME)
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
