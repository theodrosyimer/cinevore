/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import db from '../lib/database.js'

export class Comment {
  static addToFilm = ({ filmId, userId, content }) =>
    db.execute(
      'INSERT INTO comment (comment_id, film_id, user_id, content) VALUES (?, ?, ?, ?)',
      [null, filmId, userId, content]
    )

  static fetchAll = () => db.execute('SELECT * FROM comment')

  static fetchAllByFilmId = filmId =>
    db.execute('SELECT * FROM comment WHERE comment.film_id = ?', [filmId])

  static fetchAllByUserId = userID =>
    db.execute('SELECT * FROM comment WHERE user_id = ?', [userID])

  static findOneByFilmId = (commentId, filmId) =>
    db.execute(
      'SELECT * FROM comment WHERE comment.comment_id = ? AND film_id = ?',
      [commentId, filmId]
    )

  static findOneById = commentId =>
    db.execute('SELECT * FROM comment WHERE comment.comment_id = ?', [
      commentId,
    ])

  static updateById = (commentId, content) =>
    db.execute(
      `UPDATE comment SET content='${content}' WHERE comment.comment_id = ${commentId}`
    )

  static deleteById = commentId =>
    db.execute('DELETE FROM comment WHERE comment.comment_id = ?', [commentId])
}
