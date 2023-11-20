'use client'

import { Icons } from '@/components/icon/icons'
import { cn } from '@/lib/utils/utils'
import { MainNavItem } from '@/types'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type MainNavProps = {
  items?: MainNavItem[]
  children?: React.ReactNode
}

export function UserNavigation({ items, children }: MainNavProps) {
  const pathname = usePathname()
  const { theme } = useTheme()

  return (
    <div className=" mr-4 items-center sm:flex ">
      <nav className="flex w-fit items-center justify-center space-x-6 divide-y divide-border rounded-md border p-3  text-sm font-medium">
        {items?.length ? (
          <nav className="gap-6 sm:flex">
            {items?.map((item, index) => {
              return (
                <Link
                  key={index}
                  href={item.disabled ? '#' : item.href}
                  className={cn(
                    'flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm',
                    pathname === item.href &&
                      theme === 'light' &&
                      'text-accent-foreground',
                    pathname === item.href && theme === 'dark' && 'text-accent',
                    pathname !== item.href && 'text-foreground/60',
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
