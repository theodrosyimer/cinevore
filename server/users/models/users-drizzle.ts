import debug from 'debug'
import { eq } from 'drizzle-orm'
import { db } from '@/core/services/drizzle'
import { user } from './schema.js'
import { NewUser, PatchUser, PutUser } from '@/users/types/user'
import { PermissionFlag } from '@/core/middlewares/permissionflag-enum'

const log: debug.IDebugger = debug('app:users-model')

class UsersModel {

  constructor() {
    log('Created new instance of UsersModel')
  }

  create = async (newUser: NewUser) => {
    return db.insert(user).values({ ...newUser, roleId: 0 })
  }

  getAll = async () => db.select().from(user)

  getById = async (id: number) => db.select().from(user).where(eq(user.userId, id))

  getByEmail = async (email: string) => db.select().from(user).where(eq(user.email, email))

  getByEmailWithPassword = async (email: string) => db.select({ userId: user.userId, roleId: user.roleId, email: user.email, password: user.password }).from(user).where(eq(user.email, email))

  deleteById = async (id: number) =>
    db.delete(user).where(eq(user.userId, id))

  updateById = async (id: number, data: PatchUser | PutUser) => db.update(user)
    .set(data)
    .where(eq(user.userId, id))
}

export default new UsersModel()