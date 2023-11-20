import { AvatarProps } from '@radix-ui/react-avatar'

import { Icons } from '@/components/icon/icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SelectUser } from '@/types/db'
import { cn } from '@/lib/utils/utils'

interface UserAvatarProps extends AvatarProps {
  user: Pick<SelectUser, 'image' | 'name'>
  className?: string
  iconSize?: string
}

export function UserAvatar({
  user,
  className,
  iconSize,
  ...props
}: UserAvatarProps) {
  return (
    <Avatar {...props} className={cn('', className)}>
      <AvatarImage alt="User Picture" src={user.image ?? undefined} />
      <AvatarFallback>
        <span className="sr-only">{user.name ?? undefined}</span>
        <Icons.user className={cn('h-4 w-4', iconSize)} />
      </AvatarFallback>
    </Avatar>
  )
}
