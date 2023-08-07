import { CoreRoutesConfig } from '@/core/core-routes-config'
import UsersController from '@/users/controllers/users-controller'
import UsersMiddleware from '@/users/middlewares/users-middleware'
import jwtMiddleware from '@/auth/middleware/jwt-middleware'
import permissionMiddleware from '@/core/middlewares/permission-middleware'
import { PermissionFlag } from '@/core/middlewares/permissionflag-enum'
import BodyValidationMiddleware from '@/core/middlewares/body-validation-middleware'
import { body } from 'express-validator'

import express from 'express'

export class UsersRoutes extends CoreRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'UsersRoutes')
  }

  configureRoutes(): express.Application {
    this.app
      .route(`/users`)
      .get(
        jwtMiddleware.validJWTNeeded,
        permissionMiddleware.permissionFlagRequired(
          PermissionFlag.ADMIN_PERMISSION
        ),
        UsersController.list
      )
      .post(
        body('email').isEmail(),
        body('password')
          .isLength({ min: 5 })
          .withMessage('Must include password (5+ characters)'),
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        UsersMiddleware.validateSameEmailDoesntExist,
        UsersController.create
      )

    this.app.param(`userId`, UsersMiddleware.extractUserId)
    this.app
      .route(`/users/:userId`)
      .all(
        UsersMiddleware.validateUserExists,
        jwtMiddleware.validJWTNeeded,
        permissionMiddleware.onlySameUserOrAdminCanDoThisAction
      )
      .get(UsersController.getById)
      .delete(UsersController.remove)

    this.app.put(`/users/:userId`, [
      body('email').isEmail(),
      body('password')
        .isLength({ min: 5 })
        .withMessage('Must include password (5+ characters)'),
      body('firstName').isString(),
      body('lastName').isString(),
      body('permissionFlags').isInt(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      UsersMiddleware.validateSameEmailBelongToSameUser,
      UsersMiddleware.userCantChangePermission,
      permissionMiddleware.permissionFlagRequired(
        PermissionFlag.PAID_PERMISSION
      ),
      UsersController.put,
    ])

    this.app.patch(`/users/:userId`, [
      body('email').isEmail().optional(),
      body('password')
        .isLength({ min: 5 })
        .withMessage('Password must be 5+ characters')
        .optional(),
      body('firstName').isString().optional(),
      body('lastName').isString().optional(),
      body('permissionFlags').isInt().optional(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      UsersMiddleware.validatePatchEmail,
      UsersMiddleware.userCantChangePermission,
      permissionMiddleware.permissionFlagRequired(
        PermissionFlag.PAID_PERMISSION
      ),
      UsersController.patch,
    ])

    /**
     * This route does not currently require extra permissions.
     * I need to update it for admin usage!
     */
    this.app.put(`/users/:userId/permissionFlags/:permissionFlags`, [
      jwtMiddleware.validJWTNeeded,
      permissionMiddleware.onlySameUserOrAdminCanDoThisAction,
      permissionMiddleware.permissionFlagRequired(
        PermissionFlag.FREE_PERMISSION
      ),
      UsersController.updatePermissionFlags,
    ])

    return this.app
  }
}
