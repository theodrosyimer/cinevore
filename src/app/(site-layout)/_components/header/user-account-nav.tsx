'use client'

import Link from 'next/link'
import { type User } from 'next-auth'
import { signOut } from 'next-auth/react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { userAccountNavConfig } from '@/config/user-account-nav'

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, 'name' | 'image' | 'email'>
  children?: React.ReactNode
}

export function UserAccountNav({ user, children }: UserAccountNavProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {children}
        {/* <UserAvatar
          user={{ name: user.name ?? '', image: user.image || null }}
          className={cn('h-8 w-8', !user.email ? 'hidden' : '')}
        /> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-[100]">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        {userAccountNavConfig.map((item) => (
          <DropdownMenuItem key={item.title} asChild>
            <Link href={item.href}>{item.title}</Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={async (event) => {
            event.preventDefault()
            await signOut({
              callbackUrl: `${window.location.origin}`,
            })
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
