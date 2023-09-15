import { migrate } from 'drizzle-orm/mysql2/migrator'
import mysql from "mysql2/promise"
import { role, user } from '@/drizzle/schema'
import { hashPassword } from '@/lib/bcrypt'
import { drizzle } from 'drizzle-orm/mysql2'
import { env } from '@/env.mjs'
import * as dotenv from "dotenv"
dotenv.config({ path: '.env.local' })

console.log(process.env.DB_HOST, process.env.DB_ADMIN, process.env.DRIZZLE_DB_NAME, process.env.DB_PORT)

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_ADMIN,
  database: process.env.DRIZZLE_DB_NAME,
  port: Number(process.env.DB_PORT),
  // password: process.env.DB_PASSWORD,
})

const dbMigrationOnly = drizzle(connection)

async function main() {
  await migrate(dbMigrationOnly, { migrationsFolder: './src/drizzle' })

  await dbMigrationOnly.insert(role).values([{ role: 'user', id: 0 }, { role: 'admin', id: 1 }])

  const adminPassword = await hashPassword('!#tHeodros1') as string

  await dbMigrationOnly.insert(user).values({ lastname: 'Yimer', firstname: 'Theodros', name: 'theo', email: 'theo@example.com', password: adminPassword, roleId: 1, emailVerified: null })
}

await main()
