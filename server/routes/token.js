import { Router } from 'express'

import { generateToken, verifyToken } from '../controllers/token.js'

const router = Router()

router.post('/short', generateToken)
router.post('/long', generateToken)
router.post('/verify', verifyToken)

export const tokenRouter = router
