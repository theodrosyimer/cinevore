import { ChevronDownIcon } from '@radix-ui/react-icons'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { SelectUser } from '@/types/db'
import { User } from 'next-auth'
import { cn } from '@/lib/utils/utils'
import { Icons } from '@/components/icons'
import Link from 'next/link'

interface UserInfos {
  user: User
  showUserName?: boolean
  avatarWidth?: string
  className?: string
}

export function UserInfos({
  user,
  className,
  avatarWidth,
  showUserName = true,
}: UserInfos) {
  return (
    <Card className="xs:w-auto w-auto border-0">
      {/* <CardHeader>
        <CardTitle>Team Members</CardTitle>
        <CardDescription>
          Invite your team members to collaborate.
        </CardDescription>
      </CardHeader> */}
      {/* <CardContent className="grid gap-6"> */}
      <div className="flex items-center space-x-4">
        <div
          className={cn(
            'flex items-center justify-between',
            showUserName ? 'space-x-4' : 'space-x-2',
          )}
        >
          <Avatar className={cn('h-8 w-8', className)}>
            <AvatarImage src={user.image ?? undefined} className={cn()} />
            <AvatarFallback className={cn('', avatarWidth)}>
              <Link href={`/members/${user.name}`} className={cn('text-sm')}>
                {user.name?.slice(0, 2).toUpperCase()}
              </Link>
              {/* <Icons.user /> */}
            </AvatarFallback>
          </Avatar>
          <div>
            <p
              className={
                (cn('md:text-md lg:text-md font-medium leading-none'),
                showUserName ? 'space-x-4' : 'space-x-2')
              }
            >
              <Link href={`/members/${user.name}`} className={cn('text-sm')}>
                {user.name}
              </Link>
            </p>
            {showUserName && (
              <p className="md:text-md lg:text-md text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>
      </div>
      {/* </CardContent> */}
    </Card>
  )
}
