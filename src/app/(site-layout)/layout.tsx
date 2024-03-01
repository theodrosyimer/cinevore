import { SiteFooter } from './_layout/footer'
import { SiteHeader } from './_layout/header'

interface LayoutProps {
  children: React.ReactNode
}

export default async function Layout({ children }: LayoutProps) {
  return (
    <>
      <SiteHeader />
      <main className="container relative mt-14">{children}</main>
      <SiteFooter className="mt-8" />
    </>
  )
}
