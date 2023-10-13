import { SidebarNav } from '@/app/(site-layout)/(protected)/(settings)/settings/components/sidebar-nav'
import Loading from '@/app/(site-layout)/loading'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { UserInfos } from '@/components/user-infos'
import { UserNavigation } from '@/components/user-navigation'
import { settingsConfig } from '@/config/settings'
import { userNavigationConfig } from '@/config/user-profile'
import { getCurrentUser } from '@/lib/session'
import { Separator } from '@radix-ui/react-dropdown-menu'
// import { Footer } from "@/components/footer"

interface MeLayoutProps {
  children: React.ReactNode
}
export default async function MeLayout({ children }: MeLayoutProps) {
  const { user, isAdmin } = await getCurrentUser()

  return (
    <>
      <div className="space-y-6 pb-16">
        {/* <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div> */}
        {/* <Separator className="my-6" /> */}
        <div className="flex flex-col space-y-8 md:flex-row md:space-x-12 md:space-y-0">
          <aside className="hidden md:block md:w-1/5">
            <SidebarNav items={userNavigationConfig.mainNav} />
          </aside>
          <div className="grid flex-1 gap-8 md:max-w-2xl">
            {user ? <UserInfos user={user} /> : null}
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
