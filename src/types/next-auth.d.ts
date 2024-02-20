import { type NewUser } from '@/types/db'
import { type ValuesOf } from '@/types/utility'
import { type DefaultUser } from 'next-auth'
// import { User } from "next-auth"
import 'next-auth/jwt'

type UserId = string

type Role = ValuesOf<Pick<NewUser, 'role'>>

// interface UserAuth extends DefaultUser {
//   role?: Role
// }

interface DefaultUserAuth extends DefaultUser {
  role?: Role
}

type UserProps = Pick<NewUser, 'id' | 'name' | 'email' | 'image'>

type UserAuth = DefaultUserAuth & UserProps

declare module 'next-auth/jwt' {
  interface JWT extends UserAuth {
    id: UserId
  }
}

declare module 'next-auth' {
  type User = UserAuth
  interface Session {
    user?: User
  }
}
