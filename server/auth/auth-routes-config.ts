import express from 'express'
import { body } from 'express-validator'

import { CoreRoutesConfig } from '@/core/core-routes-config'
import BodyValidationMiddleware from '@/core/middlewares/body-validation-middleware'
import authController from '@/auth/controllers/auth-controller'
import jwtMiddleware from '@/auth/middleware/jwt-middleware'
import authMiddleware from '@/auth/middleware/auth-middleware'

export class AuthRoutes extends CoreRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'AuthRoutes')
  }

  configureRoutes(): express.Application {
    this.app.post(`/auth`, [
      body('email').isEmail(),
      body('password').isString(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      authMiddleware.verifyUserPassword,
      authController.createJWT,
    ])
    this.app.post(`/auth/refresh-token`, [
      jwtMiddleware.validJWTNeeded,
      jwtMiddleware.verifyRefreshBodyField,
      jwtMiddleware.validRefreshNeeded,
      authController.createJWT,
    ])
    return this.app
  }
}
