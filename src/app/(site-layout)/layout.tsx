import Loading from '@/app/(site-layout)/loading';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { Suspense } from 'react';
// import { Footer } from "@/components/footer"

interface SiteLayoutProps {
  children: React.ReactNode;
}

export default async function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <>
      {/* <Header /> */}
      <SiteHeader />
      <Suspense fallback={<Loading />}>
        <main className="container md:py-12">{children}</main>
      </Suspense>
      <SiteFooter className="border-t mt-8" />
    </>
  );
}
