import { DashboardHeader } from '@/app/(site-layout)/(protected)/_components/dashboard-header'
import { ReviewCreateButton } from '@/components/review/review-create-button'
import { DashboardShell } from '@/app/(site-layout)/(protected)/_components/shell'
import { UserItem } from '@/app/(site-layout)/(protected)/_components/user-item'

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Settings" text="Manage your account.">
        <ReviewCreateButton />
      </DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border">
        <UserItem.Skeleton />
        <UserItem.Skeleton />
        <UserItem.Skeleton />
        <UserItem.Skeleton />
        <UserItem.Skeleton />
      </div>
    </DashboardShell>
  )
}
