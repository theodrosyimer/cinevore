/* eslint-disable no-shadow */
import type { Request, Response } from 'express'

import UsersModel from "@/users/models/users-drizzle"
import { hashPassword } from '@/lib/bcrypt'
import { hasNullValue, sendErrorResponse } from '@/lib/utils'

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g

export function getUsers(req: Request, res: Response) {
  UsersModel.getAll()
    .then((users) => {
      if (!users) {
        return res.status(400).json({ error: 'No users was found!' })
      }
      users.forEach(user => user)

      res.status(200).json({ users })
    })
    .catch(error => {
      console.log(error)
      return res.sendStatus(500)
    })
}

export function getUser(req: Request, res: Response) {
  const id = +req.params.id

  if (Number.isNaN(id) || id == null) {
    return res.status(400).json({
      error: `Invalid parameter type! \`id\` must be of type number, received ${JSON.stringify(
        req.params.id
      )}`,
    })
  }

  UsersModel.getById(id)
    .then((results) => {
      if (!results || !results.length) {
        return res.status(404).json({ error: 'User was not found!' })
      }
    })
    .catch(error => {
      console.log(error)
      return error
    })
}

export async function postUser(req: Request, res: Response) {
  const hasNoDataInput = !Object.values(req.body).length

  if (hasNoDataInput) {
    return res.status(400).json({ error: 'No input was provided!' })
  }

  const { lastname, firstname, username, email, password } = req.body

  if (hasNullValue([lastname, firstname, username, email, password])) {
    return sendErrorResponse(res, 400, 'Not all data was provided')
  }
  const { role: _role } = req.user
  const isNotAdmin = _role !== 1

  if (isNotAdmin) {
    return res.status(403).json({ error: 'Unauthorized User!' })
  }
  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: 'Email is not valid!' })
  }

  if (!PASSWORD_REGEX.test(password)) {
    return res.status(400).json({ error: 'Password is not valid!' })
  }

  const hashedPassword = await hashPassword(password)

  if (hashedPassword == null) {
    return sendErrorResponse(res, 400, `Failed to hash the password!`)
  }

  UsersModel.create({
    lastname,
    firstname,
    username,
    email,
    password: hashedPassword,
  })
    .then(results => {
      if (results.affectedRows === 0) {
        return res.status(400).json({ error: 'User was not created' })
      }

      res.status(201).json({ message: 'User successfully created' })
    })
    .catch(error => {
      console.log(error)
      return res.status(400).json({ error: 'User already exists!' })
    })
}

export async function putUser(req: Request, res: Response) {
  const id = Number(req.params.id)

  if (Number.isNaN(id) || id == null) {
    return res.status(400).json({
      error: `Invalid parameter type! \`id\` must be of type number, received ${JSON.stringify(
        req.params.id
      )}`,
    })
  }

  const { userId, role } = req.user
  const isNotAdmin = role !== 1

  if (isNotAdmin) {
    const [results, tableInfos] = await UsersModel.getById(userId).catch(error => {
      console.log(error)
      return error.message
    })

    if (results[0].user_id !== userId) {
      return res
        .status(403)
        .json({ error: 'Unauthorized to update the user data!' })
    }
  }

  const hasNoDataInput = !Object.values(req.body).length

  if (hasNoDataInput) {
    return res.status(400).json({ error: 'No input was provided!' })
  }

  UsersModel.updateById(id, req.body)
    .then(results => {
      res.status(200).json({ message: 'User successfully updated' })
    })
    .catch(error => {
      console.log(error)
      return error
    })
}

export async function deleteUser(req: Request, res: Response) {
  const id = +req.params.id

  // const { searchParams } = new URL(req.url)
  // const id2 = Number(searchParams.get('userId'))

  if (Number.isNaN(id)) {
    res.status(400).json({
      error: `Invalid parameter type! \`id\` must be of type number, received ${JSON.stringify(
        req.params.id
      )}`,
    })
  }

  const { userId, role } = req.user
  const isNotAdmin = role !== 1

  if (isNotAdmin) {
    const [results, tableInfos] = await UsersModel.getById(userId).catch(error => {
      console.log(error)
      return error.message
    })

    if (results[0].user_id !== userId) {
      return res
        .status(403)
        .json({ error: 'Unauthorized to update the user data!' })
    }
  }

  UsersModel.deleteById(id)
    .then(([results]) => {
      if (!results.affectedRows)
        return res.status(404).json({ error: 'User was not found!' })

      res.status(200).json({ message: 'User successfully deleted' })
    })
    .catch(error => {
      console.log(error)
      return error
    })
}
