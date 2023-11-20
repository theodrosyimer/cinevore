import { DashboardHeader } from '@/app/(site-layout)/(protected)/components/dashboard-header'
import { ReviewCreateButton } from '@/components/review/review-create-button'
import { DashboardShell } from '@/app/(site-layout)/(protected)/components/shell'
import { UserItem } from '@/app/(site-layout)/(protected)/components/user-item'

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Users" text="Create and manage users.">
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
