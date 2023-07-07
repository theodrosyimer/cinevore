/* eslint-disable object-curly-newline */
import { Router } from 'express'

import {
  getFilm,
  getFilms,
  getFilmsByUserId,
  postFilm,
  putFilm,
  deleteFilm,
} from '../controllers/film.js'
import {
  getReviewByFilmId,
  getReviewsByFilmId,
  getReviewsByUserId,
  postReview,
  putReview,
  deleteReview,
} from '../controllers/review.js'
import { authenticateJWTMiddleware } from '../middlewares/auth.js'
import {
  getLikesByReviewId,
  getLikesByFilmId,
  postLikeFilm,
  deleteLikeFilm,
  postLikeReview,
  deleteLikeReview,
} from '../controllers/like.js'

const router = Router()

export const filmRouter = router

/* *********************************************** */
/*                        POST                     */
/* *********************************************** */

router.get('/films', authenticateJWTMiddleware, getFilms)

router.get('/films/:userId', authenticateJWTMiddleware, getFilmsByUserId)

router.get('/film/:filmId', authenticateJWTMiddleware, getFilm)

router.post('/film', authenticateJWTMiddleware, postFilm)

router.put('/film/:filmId', authenticateJWTMiddleware, putFilm)

router.delete('/film/:filmId', authenticateJWTMiddleware, deleteFilm)

/* *********************************************** */
/*                       LIKE                      */
/* *********************************************** */

router.get('/film/:filmId/likes', authenticateJWTMiddleware, getLikesByFilmId)

router.get(
  '/film/:filmId/review/:reviewId/likes',
  authenticateJWTMiddleware,
  getLikesByReviewId
)

router.post('/film/:filmId/like', authenticateJWTMiddleware, postLikeFilm)

router.post(
  '/film/:filmId/review/:reviewId/like',
  authenticateJWTMiddleware,
  postLikeReview
)

// router.put('/film/:filmId/like/:likeId', authenticateJWTMiddleware, putLikeFilm)

// router.put(
//   '/film/:filmId/review/:reviewId/like/:likeId',
//   authenticateJWTMiddleware,
//   putLikeReview
// )

router.delete(
  '/film/:filmId/like/:likeId',
  authenticateJWTMiddleware,
  deleteLikeFilm
)

router.delete(
  '/film/:filmId/review/:reviewId/like/:likeId',
  authenticateJWTMiddleware,
  deleteLikeReview
)

/* *********************************************** */
/*                      COMMENT                    */
/* *********************************************** */

router.get(
  '/film/:filmId/reviews',
  authenticateJWTMiddleware,
  getReviewsByFilmId
)

router.get(
  '/film/:filmId/reviews/:userId',
  authenticateJWTMiddleware,
  getReviewsByUserId
)

router.get(
  '/film/:filmId/review/:reviewId',
  authenticateJWTMiddleware,
  getReviewByFilmId
)

router.post('/film/:filmId/review', authenticateJWTMiddleware, postReview)

router.put(
  '/film/:filmId/review/:reviewId',
  authenticateJWTMiddleware,
  putReview
)

router.delete(
  '/film/:filmId/review/:reviewId',
  authenticateJWTMiddleware,
  deleteReview
)
