/* eslint-disable babel/camelcase */
/* eslint-disable no-shadow */
import type { Request, Response } from 'express'

import { User } from '../models/user.js'
import { hashPassword } from '../lib/hash.js'
import { hasNullValue } from '../lib/utils.js'
import { generateToken } from '../lib/token.js'

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g

export async function signUp(req: Request, res: Response) {
  const hasNoDataInput = !Object.values(req.body).length

  if (hasNoDataInput) {
    return res.status(400).json({ error: 'No input was provided!' })
  }
  if (hasNoDataInput) {
    return res.status(400).json({ error: 'No input was provided!' })
  }

  const { lastname, firstname, username, email, password, role = 0 } = req.body

  if (hasNullValue([lastname, firstname, email, password])) {
    return res.status(400).json({ error: 'Some input is missing' })
  }

  const [results, tableInfos] = await User.getByEmail(email).catch(err => {
    console.log(err)
  })

  if (results.length > 0) {
    return res.status(404).json({ error: 'User already exists!' })
  }

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: 'Email is not valid!' })
  }

  if (!PASSWORD_REGEX.test(password)) {
    return res.status(400).json({ error: 'Password is not valid!' })
  }

  const hashedPassword = await hashPassword(password)

  User.create({
    lastname,
    firstname,
    username,
    email,
    password: hashedPassword,
    role,
  })
    .then(results => {
      // console.log(results)
      if (results.affectedRows === 0) {
        return res.status(400).json({ error: 'User already exists!' })
      }

      const token = generateToken({
        user_id: results.insertId,
        lastname,
        firstname,
        email,
        role_id: 0,
      })

      res.status(201).json({
        message: 'User successfully created',
        token,
      })
    })
    .catch(error => {
      console.log(error)
      return res.status(400).json({ error: 'User was not created!' })
    })
}
