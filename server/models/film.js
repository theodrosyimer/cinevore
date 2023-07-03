/* eslint-disable no-unused-vars */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import db from '../lib/database.js'

export class Film {
  static create = ({ userId, content }) =>
    db.execute(
      'INSERT INTO film (film_id, user_id, content) VALUES (?, ?, ?)',
      [null, userId, content]
    )

  static fetchAll = () => db.execute('SELECT * FROM film')

  static fetchAllByUserId = userID =>
    db.execute('SELECT * FROM film WHERE user_id = ?', [userID])

  static findOneByUserId = (filmId, userID) =>
    db.execute('SELECT * FROM film WHERE user_id = ? AND film_id = ?', [
      userID,
      filmId,
    ])

  static findById = filmId =>
    db.execute('SELECT * FROM film WHERE film.film_id = ?', [filmId])

  static deleteById = filmId =>
    db.execute('DELETE FROM film WHERE film.film_id = ?', [filmId])

  static updateById = (filmId, content) =>
    db.execute(
      `UPDATE film SET content='${content}' WHERE film.film_id = ${filmId}`
    )
}
