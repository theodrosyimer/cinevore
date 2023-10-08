import Link from 'next/link'
import { MainNav } from '@/components/main-nav'
import { siteLayoutConfig } from '@/config/nav'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Search } from '@/components/search'
import { ModeToggle } from '@/components/mode-toggle'
import { UserAccountNav } from '@/components/user-account-nav'
import { User } from 'next-auth'

import { getCurrentUser } from "@/lib/session"
import { notFound } from "next/navigation"

export async function Header() {
  const { user, isAdmin } = await getCurrentUser()

  // if (!user) {
  //   return notFound()
  // }

  return (
    <>
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-20 justify-between py-6">
          <MainNav items={siteLayoutConfig.mainNav} />

          <div className="flex place-items-center gap-4">
            <Search />
            <ModeToggle />
            {!user ?
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
              :
              <UserAccountNav
                user={{
                  name: user.name,
                  image: user.image,
                  email: user.email,
                }}
              />}
          </div>
        </div>
      </header>
    </>
  )
}
