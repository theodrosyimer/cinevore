import { Inspect, KeysOf } from "@/core/types/utility-types"

const userRoles = { 'user': 0, 'admin': 1, 'superadmin': 2 } as const

export type UserRoles = typeof userRoles

export type RoleAndPermissions<TUserRole extends keyof UserRoles = 'user'> = {
    role: UserRoles[TUserRole]
    permissionFlags?: number
}
export type CreateUser<TUserRole extends keyof UserRoles = 'user'> = {
    email: string
    password: string
    firstname?: string
    lastname?: string
    username?: string
    avatar_filename?: string
} & RoleAndPermissions<TUserRole>

export type UserType<TUserRole extends keyof UserRoles = 'user'> = {
    id: number
    lastname: string
    firstname: string
    username: string
    email: string
    emailVerified: boolean
    password: string
    role: UserRoles[TUserRole]
    bio: string
    avatar_filename: string
    date_created: Date
    last_updated: Date
}

type UserTypeOptional = Partial<UserType>

let u: UserType<'admin'> = {
    id: 1,
    lastname: 'lastname',
    firstname: 'firstname',
    username: 'username',
    email: 'email',
    emailVerified: true,
    password: 'password',
    role: 1,
    bio: 'bio',
    avatar_filename: 'avatar_filename',
    date_created: new Date(),
    last_updated: new Date(),
}

