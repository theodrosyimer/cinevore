import { Router } from 'express'

import { signUp } from '../controllers/signup.js'

const router = Router()

router.post('/signup', signUp)

export const signUpRouter = router
