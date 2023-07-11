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
/*                        POST                     */
/* *********************************************** */

router.get('/films', authenticateJWTMiddleware, getFilms)


router.get('/films/:filmId', authenticateJWTMiddleware, getFilm)

router.post('/films', authenticateJWTMiddleware, postFilm)

router.put('/films/:filmId', authenticateJWTMiddleware, putFilm)

router.delete('/films/:filmId', authenticateJWTMiddleware, deleteFilm)

/* *********************************************** */
/*                       LIKE                      */
/* *********************************************** */

router.get('/films/:filmId/likes', authenticateJWTMiddleware, getLikesByFilmId)

router.get(
  '/films/:filmId/review/:reviewId/likes',
  authenticateJWTMiddleware,
  getLikesByReviewId
)

router.post('/films/:filmId/like', authenticateJWTMiddleware, postLikeFilm)

router.post(
  '/films/:filmId/review/:reviewId/like',
  authenticateJWTMiddleware,
  postLikeReview
)

// router.put('/films/:filmId/like/:likeId', authenticateJWTMiddleware, putLikeFilm)

// router.put(
//   '/films/:filmId/review/:reviewId/like/:likeId',
//   authenticateJWTMiddleware,
//   putLikeReview
// )

router.delete(
  '/films/:filmId/like/:likeId',
  authenticateJWTMiddleware,
  deleteLikeFilm
)

router.delete(
  '/films/:filmId/review/:reviewId/like/:likeId',
  authenticateJWTMiddleware,
  deleteLikeReview
)

/* *********************************************** */
/*                      COMMENT                    */
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
  '/films/:filmId/review/:reviewId',
  authenticateJWTMiddleware,
  getReviewByFilmId
)

router.post('/films/:filmId/review', authenticateJWTMiddleware, postReview)

router.put(
  '/films/:filmId/review/:reviewId',
  authenticateJWTMiddleware,
  putReview
)

router.delete(
  '/films/:filmId/review/:reviewId',
  authenticateJWTMiddleware,
  deleteReview
)
