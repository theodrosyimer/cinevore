import { config } from 'dotenv'
const dotenvResult = config()
if (dotenvResult.error) {
  throw dotenvResult.error
}

import express, { type Application, Request, Response } from 'express'
import { createServer } from 'http'
import bodyparser from 'body-parser'
import cors from 'cors'
import type { AddressInfo } from 'net'

import { authenticateJWTMiddleware } from './middlewares/auth.js'
import { get404 } from './controllers/error.js'
import { homeRouter } from './routes/home.js'
import { adminRouter } from './routes/admin.js'
import { tokenRouter } from './routes/token.js'
import { signUpRouter } from './routes/signup.js'
import { loginRouter } from './routes/login.js'
import { filmRouter } from './routes/film.js'
import { userRouter } from './routes/user.js'

const app: Application = express()
app.use(cors())
// app.use(
//   cors({
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true // not sure if i need it for jwt
//   })
// )

app.use(bodyparser.urlencoded({ extended: false }))
app.use(express.json())

app.use('/admin', authenticateJWTMiddleware, adminRouter)

app.use(signUpRouter)
app.use(loginRouter)
app.use(filmRouter)
app.use(userRouter)

app.use('/token', tokenRouter)
app.use('/', authenticateJWTMiddleware, homeRouter)
app.use(get404)

const httpServer = createServer(app)

httpServer.listen(process.env.SERVER_PORT, () => {
  const { port } = httpServer.address() as AddressInfo

  console.log(`Server running on http://localhost:${port}`)
})
