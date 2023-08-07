import express from 'express'
import UsersService from '@/users/services/users-service'
import { error } from 'console'

class UsersMiddleware {
    async validateSameEmailDoesntExist(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const user = await UsersService.getByEmail(req.body.email)
        if (user) {
            res.status(400).send({ errors: ['User email already exists'] })
        } else {
            next()
        }
    }

    async validateSameEmailBelongToSameUser(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        if (res.locals.user._id === req.params.userId) {
            next()
        } else {
            res.status(400).send({ errors: ['Invalid email'] })
        }
    }

    async userCantChangePermission(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        if (
            'permissionFlags' in req.body &&
            req.body.permissionFlags !== res.locals.user.permissionFlags
        ) {
            res.status(400).send({
                errors: ['User cannot change permission flags'],
            })
        } else {
            next()
        }
    }

    validatePatchEmail = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        if (req.body.email) {
            this.validateSameEmailBelongToSameUser(req, res, next)
        } else {
            next()
        }
    };

    async validateUserExists(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const user = await UsersService.getById(+req.params.userId).catch(error => {
            console.log(error)
            res.status(400).json({
                error: {
                    message: `User ${req.params.userId} not found`
                },
            })
        })

        if (user) {
            res.locals.user = user
            next()
        } else {
            res.status(404).json({
                error: {
                    message: `User ${req.params.userId} not found`
                },
            })
        }
    }

    async extractUserId(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        req.body.id = req.params.userId
        next()
    }
}

export default new UsersMiddleware()
