import { migrate } from 'drizzle-orm/mysql2/migrator'
import mysql from "mysql2/promise"
import { user } from '@/drizzle/schema'
import { hashPassword } from '@/lib/bcrypt'
import { drizzle } from 'drizzle-orm/mysql2'
import { env } from '@/env.mjs'
import * as dotenv from "dotenv"
import { clearDb } from '@/lib/db'
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
    // console.error(e)
    throw e // rethrow to prevent the script from continuing
  })

  console.log("🗄️   Migrating the database...")

  await migrate(dbMigrationOnly, { migrationsFolder: './src/drizzle' })

  const adminPassword = await hashPassword('!#tHeodros1') as string

  dbMigrationOnly.insert(user).values({
    lastname: 'Yimer',
    firstname: 'Theodros',
    name: 'theo',
    email: 'theo@example.com',
    password: adminPassword,
    role: 'admin',
    emailVerified: null,
  })

  console.log("👤  Created admin user")
  console.log("🎉  Migration Done!")
  process.exit(0)
}

main()
