import * as schema from '@/db/schema/mysql2'
import { type MySql2Database, drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'

// import { env } from '@env'

// need to check if it works
// declare global {
//   var db: MySql2Database<typeof schema> | undefined
// }

// let db: MySql2Database<typeof schema>

const mysqlClientPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_ADMIN,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  // password: process.env.DB_PASSWORD,
})

// if (process.env.NODE_ENV === 'production') {
//   // db = drizzle(mysql.createPool(process.env.DATABASE_URL as string), {
//   //   schema,
//   //   mode: 'default',
//   // })

//   db = drizzle(mysql.createPool(mysqlClientPool), {
//     schema,
//     mode: 'default',
//   })
// } else {
//   if (!global.db) {
//     // global.db = drizzle(mysql.createPool(process.env.DATABASE_URL as string), {
//     //   schema,
//     //   mode: 'default',
//     // })

//     global.db = drizzle(mysql.createPool(mysqlClientPool), {
//       schema,
//       mode: 'default',
//     })
//   }
//   db = global.db
// }

// export { db }

export const db = drizzle(mysqlClientPool, { schema, mode: 'default' })
