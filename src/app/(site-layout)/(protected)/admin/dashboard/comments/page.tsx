import { redirect } from 'next/navigation'

import { DashboardHeader } from '@/app/(site-layout)/(protected)/components/dashboard-header'
import { EmptyPlaceholder } from '@/app/(site-layout)/(protected)/admin/dashboard/components/empty-placeholder'
import { DashboardShell } from '@/app/(site-layout)/(protected)/components/shell'
import { UserItem } from '@/app/(site-layout)/(protected)/components/user-item'
import { user } from '@/db/planetscale'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'
import { desc } from 'drizzle-orm'
import { UserCreateButton } from '../components/admin-create-user-button'

export const metadata = {
  title: 'Dashboard'
}

export default async function DashboardPage() {
  const { user: currentUser } = await getCurrentUser()

  if (!currentUser) {
    redirect(authOptions?.pages?.signIn || '/login')
  }

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
