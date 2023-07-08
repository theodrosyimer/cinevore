/* eslint-disable no-unused-vars */
import type { NextFunction, Request, Response } from 'express'

import jwt from 'jsonwebtoken'
// import { env } from '@/env.mjs'
import { config } from 'dotenv'

import { hasNullValue, sendErrorResponse } from '../lib/misc.js'

config()
const JWT_DURATION = 15 * 60
const jwtSecret = process.env.JWT_SECRET ?? 'mysecret'

export function authenticateJWTMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const token = authHeader.split(' ')[1]

    if (!token) return sendErrorResponse(400, 'No valid token was provided!')

    // console.log(jwt.decode(token))

    console.log(req.url)
    jwt.verify(token, jwtSecret, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Unauthorized User!' })
      }

      req.user = user
      next()
    })
  } else {
    // eslint-disable-next-line prettier/prettier
    // res.status(401)
    //   .json({ error: 'Unauthenticated User!' })
    res.redirect(302, `${env.CLIENT_URL}/login`)
  }
}

// TODO: handle param as an input to set expiration time
export function generateTokenMiddleware(req: Request, res: Response, next: NextFunction) {
  const hasNoDataInput = !Object.values(req.body).length

  if (hasNoDataInput) {
    return sendErrorResponse(400, 'No data was given!')
  }

  const { id, lastname, firstname, email, role } = req.body

  if (hasNullValue([lastname, firstname, email, role])) {
    return sendErrorResponse(400, 'Some input is missing')
  }

  // Generate an access token
  const token = jwt.sign(
    {
      id,
      lastname,
      firstname,
      email,
      role,
    },
    jwtSecret,
    { expiresIn: JWT_DURATION }
  )

  res.token = token
  next()
}

export function isNotAdmin({ user }) {
  if (!user) {
    return {
      error: {
        message: 'No User data was provided',
        statusCode: 400,
      },
    }
  }

  const { role } = user

  if (!role) {
    return {
      error: {
        message: 'No role was defined for User',
        statusCode: 400,
      },
    }
  }

  if (role !== 1) {
    return true
  }

  return false
}
