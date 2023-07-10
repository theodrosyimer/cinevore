/* eslint-disable no-unused-vars */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import db from '../utils/database.js'

export class Like {
  static addToFilm = ({ filmId, userId }: { filmId: Number, userId: number }) =>
    db.execute(
      'INSERT INTO like_film (like_film_id, user_id, film_id) VALUES (?, ?, ?)',
      [null, userId, filmId]
    )

  static addToReview = ({ reviewId, userId }: { reviewId: number, userId: number }) =>
    db.execute(
      'INSERT INTO like_review (like_review_id, user_id, review_id) VALUES (?, ?, ?)',
      [null, userId, reviewId]
    )

  // static fetchAll = () => db.execute('SELECT * FROM like')

  static fetchAllByFilmId = (filmId: number) =>
    db.execute('SELECT * FROM like_film WHERE film_id = ?', [filmId])

  static fetchAllByReviewId = (reviewId: number) =>
    db.execute('SELECT * FROM like_review WHERE review_id = ?', [reviewId])

  static findLikeFilmByUserId = (userId: number) =>
    db.execute('SELECT * FROM like_film WHERE user_id = ?', [userId])

  static findLikeReviewByUserId = (userId: number) =>
    db.execute('SELECT * FROM like_review WHERE user_id = ?', [userId])

  static findByFilmId = (filmId: number) =>
    db.execute('SELECT * FROM like_film WHERE film_id = ?', [filmId])

  static findByReviewId = (reviewId: number) =>
    db.execute('SELECT * FROM like_review WHERE review_id = ?', [reviewId])

  static removeFromFilm = (likeId: number, filmId: number) =>
    db.execute('DELETE FROM like_film WHERE like_film_id = ? AND film_id = ?', [
      likeId,
      filmId,
    ])

  static removeFromReview = (likeId: number, reviewId: number) =>
    db.execute(
      'DELETE FROM like_review WHERE like_review_id = ? AND review_id = ?',
      [likeId, reviewId]
    )

  static removeFromAllFilm = (filmId: number) =>
    db.execute('DELETE FROM like_film WHERE film_id = ?', [filmId])

  static removeFromAllReview = (reviewId: number) =>
    db.execute('DELETE FROM like_review WHERE review_id = ?', [reviewId])
}
