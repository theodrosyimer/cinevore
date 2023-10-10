'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils/utils'
import { buttonVariants } from '@/components/ui/button'
import { NavItem, SidebarNavItem, SiteLayoutConfig } from '@/types'

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: NavItem[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        'flex space-x-2 md:flex-col md:space-x-0 md:space-y-1',
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.disabled ? '#' : item.href}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            pathname === item.href
              ? 'bg-muted hover:bg-muted'
              : 'hover:bg-transparent hover:underline',
            'justify-start',
            item.disabled && 'cursor-not-allowed opacity-80'
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
