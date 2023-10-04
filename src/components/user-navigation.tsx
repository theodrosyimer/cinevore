"use client"

import { Icons } from '@/components/icons'
import { cn } from '@/lib/utils'
import { MainNavItem } from '@/types'
import { Link } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React from 'react'

type MainNavProps = {
  items?: MainNavItem[]
  children?: React.ReactNode
}

export function UserNavigation({ items, children }: MainNavProps) {
  const pathname = usePathname()

  return (
    (
      <div className="mr-4 hidden md:flex">
        <nav className="flex items-center space-x-6 text-sm font-medium">
          {items?.length ? (
            <nav className="hidden gap-6 md:flex">
              {items?.map((item, index) => {
                return (
                  <Link
                    key={index}
                    href={item.disabled ? "#" : item.href}
                    className={cn(
                      "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                      pathname === item.href
                        ? "text-foreground"
                        : "text-foreground/60",
                      item.disabled && "cursor-not-allowed opacity-80"
                    )}
                  >
                    {item.title}
                  </Link>
                )
              })}
            </nav>
          ) : null}
        </nav>
      </div>
    )
  )
}
