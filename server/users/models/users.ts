import dbMysql from '@/core/services/database.js'
import { db } from '@/core/services/drizzle.js'
import debug from 'debug'
import { PermissionFlag } from '@/core/middlewares/permissionflag-enum'
import { InferModel } from 'drizzle-orm'
import { user } from './schema.js'
import { PatchUser, PutUser } from '../types/user'

const log: debug.IDebugger = debug('app:users-model')

type User = InferModel<typeof user, "insert">
type NewUser = Omit<User, 'roleId'>

class UsersModel {

  constructor() {
    log('Created new instance of UsersModel')
  }

  // create = ({
  //   lastname,
  //   firstname,
  //   username,
  //   email,
  //   password,
  //   role = 0,
  // }: CreateUser) =>
  //   db.execute(
  //     'INSERT INTO user (user_id, lastname, firstname, username, email, password, role_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
  //     [null, lastname, firstname, username, email, password, role]
  //   )

  create = async (newUser: NewUser) => {
    return db.insert(user).values({ ...newUser, roleId: 0 })
  }

  getAll = () => dbMysql.execute('SELECT * FROM user')

  getById = (id: string) =>
    dbMysql.execute(
      'SELECT user_id, role_id, lastname, firstname, email, bio, avatar_filename, date_created, last_updated FROM user WHERE user.user_id = ?',
      [id]
    )

  getByEmail = (email: string) =>
    dbMysql.execute('SELECT * FROM user WHERE user.email = ?', [email])

  getByEmailWithPassword = (email: string) =>
    dbMysql.execute('SELECT user_id, role_id, email, password FROM user WHERE user.email = ?', [email])

  deleteById = (id: string) =>
    dbMysql.execute('DELETE FROM user WHERE user.user_id = ?', [id])

  updateById = (id: string, data: PatchUser | PutUser) => {
    let attributesToUpdateString = ''

    for (const attribute in data) {
      attributesToUpdateString += `${attribute}='${data[attribute as (keyof PatchUser | keyof PutUser)]}'`
    }

    return dbMysql.execute(
      `UPDATE user SET ${attributesToUpdateString} WHERE user.user_id = ${id}`
    )
  }
}

export default new UsersModel()
