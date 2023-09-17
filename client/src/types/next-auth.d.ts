import { NewUser } from "@/types/user"
// import { User } from "next-auth"
import { JWT } from "next-auth/jwt"
import { type } from "os"

type UserId = string

type UserAuth = Pick<NewUser, 'name' | 'email' | 'image' | 'roleId'>


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
