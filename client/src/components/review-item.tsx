import Link from "next/link"
import { SelectReview, review } from "@/drizzle/schema"

import { formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { ReviewOperations } from "@/components/review-operations"

interface ReviewItemProps {
  review: Pick<SelectReview, "id" | "content" | "updatedAt" | "createdAt">
}

export function ReviewItem({ review }: ReviewItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/editor/${review.id}`}
          className="font-semibold hover:underline"
        >
          {review.content}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDate(review.createdAt?.toDateString())}
          </p>
        </div>
      </div>
      <ReviewOperations review={{ id: review.id, content: review.content }} />
    </div>
  )
}

ReviewItem.Skeleton = function ReviewItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
