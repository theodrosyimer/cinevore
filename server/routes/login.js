import { Router } from 'express'

import { auth } from '../controllers/login.js'
import { authenticateJWTMiddleware } from '../middlewares/auth.js'

const router = Router()

// TODO: add redirect to login page when user is not authentificated
router.post('/login' /* , authenticateJWTMiddleware */, auth.postLogin)

router.post('/logout' /* , authenticateJWTMiddleware */, auth.logOut)

export const loginRouter = router
