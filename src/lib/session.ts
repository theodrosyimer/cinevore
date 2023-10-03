import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"

export async function getCurrentUserOLD() {
  const session = await getServerSession(authOptions)

  return session?.user
}

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)

  return {
    user: session?.user,
    isAdmin: session?.user?.role === "admin" || session?.user?.role === "superadmin",
    isSuperAdmin: session?.user?.role === "superadmin"
  }
}
