import Loading from './loading'
import { SiteFooter } from './_layout/footer'
import { SiteHeader } from './_layout/header'
import { Suspense } from 'react'

interface SiteLayoutProps {
  children: React.ReactNode
}

export default async function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <>
      <SiteHeader />
      {/* <Suspense fallback={<Loading />}> */}
      <main className="container relative mt-14">{children}</main>
      {/* </Suspense> */}
      <SiteFooter className="mt-8" />
    </>
  )
}
