import { DashboardHeader } from "@/components/dashboard-header"
import { ReviewCreateButton } from "@/components/review-create-button"
import { ReviewItem } from "@/components/review-item"
import { DashboardShell } from "@/components/shell"

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Posts" text="Create and manage posts.">
        <ReviewCreateButton />
      </DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border">
        <ReviewItem.Skeleton />
        <ReviewItem.Skeleton />
        <ReviewItem.Skeleton />
        <ReviewItem.Skeleton />
        <ReviewItem.Skeleton />
      </div>
    </DashboardShell>
  )
}
