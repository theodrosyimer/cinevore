import { SiteFooter } from './_layout/footer'
import { SiteHeader } from './_layout/header'

interface SiteLayoutProps {
  children: React.ReactNode
}

export default async function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <>
      <SiteHeader />
      <main className="container relative mt-14">{children}</main>
      <SiteFooter className="mt-8" />
    </>
  )
}
