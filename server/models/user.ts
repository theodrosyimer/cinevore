/* eslint-disable no-unused-vars */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import db from '../lib/database.js'

export type UserType = {
  lastname: string
  firstname: string
  username: string
  email: string
  password: string
  role: 0 | 1
}

type UserTypeOptional = Partial<UserType>

export class User {
  static create = ({
    lastname,
    firstname,
    username,
    email,
    password,
    role = 0,
  }: UserType) =>
    db.execute(
      'INSERT INTO user (user_id, lastname, firstname, username, email, password, role_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [null, lastname, firstname, username, email, password, role]
    )

  static fetchAll = () => db.execute('SELECT * FROM user')

  static findById = (id: number) =>
    db.execute(
      'SELECT user_id, role_id, lastname, firstname, email, bio, avatar, date_created, last_updated FROM user WHERE user.user_id = ?',
      [id]
    )

  static findByEmail = (email: string) =>
    db.execute('SELECT * FROM user WHERE user.email = ?', [email])

  static deleteById = (id: number) =>
    db.execute('DELETE FROM user WHERE user.user_id = ?', [id])

  static updateById = (id: number, data: UserTypeOptional) => {
    let attributesToUpdateString = ''

    for (const attribute in data) {
      attributesToUpdateString += `${attribute}='${data[attribute]}' `
    }

    return db.execute(
      `UPDATE user SET ${attributesToUpdateString} WHERE user.user_id = ${id}`
    )
  }
}
