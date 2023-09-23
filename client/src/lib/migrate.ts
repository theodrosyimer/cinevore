import { migrate } from 'drizzle-orm/mysql2/migrator'
import mysql from "mysql2/promise"
import { user } from '@/drizzle/schema'
import { drizzle } from 'drizzle-orm/mysql2'
import { env } from '@/env.mjs'
import * as dotenv from "dotenv"
import { clearDb } from '@/lib/db'
import { defaultUsers } from '@/lib/migrate-data'
dotenv.config({ path: '.env.local' })

console.log(process.env.DB_HOST, process.env.DB_ADMIN, process.env.DB_NAME, process.env.DB_PORT)

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_ADMIN,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
})

const dbMigrationOnly = drizzle(connection)

async function main() {
  await clearDb().catch((e) => {
    console.error(e)
    process.exit(1)
  })

  console.log("🗄️   Migrating the database...")

  await migrate(dbMigrationOnly, { migrationsFolder: './src/drizzle' })


  await dbMigrationOnly.transaction(async (tx) => {
    await Promise.all(
      defaultUsers.map(async (defaultUser) => {
        if (defaultUser) await tx.insert(user).values(defaultUser)
      })
    ).catch(() => {
      throw new Error("Failed to add data to the database")
    }).finally(() => {
    })
    console.log("👤  Created 6 new users:\n\t1 superadmin\n\t1 admin\n\t4 users")
    console.log("🎉  Migration Done!")
  })
  process.exit(0)
}

main()
