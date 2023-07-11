import { Inspect, KeysOf } from "@/core/types/utility-types"
import { PermissionFlag } from "@/core/middlewares/permissionflag-enum"

const userRoles = { 'user': 0, 'admin': 1, 'superadmin': 2 } as const

export type UserRoles = typeof userRoles

export type RoleAndPermissions<TUserRole extends keyof UserRoles = 'user'> = {
    role: UserRoles[TUserRole]
    permissionFlag?: PermissionFlag.FREE_PERMISSION | PermissionFlag.PAID_PERMISSION
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
    user_id: string
    lastname: string
    firstname: string
    username: string
    email: string
    emailVerified: boolean
    password: string
    role_id: UserRoles[TUserRole]
    permissionFlag: PermissionFlag
    bio: string
    avatar_filename: string
    date_created: Date
    last_updated: Date
}

let u: UserType<'user'> = {
    id: 1,
    lastname: 'lastname',
    firstname: 'firstname',
    username: 'username',
    email: 'email',
    emailVerified: true,
    password: 'password',
    role: 0,
    permissionFlag: PermissionFlag.FREE_PERMISSION,
    bio: 'bio',
    avatar_filename: 'avatar_filename',
    date_created: new Date(),
    last_updated: new Date(),
}

