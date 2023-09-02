// import { UserRoles } from "../../users/types/user"
// import { PermissionFlag } from "@/core/middlewares/permissionflag-enum"
// import { ValuesOf } from "./utility-types"

export type Jwt = {
  userId: string
  refreshKey?: string
  role: 0 | 1 | 2 /* ValuesOf<UserRoles> */
  // permissionFlag: PermissionFlag
}
