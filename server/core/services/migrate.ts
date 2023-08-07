import { migrate } from 'drizzle-orm/mysql2/migrator'
import { dbMigrationOnly } from './drizzle'
import { role, user } from '@/users/models/schema'
import { hashPassword } from '@/lib/bcrypt'

async function main() {
  await migrate(dbMigrationOnly, { migrationsFolder: './drizzle' })

  await dbMigrationOnly.insert(role).values([{ role: 'user', roleId: 0 }, { role: 'admin', roleId: 1 }])

  const adminPassword = await hashPassword('!#tHeodros1') as string

  await dbMigrationOnly.insert(user).values({ lastname: 'Yimer', firstname: 'Theodros', username: 'theo', email: 'theo@example.com', password: adminPassword, roleId: 1 })
}

main()
