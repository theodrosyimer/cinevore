import { SidebarNav } from '@/app/(site-layout)/(protected)/(settings)/settings/components/sidebar-nav'
import { ProfileForm } from '@/app/(site-layout)/(protected)/(settings)/settings/profile-form'
import { Separator } from '@/components/ui/separator'
import { settingsConfig } from '@/config/settings'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Settings',
  description: 'User settings and preferences.',
}

export default async function SettingsProfilePage() {
  // const { user, isAdmin } = await getCurrentUser()

  // if (!user) {
  //   redirect(authOptions?.pages?.signIn || "/login")
  // }

  return (
    <>
      <div className="container space-y-6 pb-16">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/5">
            <SidebarNav items={settingsConfig.sidebarNav} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Profile</h3>
                <p className="text-sm text-muted-foreground">
                  This is how others will see you on the site.
                </p>
              </div>
              <Separator />
              <ProfileForm />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
