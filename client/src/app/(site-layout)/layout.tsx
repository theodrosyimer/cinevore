import Link from "next/link"

import { siteLayoutConfig } from "@/config/site-nav"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
// import { Footer } from "@/components/footer"

interface SiteLayoutProps {
  children: React.ReactNode
}

export default async function SiteLayout({
  children,
}: SiteLayoutProps) {
  return (
    <>
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={siteLayoutConfig.mainNav} />
          <nav>
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                "px-4"
              )}
            >
              Login
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  )
}
