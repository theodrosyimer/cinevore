import { CardSkeleton } from '@/components/card-skeleton'
import { DashboardHeader } from '@/app/(site-layout)/(protected)/_components/dashboard-header'
import { DashboardShell } from '@/app/(site-layout)/(protected)/_components/shell'

export default function DashboardSettingsLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  )
}
