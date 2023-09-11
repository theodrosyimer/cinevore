import Link from 'next/link'
import { MainNav } from '@/components/main-nav'
import { siteLayoutConfig } from '@/config/site-nav'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Search } from '@/components/search'
import { ModeToggle } from '@/components/mode-toggle'

export function Header() {
  return (
    <>
      <header className="container z-40 bg-background">
        <div className="flex h-20 justify-between py-6">
          <MainNav items={siteLayoutConfig.mainNav} />
          <div className="flex place-items-center gap-4">
            <Search />
            <ModeToggle />
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
        </div>
      </header>
    </>
  )
}
