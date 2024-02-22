import { notFound } from 'next/navigation'

import { adminDashboardConfig } from '@/config/admin-dashboard'
import { getCurrentUser } from '@/lib/session'
import { DashboardNav } from './_components/nav'

interface AdminDashboardLayoutProps {
  children?: React.ReactNode
}

export default async function AdminDashboardLayout({
  children,
}: AdminDashboardLayoutProps) {
  const { user, isAdmin } = await getCurrentUser()

  if (!user) {
    return notFound()
  }

  return (
    <div className="mt-14 flex flex-col space-y-8 md:flex-row md:space-x-12 md:space-y-0">
      <aside className="w-auto md:w-1/5">
        <DashboardNav items={adminDashboardConfig.sidebarNav} />
      </aside>
      <section className="grid w-full">{children}</section>
    </div>
    // </div>
  )
}
