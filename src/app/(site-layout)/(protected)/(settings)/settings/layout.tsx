import { type Metadata } from 'next'

import { Separator } from '@/components/ui/separator'
import { SidebarNav } from '@/app/(site-layout)/(protected)/_components/sidebar-nav'
import { settingsConfig } from '@/config/settings'

export const metadata: Metadata = {
  title: 'Settings',
  description: 'User settings and preferences.',
}

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="w-full space-y-6 pb-16">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/5">
            <SidebarNav items={settingsConfig.sidebarNav} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  )
}
