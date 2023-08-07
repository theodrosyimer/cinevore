import express from 'express'
import usersService from '@/users/services/users-service'
import { validateUserPassword } from '@/lib/bcrypt'

class AuthMiddleware {
  async verifyUserPassword(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const [user] = await usersService.getByEmailWithPassword(
      req.body.email
    )
    if (user) {
      const passwordHash = user.password

      if (await validateUserPassword(req.body.password, passwordHash)) {
        req.body = {
          userId: user.userId,
          email: user.email,
          roleId: user.roleId,
          // permissionFlags: user.permissionFlags,
        }
        return next()
      }
    }
    res.status(400).send({ errors: ['Invalid email and/or password'] })
  }
}

export default new AuthMiddleware()
