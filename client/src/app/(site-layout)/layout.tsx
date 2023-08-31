import Link from "next/link"

import { siteLayoutConfig } from "@/config/site-nav"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { Header } from "@/components/header"
// import { Footer } from "@/components/footer"

interface SiteLayoutProps {
  children: React.ReactNode
}

export default async function SiteLayout({
  children,
}: SiteLayoutProps) {
  return (
    <>
      <Header />
      <main className="">{children}</main>
      <SiteFooter />
    </>
  )
}
