import { migrate } from 'drizzle-orm/mysql2/migrator'
import mysql from "mysql2/promise"
import { role, user } from '@/users/models/schema'
import { hashPassword } from '@/lib/bcrypt'
import { drizzle } from 'drizzle-orm/mysql2'

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_ADMIN,
  database: process.env.DRIZZLE_DB_NAME,
  port: Number(process.env.DB_PORT),
})

const dbMigrationOnly = drizzle(connection)

async function main() {
  await migrate(dbMigrationOnly, { migrationsFolder: './drizzle' })

  await dbMigrationOnly.insert(role).values([{ role: 'user', roleId: 0 }, { role: 'admin', roleId: 1 }])

  const adminPassword = await hashPassword('!#tHeodros1') as string

  await dbMigrationOnly.insert(user).values({ lastname: 'Yimer', firstname: 'Theodros', username: 'theo', email: 'theo@example.com', password: adminPassword, roleId: 1 })
}

main()
