/* eslint-disable prettier/prettier */
/* eslint-disable no-nested-ternary */

// import { config } from 'dotenv'
// config()
import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { hasNullValue } from '@/lib/utils.js'

const jwtSecret = process.env.JWT_SECRET ?? 'mysecret'

// TODO: handle param as an input to set expiration time
export function generateToken(req: Request, res: Response, next: NextFunction) {
  const hasNoDataInput = !Object.values(req.body).length

  if (hasNoDataInput) {
    return res.status(400).json({ error: 'No data was given!' })
  }

  const tokenType = req.params.type

  const { userId = null, lastname, firstname, email, role } = req.body

  if (hasNullValue([lastname, firstname, email, role])) {
    return res.status(400).json({ error: 'Some input is missing' })
  }

  // Generate an access token
  jwt.sign(
    {
      userId,
      lastname,
      firstname,
      email,
      role,
    },
    jwtSecret,
    tokenType === 'short'
      ? { expiresIn: '5min' }
      : tokenType === 'long'
        ? {}
        : {},
    (err, token) => {
      if (err) {
        console.log(err)
      }

      return res.status(200).json({ token })
    }
  )
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const { token } = req.body

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(400).json({ error: 'No valid token was provided!' })
    }

    res.status(200).json(user)
  })
}
