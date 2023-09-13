import { SiteFooter } from "@/components/site-footer"
import { Header } from "@/components/header"
import { getCurrentUser } from "@/lib/session"
import { notFound } from "next/navigation"
// import { Footer } from "@/components/footer"

interface SiteLayoutProps {
  children: React.ReactNode
}

export default async function SiteLayout({
  children,
}: SiteLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    return notFound()
  }
  return (
    <>
      <Header user={user} />
      <main className="">{children}</main>
      <SiteFooter />
    </>
  )
}
