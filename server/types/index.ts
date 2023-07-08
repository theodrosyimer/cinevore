import { Inspect } from "./utility-types"

const userRoles = ['user', 'admin', 'superadmin'] as const

export type UserRole = typeof userRoles[number]

export type User = {
  userId: number
  lastname: string
  firstname: string
  email: string
  emailVerified: boolean
  role: UserRole = 'user'
}

let u: User = {
  userId: 1,
  lastname: 'Doe',
  firstname: 'John',
  email: '',
  emailVerified: false,
}
