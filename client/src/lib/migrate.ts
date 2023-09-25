import { migrate } from 'drizzle-orm/mysql2/migrator'
import mysql from "mysql2/promise"
import { drizzle } from 'drizzle-orm/mysql2'
import * as dotenv from "dotenv"
import { clearDb } from '@/lib/db'
import { addLists, addMovieLists, addMovies, addUsers } from '@/lib/migrate-data'
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

  console.log("\n🗄️   Migrating the database...\n")

  await migrate(dbMigrationOnly, { migrationsFolder: './drizzle' })


  await dbMigrationOnly.transaction(async (tx) => {
    await Promise.allSettled([addUsers(tx), addMovies(tx), addLists(tx), addMovieLists(tx)])
    console.log("🎉  Migration Done!")
  })
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

