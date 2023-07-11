/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
import { Router } from 'express'


import {
  getUsers,
  getUser,
  putUser,
  deleteUser,
  // postUser,
} from '../controllers/user.js'
// import { getFilmByUserId } from '../controllers/film.js'
import { authenticateJWTMiddleware } from '../middlewares/auth.js'
import { getFilmsByUserId } from '../controllers/film.js'

const router = Router()

export const userRouter = router

router.get('/users', authenticateJWTMiddleware, getUsers)

// router.post('/users', authenticateJWTMiddleware, postUser)

router.get('/users/:id', authenticateJWTMiddleware, getUser)

router.put('/users/:id', authenticateJWTMiddleware, putUser)

router.delete('/users/:id', authenticateJWTMiddleware, deleteUser)

// Film services
router.get('/users/:userId/films/', authenticateJWTMiddleware, getFilmsByUserId)
