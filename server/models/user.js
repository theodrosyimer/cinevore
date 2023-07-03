/* eslint-disable no-unused-vars */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import db from '../lib/database.js'

export class User {
  static create = ({
    lastname,
    firstname,
    username,
    email,
    password,
    role = 0,
  }) =>
    db.execute(
      'INSERT INTO user (user_id, lastname, firstname, username, email, password, role_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [null, lastname, firstname, username, email, password, role]
    )

  static fetchAll = () => db.execute('SELECT * FROM user')

  static findById = id =>
    db.execute(
      'SELECT user_id, role_id, lastname, firstname, email, bio, avatar, date_created, last_updated FROM user WHERE user.user_id = ?',
      [id]
    )

  static findByEmail = email =>
    db.execute('SELECT * FROM user WHERE user.email = ?', [email])

  static deleteById = id =>
    db.execute('DELETE FROM user WHERE user.user_id = ?', [id])

  static updateById = (id, data) => {
    let attributesToUpdateString = ''

    for (const attribute in data) {
      attributesToUpdateString += `${attribute}='${data[attribute]}' `
    }

    return db.execute(
      `UPDATE user SET ${attributesToUpdateString} WHERE user.user_id = ${id}`
    )
  }
}
