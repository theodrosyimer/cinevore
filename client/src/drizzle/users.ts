// import debug from 'debug'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { user } from '@/drizzle/schema'
import { NewUser, SelectUser } from '@/types/db'
// import { PermissionFlag } from '@/core/middlewares/permissionflag-enum'
import { SelectedFields } from 'drizzle-orm/mysql-core'

// const log: debug.IDebugger = debug('app:users-model')

class UsersModel {

  constructor() {
    // log('Created new instance of UsersModel')
  }

  create = async (newUser: NewUser) => {
    return db.insert(user).values({ ...newUser })
  }

  getAll = async () => db.select().from(user)

  getById = async (id: string) => db.select().from(user).where(eq(user.id, id))

  getByEmail = async (email: string) => db.select().from(user).where(eq(user.email, email))

  getByName = async (name: string) => db.select().from(user).where(eq(user.name, name))

  getByEmailWithPassword = async (email: string) => db.select({ id: user.id, email: user.email, password: user.password }).from(user).where(eq(user.email, email))

  deleteById = async (id: string) =>
    db.delete(user).where(eq(user.id, id))

  updateById = async (id: string, data: NewUser | SelectUser) => db.update(user)
    .set(data)
    .where(eq(user.id, id))
}

export default new UsersModel()
