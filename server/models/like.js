/* eslint-disable no-unused-vars */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import db from '../lib/database.js'

export class Like {
  static addToFilm = ({ filmId, userId }) =>
    db.execute(
      'INSERT INTO like_film (like_film_id, user_id, film_id) VALUES (?, ?, ?)',
      [null, userId, filmId]
    )

  static addToReview = ({ reviewId, userId }) =>
    db.execute(
      'INSERT INTO like_review (like_review_id, user_id, review_id) VALUES (?, ?, ?)',
      [null, userId, reviewId]
    )

  // static fetchAll = () => db.execute('SELECT * FROM like')

  static fetchAllByFilmId = filmId =>
    db.execute('SELECT * FROM like_film WHERE film_id = ?', [filmId])

  static fetchAllByReviewId = reviewId =>
    db.execute('SELECT * FROM like_review WHERE review_id = ?', [reviewId])

  static findLikeFilmByUserId = userId =>
    db.execute('SELECT * FROM like_film WHERE user_id = ?', [userId])

  static findLikeReviewByUserId = userId =>
    db.execute('SELECT * FROM like_review WHERE user_id = ?', [userId])

  static findByFilmId = filmId =>
    db.execute('SELECT * FROM like_film WHERE film_id = ?', [filmId])

  static findByReviewId = reviewId =>
    db.execute('SELECT * FROM like_review WHERE review_id = ?', [reviewId])

  static removeFromFilm = (likeId, filmId) =>
    db.execute('DELETE FROM like_film WHERE like_film_id = ? AND film_id = ?', [
      likeId,
      filmId,
    ])

  static removeFromReview = (likeId, reviewId) =>
    db.execute(
      'DELETE FROM like_review WHERE like_review_id = ? AND review_id = ?',
      [likeId, reviewId]
    )

  static removeFromAllFilm = filmId =>
    db.execute('DELETE FROM like_film WHERE film_id = ?', [filmId])

  static removeFromAllReview = reviewId =>
    db.execute('DELETE FROM like_review WHERE review_id = ?', [reviewId])
}
