/* eslint-disable prettier/prettier */
/* eslint-disable no-nested-ternary */
import jwt from 'jsonwebtoken'

import { hasNullValue } from '../lib/misc.js'

// TODO: handle param as an input to set expiration time
export function generateToken(req, res, next) {
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
    process.env.JWT_SECRET,
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

export function verifyToken(req, res, next) {
  const { token } = req.body

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(400).json({ error: 'No valid token was provided!' })
    }

    res.status(200).json(user)
  })
}
