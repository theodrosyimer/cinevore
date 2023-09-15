import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"

export const metadata = {
  title: "Profile Page",
  description: "User's Profile Page.",
}

export default async function UserProfilePage({ params }: { params: { username: string } }) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }
  console.log(user)
  return (
    <>
      <h1 className="text-4xl font-bold text-center">Welcome back <br />
        {user.name ? user.name[0]?.toUpperCase() + user.name.slice(1) : user.email}
      </h1>
    </>
  )
}
