/* eslint-disable object-curly-newline */
import { Router } from 'express'

import {
  getFilm,
  getFilms,
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
/*                        FILM                     */
/* *********************************************** */

router.get('/films', authenticateJWTMiddleware, getFilms)


router.get('/films/:filmId', authenticateJWTMiddleware, getFilm)

router.post('/films', authenticateJWTMiddleware, postFilm)

router.put('/films/:filmId', authenticateJWTMiddleware, putFilm)

router.delete('/films/:filmId', authenticateJWTMiddleware, deleteFilm)

/* *********************************************** */
/*              FILMS - LIKE & REVIEWS             */
/* *********************************************** */

router.get('/films/:filmId/likes', authenticateJWTMiddleware, getLikesByFilmId)

router.get(
  '/films/:filmId/reviews/:reviewId/likes',
  authenticateJWTMiddleware,
  getLikesByReviewId
)

router.post('/films/:filmId/like', authenticateJWTMiddleware, postLikeFilm)

router.post(
  '/films/:filmId/reviews/:reviewId/like',
  authenticateJWTMiddleware,
  postLikeReview
)

// router.put('/films/:filmId/like/:likeId', authenticateJWTMiddleware, putLikeFilm)

// router.put(
//   '/films/:filmId/reviews/:reviewId/like/:likeId',
//   authenticateJWTMiddleware,
//   putLikeReview
// )

router.delete(
  '/films/:filmId/likes/:likeId',
  authenticateJWTMiddleware,
  deleteLikeFilm
)

router.delete(
  '/films/:filmId/reviews/:reviewId/likes/:likeId',
  authenticateJWTMiddleware,
  deleteLikeReview
)

/* *********************************************** */
/*                      REVIEW                     */
/* *********************************************** */

router.get(
  '/films/:filmId/reviews',
  authenticateJWTMiddleware,
  getReviewsByFilmId
)

router.get(
  '/films/:filmId/reviews/:userId',
  authenticateJWTMiddleware,
  getReviewsByUserId
)

router.get(
  '/films/:filmId/reviews/:reviewId',
  authenticateJWTMiddleware,
  getReviewByFilmId
)

router.post('/films/:filmId/reviews', authenticateJWTMiddleware, postReview)

router.put(
  '/films/:filmId/reviews/:reviewId',
  authenticateJWTMiddleware,
  putReview
)

router.delete(
  '/films/:filmId/reviews/:reviewId',
  authenticateJWTMiddleware,
  deleteReview
)
