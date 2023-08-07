/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
import type { Request, Response } from 'express'

import { User } from '../models/user.js'
import { hashPassword, validateUserPassword } from '../lib/bcrypt.js'
import { hasNullValue } from '../lib/utils.js'
import { generateToken } from '../lib/token.js'

export const auth = {
  postLogin: login,
  getLoggedUser,
  logOut,
}

export async function login(req: Request, res: Response) {
  const hasNoDataInput = !Object.values(req.body).length

  if (hasNoDataInput) {
    return res.status(400).json({ error: 'No input was given!' })
  }

  const { email, password } = req.body

  if (hasNullValue([email, password])) {
    return res.status(400).json({ error: 'Some input is missing' })
  }

  const [results, tableInfos] = await User.getByEmail(email).catch(
    (err) => {
      console.log(err)
    }
  )

  if (!results.length) {
    return res.status(404).json({ error: 'User was not found!' })
  }

  const user = results[0]

  console.log(user)

  const hashedPassword = await hashPassword(password).catch((err) => {
    console.log(err)
  })

  const isValidUser = await validateUserPassword(password, hashedPassword ? hashedPassword : '').catch(
    (err) => {
      console.log(err)
    }
  )

  // don't leak password to the client!
  user.password = null

  const token = generateToken(user)

  // if (user.role_id === 1) {
  //   return res.redirect(200, 'http://localhost:5173/pages/admin/index.html')
  // }

  return isValidUser
    ? res.status(200).json({
      ...user,
      token,
    })
    : res.status(400).json({ error: 'User does not exists' })
}

export function getLoggedUser(req: Request, res: Response) {
  const hasNoUserData = !Object.values(req.user).length

  if (hasNoUserData) {
    return res.status(400).json({ error: 'No data was given!' })
  }

  res.status(200).json(req.user)
}

export function logOut(req: Request, res: Response) {
  const hasNoDataInput = !Object.values(req.body).length

  if (hasNoDataInput) {
    return res.status(400).json({ error: 'No data was given!' })
  }

  const { token } = req.body
  refreshTokens = refreshTokens.filter((t) => t !== token)

  res.send('Logout successful')
}