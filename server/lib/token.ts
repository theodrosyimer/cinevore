// import { config } from 'dotenv'
// config()
import jwt from 'jsonwebtoken'

import { hasNullValue } from './utils'
import { Jwt } from '@/core/types/jwt'
import { UserType } from '../users/types/user'

const jwtSecret = process.env.JWT_SECRET ?? 'mysecret'

export function generateToken(user: UserType, expiresIn: (string | number) = 15 * 60) {
  const hasNoUserData = !Object.values(user).length

  if (hasNoUserData) {
    return {
      error: {
        message: 'No data was given!',
        statusCode: 400,
      },
    }
  }

  const { user_id: userId, email, role_id: role, permissionFlag } = user

  if (hasNullValue([email, role])) {
    return {
      error: {
        message: 'Some input is missing',
        statusCode: 400,
      },
    }
  }

  // TODO: add refresh key
  return jwt.sign(
    {
      userId,
      role,
      permissionFlag,
      // refreshKey: jwtSecret,
    } as Jwt,
    jwtSecret,
    { expiresIn }
  )
}
