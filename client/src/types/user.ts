// import { PermissionFlag } from "@/core/middlewares/permissionflag-enum"
import { InferInsertModel, InferSelectModel, getTableColumns } from "drizzle-orm"
import { user } from "@/drizzle/schema"

export type User = InferInsertModel<typeof user>

export type NewUser = InferInsertModel<typeof user>
export type SelectUser = InferSelectModel<typeof user>

export type PatchUser = Partial<User>

export type PutUser = User

export type UserVerification = Pick<User, 'id' | 'roleId' | 'email' | 'password'>

const userRoles = { 'user': 0, 'admin': 1, 'superadmin': 2 } as const

export type UserRoles = typeof userRoles

// export type RoleAndPermissions<TUserRole extends keyof UserRoles = 'user'> = {
//     role: UserRoles[TUserRole]
//     permissionFlag?: PermissionFlag.FREE_PERMISSION | PermissionFlag.PAID_PERMISSION
// }

// export type CreateUser<TUserRole extends keyof UserRoles = 'user'> = {
//     email: string
//     password: string
//     firstname?: string
//     lastname?: string
//     username?: string
//     avatar_filename?: string
// } & RoleAndPermissions<TUserRole>

// export type UserType<TUserRole extends keyof UserRoles = 'user'> = {
//     user_id: string
//     lastname: string
//     firstname: string
//     username: string
//     email: string
//     emailVerified: boolean
//     password: string
//     role_id: UserRoles[TUserRole]
//     permissionFlag: PermissionFlag
//     bio: string
//     avatar_filename: string
//     date_created: Date
//     last_updated: Date
// }

