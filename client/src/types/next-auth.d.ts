import { NewUser } from "@/types/db"
import { ValuesOf } from "@/types/utility"
import { DefaultUser } from "next-auth"
// import { User } from "next-auth"
import { JWT } from "next-auth/jwt"

type UserId = string

type Role = ValuesOf<Pick<NewUser, 'role'>>

interface UserAuth extends DefaultUser {
  role?: Role
}

declare module "next-auth/jwt" {
  interface JWT extends UserAuth {
    id: UserId
  }
}

declare module "next-auth" {
  interface User extends UserAuth {}
  interface Session {
    user?: User
  }
}
