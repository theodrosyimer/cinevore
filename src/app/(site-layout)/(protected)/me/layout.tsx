import { SidebarNav } from "@/app/(site-layout)/(protected)/me/settings/components/sidebar-nav"
import Loading from "@/app/(site-layout)/loading"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { UserInfos } from "@/components/user-infos"
import { UserNavigation } from "@/components/user-navigation"
import { settingsConfig } from "@/config/settings"
import { userNavigationConfig } from "@/config/user-navigation"
import { getCurrentUser } from "@/lib/session"
import { Separator } from "@radix-ui/react-dropdown-menu"
// import { Footer } from "@/components/footer"

interface MeLayoutProps {
  children: React.ReactNode
}
export default async function MeLayout({
  children,
}: MeLayoutProps) {

  const { user, isAdmin } = await getCurrentUser()

  return (
    <>

      <div className="container space-y-6 pb-16">
        {/* <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div> */}
        {user ? <UserInfos /* user={user} */ /> : null}
        <div className="grid gap-8">
          {/* <UserNavigation items={userNavigationConfig.mainNav} /> */}
        </div>
        {/* <Separator className="my-6" /> */}
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/5">
            <SidebarNav items={userNavigationConfig.mainNav} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  )
}
