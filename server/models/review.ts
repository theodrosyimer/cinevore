/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import db from '../utils/database.js'

export class Review {
  static addToFilm = ({ filmId, userId, content }: { filmId: Number, userId: Number, content: string }) =>
    db.execute(
      'INSERT INTO review (review_id, film_id, user_id, content) VALUES (?, ?, ?, ?)',
      [null, filmId, userId, content]
    )

  static fetchAll = () => db.execute('SELECT * FROM review')

  static fetchAllByFilmId = (filmId: number) =>
    db.execute('SELECT * FROM review WHERE review.film_id = ?', [filmId])

  static fetchAllByUserId = (userID: number) =>
    db.execute('SELECT * FROM review WHERE user_id = ?', [userID])

  static findOneByFilmId = (reviewId: number, filmId: number) =>
    db.execute(
      'SELECT * FROM review WHERE review.review_id = ? AND film_id = ?',
      [reviewId, filmId]
    )

  static findOneById = (reviewId: number) =>
    db.execute('SELECT * FROM review WHERE review.review_id = ?', [reviewId])

  static updateById = (reviewId: number, content: string) =>
    db.execute(
      `UPDATE review SET content='${content}' WHERE review.review_id = ${reviewId}`
    )

  static deleteById = (reviewId: number) =>
    db.execute('DELETE FROM review WHERE review.review_id = ?', [reviewId])
}
