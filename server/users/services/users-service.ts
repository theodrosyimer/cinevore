import UsersModel from '@/users/models/users'
import { CRUD } from '@/core/interfaces/crud'
import { CreateUser } from '@/users/types/create-user'
import { PutUser } from '@/users/types/put-user'
import { PatchUser } from '@/users/types/patch-user'

class UsersService implements CRUD {
    async create(resource: CreateUser) {
        return UsersModel.create(resource)
    }

    async deleteById(id: string) {
        return UsersModel.deleteById(id)
    }

    async list(limit: number, page: number) {
        // return UsersModel.getAll(limit, page)
        return UsersModel.getAll()
    }

    async patchById(id: string, resource: PatchUser): Promise<any> {
        return UsersModel.updateById(id, resource)
    }

    async putById(id: string, resource: PutUser): Promise<any> {
        return UsersModel.updateById(id, resource)
    }

    async getById(id: string) {
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
