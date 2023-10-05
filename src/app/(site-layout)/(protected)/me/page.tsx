import { UserInfos } from "@/components/user-infos"
import { UserNavigation } from "@/components/user-navigation"
import { userNavigationConfig } from '@/config/user-navigation'
import { getCurrentUser } from "@/lib/session"

export const metadata = {
  title: "Profile Page",
  description: "User's Profile Page.",
}

export default async function MePage({ params }: { params: { username: string } }) {
  const { user, isAdmin } = await getCurrentUser()

  if (!user) {
    return null
  }
  // console.log(user)
  return (
    <>
      {/* <h1 className="text-4xl font-bold text-center">Welcome back <br />
        {user.name ? user.name[0]?.toUpperCase() + user.name.slice(1) : user.email}
      </h1> */}
      {user ? <UserInfos /* user={user} */ /> : null}

      <UserNavigation items={userNavigationConfig.mainNav} />
    </>
  )
}
