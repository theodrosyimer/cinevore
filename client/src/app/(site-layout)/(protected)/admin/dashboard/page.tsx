import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db
import { getCurrentUser } from "@/lib/session"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/dashboard-header"
import { UserCreateButton } from "@/components/user-create-button"
import { DashboardShell } from "@/components/shell"
import { desc, eq } from "drizzle-orm"
import { user } from "@/db-planetscale"
import { UserItem } from "@/components/user-item"

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const users = await db.query.user.findMany({
    // where: eq(user.id, currentUser.id),
    // columns: {
    //   id: true,
    //   name: true,
    //   updatedAt: true,
    //   createdAt: true,
    // },
    orderBy: [desc(user.updatedAt)],
  })

  return (
    <DashboardShell>
      <DashboardHeader heading="Users" text="Create and manage users.">
        <UserCreateButton />
      </DashboardHeader>
      <div>
        {users?.length ? (
          <div className="divide-y divide-border rounded-md border w-auto">
            {users.map((user) => (
              <UserItem key={user.id} user={user} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="user" />
            <EmptyPlaceholder.Title>No users created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any users yet. Start adding users.
            </EmptyPlaceholder.Description>
            <UserCreateButton variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}
