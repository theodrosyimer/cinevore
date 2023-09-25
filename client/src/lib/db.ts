import { drizzle } from "drizzle-orm/mysql2"
import { sql } from "drizzle-orm"
import * as schema from '@/schema'
import mysql from "mysql2/promise"

import * as dotenv from "dotenv"
dotenv.config({ path: '.env.local' })

import { TableName, TableStatus } from "@/types/db"

const poolConnection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_ADMIN,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
})

export const db = drizzle(poolConnection, { schema, mode: 'default' })

export async function clearDb() {
  if ((await isDbEmpty(process.env.DB_NAME as string))) { return }

  const tableSchema = db._.schema

  if (!tableSchema) {
    throw new Error("No table schema found")
  }

  console.log("🗑️  Preparing delete queries:")

  const queries = Object.values(tableSchema).map((table) => {
    if (!table.dbName) {
      return
    }

    console.log(`🧨 Preparing delete query for table: ${table.dbName}`)

    return sql.raw(`DROP TABLE \`${table.dbName}\`;`)
  })
  queries.push(sql.raw(`DROP TABLE \`__drizzle_migrations\`;`))

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
  let [total] = await db.execute(sql`SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = ${!databaseName ? process.env.DB_NAME : databaseName} and TABLE_TYPE='BASE TABLE';`) as any

  if (!total || !total[0] || !total[0]['COUNT(*)']) {
    return total = 0
  }

  total = total[0]['COUNT(*)']

  console.log(`\n📊 Total tables in the database: ${total}\n`)

  return total as number
}

async function isDbEmpty(databaseName?: string): Promise<boolean> {
  const total = await getTablesCountFromDb(!databaseName ? process.env.DB_NAME : databaseName)

  return total === 0
}

export async function getTableStatus(tableName: TableName): Promise<TableStatus> {
  const [results] = await db.execute(sql`show table status like ${tableName}`) as any
  return results[0] as TableStatus
}

export async function getTableRowsCount(tableName: TableName) {
  const tableStatus = await getTableStatus(tableName)
  return !tableStatus ? 0 : tableStatus.Rows
}
