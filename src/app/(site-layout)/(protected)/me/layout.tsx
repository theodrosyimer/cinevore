import Loading from "@/app/(site-layout)/loading"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { UserInfos } from "@/components/user-infos"
import { UserNavigation } from "@/components/user-navigation"
import { userNavigationConfig } from "@/config/user-navigation"
import { getCurrentUser } from "@/lib/session"
// import { Footer } from "@/components/footer"

interface SiteLayoutProps {
  children: React.ReactNode
}
export default async function MeLayout({
  children,
}: SiteLayoutProps) {

  const { user, isAdmin } = await getCurrentUser()

  return (
    <>
      {user ? <UserInfos /* user={user} */ /> : null}
      <div className="grid gap-8">
        <UserNavigation items={userNavigationConfig.mainNav} />
        {children}
      </div>
    </>
  )
}
