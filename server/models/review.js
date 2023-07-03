/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import db from '../lib/database.js'

export class Review {
  static addToFilm = ({ filmId, userId, content }) =>
    db.execute(
      'INSERT INTO review (review_id, film_id, user_id, content) VALUES (?, ?, ?, ?)',
      [null, filmId, userId, content]
    )

  static fetchAll = () => db.execute('SELECT * FROM review')

  static fetchAllByFilmId = filmId =>
    db.execute('SELECT * FROM review WHERE review.film_id = ?', [filmId])

  static fetchAllByUserId = userID =>
    db.execute('SELECT * FROM review WHERE user_id = ?', [userID])

  static findOneByFilmId = (reviewId, filmId) =>
    db.execute(
      'SELECT * FROM review WHERE review.review_id = ? AND film_id = ?',
      [reviewId, filmId]
    )

  static findOneById = reviewId =>
    db.execute('SELECT * FROM review WHERE review.review_id = ?', [reviewId])

  static updateById = (reviewId, content) =>
    db.execute(
      `UPDATE review SET content='${content}' WHERE review.review_id = ${reviewId}`
    )

  static deleteById = reviewId =>
    db.execute('DELETE FROM review WHERE review.review_id = ?', [reviewId])
}
