import { CardSkeleton } from '@/components/card-skeleton'
import { DashboardHeader } from '@/app/(site-layout)/(protected)/_components/dashboard-header'
import { DashboardShell } from '@/app/(site-layout)/(protected)/_components/shell'

export default function DashboardBillingLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Billing"
        text="Manage billing and your subscription plan."
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  )
}
