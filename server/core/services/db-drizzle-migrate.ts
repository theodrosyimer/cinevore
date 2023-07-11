import { drizzle } from "drizzle-orm/mysql2"
import mysql from "mysql2/promise"

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_ADMIN,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
})

export default drizzle(connection)
