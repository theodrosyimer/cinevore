'use client'

import { Icons } from '@/components/icons'
import { cn } from '@/lib/utils/utils'
import { MainNavItem } from '@/types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type MainNavProps = {
  items?: MainNavItem[]
  children?: React.ReactNode
}

export function UserNavigation({ items, children }: MainNavProps) {
  const pathname = usePathname()

  return (
    <div className=" mr-4 sm:flex items-center ">
      <nav className="flex items-center space-x-6 text-sm font-medium divide-y divide-border rounded-md border p-3  justify-center w-fit">
        {items?.length ? (
          <nav className="gap-6 sm:flex">
            {items?.map((item, index) => {
              return (
                <Link
                  key={index}
                  href={item.disabled ? '#' : item.href}
                  className={cn(
                    'flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm',
                    pathname === item.href
                      ? 'text-foreground'
                      : 'text-foreground/60',
                    item.disabled && 'cursor-not-allowed opacity-80',
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
}
