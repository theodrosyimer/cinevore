/* eslint-disable object-curly-newline */
import { Router } from 'express'

import {
  deleteFilm,
  getFilm,
  getFilms,
  getFilmsByUserId,
  getFilmByUserId,
  postFilm,
  putFilm,
} from '../controllers/film.js'
import {
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/user.js'
import { generateToken } from '../controllers/token.js'
import { login } from '../controllers/login.js'

const router = Router()

export const adminRouter = router

router.get('/login', (req, res) => {
  console.log('ADMIN LOGIN')
  res.redirect('http://localhost:5173/pages/form/form.html')
})

router.post('/login', login)

/* ******************************** */
/*             EMPLOYEE             */
/* ******************************** */

router.get('/users', getUsers)

router.get('/user/:id', getUser)

router.post('/user', postUser)

router.put('/user/:id', putUser)

router.delete('/user/:id', deleteUser)

/* ******************************** */
/*              POST                */
/* ******************************** */

router.get('/films', getFilms)

router.get('/film/:id', getFilm)

router.post('/film', postFilm)

router.put('/film/:id', putFilm)

router.delete('/film/:id', deleteFilm)

/* ******************************** */
/*              TOKEN               */
/* ******************************** */

router.post('/token/:type', generateToken)

/* ******************************** */
/*             DATABASE             */
/* ******************************** */
