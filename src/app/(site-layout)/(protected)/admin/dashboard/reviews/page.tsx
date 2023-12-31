import { DashboardHeader } from '@/app/(site-layout)/(protected)/_components/dashboard-header'
import { EmptyPlaceholder } from '@/app/(site-layout)/(protected)/admin/dashboard/_components/empty-placeholder'
import { DashboardShell } from '@/app/(site-layout)/(protected)/_components/shell'
import { UserItem } from '@/app/(site-layout)/(protected)/_components/user-item'
import { user } from '@/db/schema/planetscale'
import { db } from '@/db'
import { desc } from 'drizzle-orm'
import { UserCreateButton } from '../_components/admin-create-user-button'

export const metadata = {
  title: 'Dashboard'
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
          <div className="divide-y divide-border rounded-md border">
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
