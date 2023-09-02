// eslint-disable-next-line import/no-extraneous-dependencies

import { createPool } from 'mysql2'

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_ADMIN,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
})

export default pool.promise()
