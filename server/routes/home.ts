import { Router } from 'express'

import { authenticateJWTMiddleware } from '../middlewares/auth.js'
import { getHome } from '../controllers/home.js'

const router = Router()

router.get('/', getHome)

export const homeRouter = router
