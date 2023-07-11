import db from '@/core/services/database.js'
import debug from 'debug'
import { CreateUser } from '@/users/types/create-user'
import { PatchUser } from '@/users/types/patch-user'
import { PutUser } from '@/users/types/put-user'
import { PermissionFlag } from '@/core/middlewares/permissionflag-enum'

const log: debug.IDebugger = debug('app:users-model')

class UsersModel {

  constructor() {
    log('Created new instance of UsersModel')
  }

  create = ({
    lastname,
    firstname,
    username,
    email,
    password,
    role = 0,
  }: CreateUser) =>
    db.execute(
      'INSERT INTO user (user_id, lastname, firstname, username, email, password, role_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [null, lastname, firstname, username, email, password, role]
    )

  getAll = () => db.execute('SELECT * FROM user')

  getById = (id: string) =>
    db.execute(
      'SELECT user_id, role_id, lastname, firstname, email, bio, avatar_filename, date_created, last_updated FROM user WHERE user.user_id = ?',
      [id]
    )

  getByEmail = (email: string) =>
    db.execute('SELECT * FROM user WHERE user.email = ?', [email])

  getByEmailWithPassword = (email: string) =>
    db.execute('SELECT user_id, role_id, email, password FROM user WHERE user.email = ?', [email])

  deleteById = (id: string) =>
    db.execute('DELETE FROM user WHERE user.user_id = ?', [id])

  updateById = (id: string, data: PatchUser | PutUser) => {
    let attributesToUpdateString = ''

    for (const attribute in data) {
      attributesToUpdateString += `${attribute}='${data[attribute as (keyof PatchUser | keyof PutUser)]}'`
    }

    return db.execute(
      `UPDATE user SET ${attributesToUpdateString} WHERE user.user_id = ${id}`
    )
  }
}

export default new UsersModel()
