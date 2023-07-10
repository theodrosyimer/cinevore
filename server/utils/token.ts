import jwt from 'jsonwebtoken'
// import { env } from '@env.mjs'
import { config } from 'dotenv'

import { hasNullValue } from './misc.js'
import { User } from '../types/index.js'

config()
const jwtSecret = process.env.JWT_SECRET ?? 'mysecret'

export function generateToken(user: User, expiresIn: (string | number) = 15 * 60) {
  const hasNoUserData = !Object.values(user).length

  if (hasNoUserData) {
    return {
      error: {
        message: 'No data was given!',
        statusCode: 400,
      },
    }
  }

  const { user_id: userId, lastname, firstname, email, role_id: role } = user

  if (hasNullValue([lastname, firstname, email, role])) {
    return {
      error: {
        message: 'Some input is missing',
        statusCode: 400,
      },
    }
  }

  // Generate an access token
  return jwt.sign(
    {
      userId,
      lastname,
      firstname,
      email,
      role,
    },
    jwtSecret,
    { expiresIn }
  )
}
