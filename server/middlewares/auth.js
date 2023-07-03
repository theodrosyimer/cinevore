/* eslint-disable no-unused-vars */
import jwt from 'jsonwebtoken'
import { config } from 'dotenv-vault-core'

import { hasNullValue } from '../lib/misc.js'

config()
const JWT_DURATION = 15 * 60

export function authenticateJWTMiddleware(req, res, next) {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const token = authHeader.split(' ')[1]

    // console.log(jwt.decode(token))

    console.log(req.url)
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
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
    res.redirect(302, 'http://localhost:5173/pages/form/form.html')
  }
}

// TODO: handle param as an input to set expiration time
export function generateTokenMiddleware(req, res, next) {
  const hasNoDataInput = !Object.values(req.body).length

  if (hasNoDataInput) {
    return res.status(400).json({ error: 'No data was given!' })
  }

  const { id, lastname, firstname, email, role } = req.body

  if (hasNullValue([lastname, firstname, email, role])) {
    return res.status(400).json({ error: 'Some input is missing' })
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
    process.env.JWT_SECRET,
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
