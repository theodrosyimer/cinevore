import { NewUser } from "@/types/db"
// import { User } from "next-auth"
import { JWT } from "next-auth/jwt"

type UserId = string

type UserAuth = Pick<NewUser, 'id' | 'name' | 'email' | 'image' | 'role'>

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
