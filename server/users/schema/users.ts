// import { InferModel } from 'drizzle-orm'
// import { int, mysqlEnum, mysqlTable, serial, text, uniqueIndex, varchar } from 'drizzle-orm/mysql-core'
// import { MySqlRawQueryResult } from 'drizzle-orm/mysql2'
// import { db } from '@/core/services/db-drizzle'

// export const users = mysqlTable('users', {
//   id: serial('id').primaryKey(),
//   fullName: text('full_name'),
//   role: mysqlEnum('role', ['admin', 'user']),
//   phone: varchar('phone', { length: 256 }),
// }, (users) => ({
//   fullnameIndex: uniqueIndex('fullname_idx').on(users.fullName),
// }))

// export type User = InferModel<typeof users> // return type when queried
// export type NewUser = InferModel<typeof users, 'insert'> // insert type

// // example
// async function insertUser(user: NewUser): Promise<MySqlRawQueryResult> {
//   return db.insert(users).values(user)
// }
