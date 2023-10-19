import Link from 'next/link'

import { siteLayoutConfig } from '@/config/nav'

import { cn } from '@/lib/utils/utils'
import { CommandMenu } from '@/components/command-menu'
import { MainNav } from '@/components/main-nav'
import { MobileNav } from '@/components/mobile-nav'
// import { buttonVariants } from "@/registry/new-york/ui/button"
import { buttonVariants } from '@/components/ui/button'
import { getCurrentUser } from '@/lib/session'
import { UserAccountNav } from '@/components/user-account-nav'
import { SearchCombo } from '@/components/search-combo'

export async function SiteHeader() {
  const { user, isAdmin } = await getCurrentUser()

  siteLayoutConfig.mainNav =
    user?.role === 'user' || !user?.role
      ? siteLayoutConfig.mainNav.filter((item) => item.label !== 'admin')
      : siteLayoutConfig.mainNav

  return (
    <>
      <header className="supports-backdrop-blur:bg-background/60 bg-scroll:bg-transparent sticky top-0 z-[80] w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <MainNav items={siteLayoutConfig.mainNav} />
          <MobileNav items={siteLayoutConfig} />
          <div className="flex items-center">
            <div className="hidden w-full flex-1 md:w-auto md:flex-none">
              <CommandMenu user={user} />
            </div>
            {/* <Search /> */}
            <SearchCombo />
            {/* <ModeToggle /> */}
            {/* <UserCreateListButton size={'sm'} /> */}
            {!user ? (
              <Link
                href="/login"
                className={cn(
                  buttonVariants({
                    variant: 'secondary',
                    size: 'sm',
                    className: 'ml-2',
                  }),
                )}
              >
                Login
              </Link>
            ) : null}
            <UserAccountNav
              user={{
                name: user?.name,
                image: user?.image,
                email: user?.email,
              }}
            />
          </div>
        </div>
      </header>
    </>
  )
}
