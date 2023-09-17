import Link from "next/link"
import { review } from "@/drizzle/schema"

import { formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { UserOperations } from "@/components/user-operations"
import { SelectUser, SelectReview } from "@/types/db"

interface UserItemProps {
  user: Pick<SelectUser, "id" | "name" | "updatedAt" | "createdAt">
}

export function UserItem({ user }: UserItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/editor/${user.id}`}
          className="font-semibold hover:underline"
        >
          {user.name}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDate(user.createdAt?.toDateString())}
          </p>
        </div>
      </div>
      <UserOperations user={{ id: user.id, name: user.name }} />
    </div>
  )
}

UserItem.Skeleton = function UserItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
