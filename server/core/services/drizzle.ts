import { drizzle } from "drizzle-orm/mysql2"
import mysql from "mysql2/promise"

import * as dotenv from "dotenv"
dotenv.config()

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_ADMIN,
  database: process.env.DRIZZLE_DB_NAME,
  port: Number(process.env.DB_PORT),
})

export const dbMigrationOnly = drizzle(connection)

const poolConnection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_ADMIN,
  database: process.env.DRIZZLE_DB_NAME,
  port: Number(process.env.DB_PORT),
})

export const db = drizzle(poolConnection)