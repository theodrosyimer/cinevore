import express from 'express'
import usersService from '../services/users-service'
import debug from 'debug'
import { PatchUser } from '../types/patch-user'
import { hashPassword } from '@/lib/hash'

const log: debug.IDebugger = debug('app:users-controller')

class UsersController {
    async list(req: express.Request, res: express.Response) {
        const users = await usersService.list(100, 0)
        res.status(200).send(users)
    }

    async getById(req: express.Request, res: express.Response) {
        const user = await usersService.getById(req.body.id)
        res.status(200).send(user)
    }

    async create(req: express.Request, res: express.Response) {
        req.body.password = await hashPassword(req.body.password)
        const userId = await usersService.create(req.body)
        res.status(201).send({ id: userId })
    }

    async patch(req: express.Request, res: express.Response) {
        if (req.body.password) {
            req.body.password = await hashPassword(req.body.password)
        }
        log(await usersService.patchById(req.body.id, req.body))
        res.status(204).send()
    }

    async put(req: express.Request, res: express.Response) {
        req.body.password = await hashPassword(req.body.password)
        log(await usersService.putById(req.body.id, req.body))
        res.status(204).send()
    }

    async remove(req: express.Request, res: express.Response) {
        log(await usersService.deleteById(req.body.id))
        res.status(204).send()
    }

    async updatePermissionFlags(req: express.Request, res: express.Response) {
        const patchUserDto: PatchUser = {
            permissionFlags: parseInt(req.params.permissionFlags),
        }
        log(await usersService.patchById(req.body.id, patchUserDto))
        res.status(204).send()
    }
}

export default new UsersController()
