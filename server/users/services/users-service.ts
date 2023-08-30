import UsersModel from '@/users/models/users-drizzle'
import { CRUD } from '@/core/interfaces/crud'
import { NewUser, PatchUser, PutUser } from '@/users/types/user'
import { MySqlRawQueryResult } from 'drizzle-orm/mysql2'

class UsersService implements CRUD {
  async create(resource: NewUser) {
    return UsersModel.create(resource)
  }

  async deleteById(id: number) {
    return UsersModel.deleteById(id)
  }

  async list(limit: number, page: number) {
    // return UsersModel.getAll(limit, page)
    return UsersModel.getAll()
  }

  async patchById(id: number, resource: PatchUser) {
    return UsersModel.updateById(id, resource)
  }

  async putById(id: number, resource: PutUser) {
    return UsersModel.updateById(id, resource)
  }

  async getById(id: number) {
    return UsersModel.getById(id)
  }

  async getByEmail(email: string) {
    return UsersModel.getByEmail(email)
  }

  async getByEmailWithPassword(email: string) {
    return UsersModel.getByEmailWithPassword(email)
  }
}

export default new UsersService()
