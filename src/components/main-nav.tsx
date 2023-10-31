'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils/utils'
import { Icons } from '@/components/icons'
import { MainNavItem } from '@/types'
import { useTheme } from 'next-themes'

type MainNavProps = {
  items?: MainNavItem[]
  children?: React.ReactNode
}

export function MainNav({ items, children }: MainNavProps) {
  const pathname = usePathname()
  const { theme } = useTheme()

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        {items?.length ? (
          <nav className="hidden gap-6 md:flex">
            {items?.map((item, index) => {
              return (
                <Link
                  key={index}
                  href={item.disabled ? '#' : item.href}
                  className={cn(
                    'flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm',
                    pathname === item.href &&
                      theme === 'light' &&
                      'text-foreground',
                    pathname === item.href &&
                      theme === 'dark' &&
                      'text-foreground',
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
