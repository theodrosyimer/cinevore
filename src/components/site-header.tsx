import Link from 'next/link'

import { siteConfig } from '@/config/site'
import { siteLayoutConfig } from '@/config/nav'

import { cn } from '@/lib/utils/utils'
import { CommandMenu } from '@/components/command-menu'
import { Icons } from '@/components/icons'
import { MainNav } from '@/components/main-nav'
import { MobileNav } from '@/components/mobile-nav'
import { ModeToggle } from '@/components/mode-toggle'
// import { buttonVariants } from "@/registry/new-york/ui/button"
import { buttonVariants } from '@/components/ui/button'
import { getCurrentUser } from '@/lib/session'
import { UserAccountNav } from '@/components/user-account-nav'
import { UserCreateListButton } from '@/components/user-create-list'
import { Search } from '@/components/search-input'
import { SearchCombo } from '@/components/search-combo'

export async function SiteHeader() {
  const { user, isAdmin } = await getCurrentUser()

  siteLayoutConfig.mainNav =
    user?.role === 'user' || !user?.role
      ? siteLayoutConfig.mainNav.filter((item) => item.label !== 'admin')
      : siteLayoutConfig.mainNav

  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur bg-scroll:bg-transparent">
      <div className="container flex h-16 items-center  justify-between">
        <MainNav items={siteLayoutConfig.mainNav} />
        <MobileNav items={siteLayoutConfig} />
        <div className="flex flex-1 items-center space-x-2 md:justify-end">
          <div className=" hidden w-full flex-1 md:w-auto md:flex-none">
            <CommandMenu user={user} />
          </div>
          <nav className="flex place-items-center gap-2">
            {/* <Search /> */}
            <SearchCombo />
            {/* <ModeToggle /> */}
            {/* <UserCreateListButton size={'sm'} /> */}
            {!user ? (
              <nav>
                <Link
                  href="/login"
                  className={cn(
                    buttonVariants({ variant: 'secondary', size: 'sm' }),

                  )}
                >
                  Login
                </Link>
              </nav>
            ) : null}
            <UserAccountNav
              user={{
                name: user?.name,
                image: user?.image,
                email: user?.email,
              }}
            />
          </nav>
        </div>
      </div>
    </header>
  )
}