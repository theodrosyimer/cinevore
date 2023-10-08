import { notFound } from "next/navigation"

import { adminDashboardConfig } from "@/config/admin-dashboard"
import { getCurrentUser } from "@/lib/session"
import { DashboardNav } from "@/components/nav"

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
    // <div className="flex min-h-screen flex-col space-y-6">
    //   <header className="sticky top-0 z-40 border-b bg-background">
    //     <div className="container flex h-16 items-center justify-between py-4">
    //       <MainNav items={dashboardConfig.mainNav} />
    //       <UserAccountNav
    //         user={{
    //           name: user.name,
    //           image: user.image,
    //           email: user.email,
    //         }}
    //       />
    //     </div>
    //   </header>
    <div className="flex flex-col space-y-8 md:flex-row md:space-x-12 md:space-y-0">
      <aside className=" md:w-1/5">
        <DashboardNav items={adminDashboardConfig.sidebarNav} />
      </aside>
      <section className="flex w-full flex-1 flex-col overflow-hidden">
        {children}
      </section>
    </div>
    // </div>
  )
}
