import Loading from '@/app/(site-layout)/loading'
import { SiteFooter } from '@/app/(site-layout)/_layout/footer'
import { SiteHeader } from '@/app/(site-layout)/_layout/header'
import { Suspense } from 'react'

interface SiteLayoutProps {
  children: React.ReactNode
}

export default async function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <>
      <SiteHeader />
      <Suspense fallback={<Loading />}>
        <main className="container relative mt-14">{children}</main>
      </Suspense>
      <SiteFooter className="mt-8" />
    </>
  )
}
