import { getCurrentUser } from '@/lib/session'
import { DashboardHeader } from '@/app/(site-layout)/(protected)/_components/dashboard-header'
import { DashboardShell } from '@/app/(site-layout)/(protected)/_components/shell'
import { UserNameForm } from '@/app/(site-layout)/(protected)/_components/user-name-form'

export const metadata = {
  title: 'Settings',
  description: 'Manage account and website settings.',
}

export default async function SettingsPage() {
  const { user } = await getCurrentUser()

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="grid gap-10">
        {!!user ? (
          <UserNameForm user={{ id: user.id, name: user.name ?? '' }} />
        ) : null}
      </div>
    </DashboardShell>
  )
}
