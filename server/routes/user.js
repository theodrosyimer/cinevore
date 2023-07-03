/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
import { Router } from 'express'

import { getUsers, getUser, putUser, deleteUser } from '../controllers/user.js'
// import { getFilmByUserId } from '../controllers/film.js'
import { authenticateJWTMiddleware } from '../middlewares/auth.js'

const router = Router()

export const userRouter = router

router.get('/users', authenticateJWTMiddleware, getUsers)

router.get('/user/:id', authenticateJWTMiddleware, getUser)

router.put('/user/:id', authenticateJWTMiddleware, putUser)

router.delete('/user/:id', authenticateJWTMiddleware, deleteUser)
