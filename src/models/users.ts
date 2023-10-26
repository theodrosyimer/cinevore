import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { user } from '@/db/planetscale'
import { NewUser, SelectUser } from '@/types/db'

class UsersModel {
  constructor() {}

  create = async (newUser: NewUser) => {
    return db.insert(user).values(newUser)
  }

  getAll = async () => db.select().from(user)

  getAllByPage = async (page: number, limit = 3) =>
    db
      .select()
      .from(user)
      .limit(limit)
      .offset((page - 1) * limit)

  // getById = async (id: string) => db.select().from(user).where(eq(user.id, id))

  getById = async (id: string) =>
    db.query.user.findFirst({
      where: (user, { eq }) => eq(user.id, id),
      columns: {
        password: false,
      },
    })

  getByEmail = async (email: string) =>
    db.select().from(user).where(eq(user.email, email))

  getByName = async (name: string) =>
    db.select().from(user).where(eq(user.name, name))

  getByEmailWithPassword = async (email: string) =>
    db
      .select({ id: user.id, email: user.email, password: user.password })
      .from(user)
      .where(eq(user.email, email))

  deleteById = async (id: string) => db.delete(user).where(eq(user.id, id))

  updateById = async (id: string, data: NewUser | SelectUser) =>
    db.update(user).set(data).where(eq(user.id, id))
}

const usersModel = new UsersModel()
export default usersModel
