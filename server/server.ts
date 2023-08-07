import 'dotenv/config'

import express, { type Application, Request, Response } from 'express'
import { createServer } from 'http'
import { join } from 'path'
import cors from 'cors'
import type { AddressInfo } from 'net'
import helmet from "helmet"
import debug from 'debug'

import { authenticateJWTMiddleware } from '@/middlewares/auth.js'
import { get404 } from '@/controllers/error.js'
import { adminRouter } from '@/routes/admin.js'
import { tokenRouter } from '@/routes/token.js'
import { signUpRouter } from '@/routes/signup.js'
import { loginRouter } from '@/routes/login.js'
import { filmRouter } from '@/routes/film.js'
import { userRouter } from '@/routes/user.js'
import { getDirname } from '@/lib/utils.js'
import { uploadRouter } from '@/routes/upload.js'
import { CoreRoutesConfig } from '@/core/core-routes-config.js'
import { UsersRoutes } from '@/users/users-routes-config'
import { AuthRoutes } from '@/auth/auth-routes-config'

export const ROOT_DIRECTORY = getDirname(import.meta.url)
export const STATIC_DIRECTORY = join(ROOT_DIRECTORY, 'static/')
export const UPLOADS_DIRECTORY = join(STATIC_DIRECTORY, 'uploads/')

const routes: Array<CoreRoutesConfig> = []
const debugLog: debug.IDebugger = debug('app')

const app: Application = express()

app.use(express.json())
app.use(express.static(join(ROOT_DIRECTORY, 'static')))
app.use(cors())
app.use(helmet())

// routes.push(new UsersRoutes(app))
routes.push(new AuthRoutes(app))


app.use('/admin', authenticateJWTMiddleware, adminRouter)

app.use(uploadRouter)
app.use(signUpRouter)
app.use(loginRouter)
app.use(filmRouter)
app.use(userRouter)

app.use('/token', tokenRouter)
app.use(get404)

const httpServer = createServer(app)

httpServer.listen(process.env.SERVER_PORT, () => {
  const { port } = httpServer.address() as AddressInfo

  routes.forEach((route: CoreRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`)
  })
  console.log(`Server running on http://localhost:${port}`)
})
