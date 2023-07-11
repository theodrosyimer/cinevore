import { UserRoles } from "../../users/types/create-user"
import { PermissionFlag } from "@/core/middlewares/permissionflag-enum"
import { ValuesOf } from "./utility-types"

export type Jwt = {
    userId: string
    refreshKey?: string
    role: ValuesOf<UserRoles>
    permissionFlag: PermissionFlag
}
