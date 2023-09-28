import { SiteFooter } from "@/components/site-footer"
import { Header } from "@/components/header"
import { SiteHeader } from "@/components/site-header"
// import { Footer } from "@/components/footer"

interface SiteLayoutProps {
  children: React.ReactNode
}

export default async function SiteLayout({
  children,
}: SiteLayoutProps) {

  return (
    <>
      {/* <Header /> */}
      <SiteHeader />
      <main className="container mt-4">{children}</main>
      <SiteFooter className="border-t" />
    </>
  )
}
