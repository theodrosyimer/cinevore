import { AvatarProps } from '@radix-ui/react-avatar';

import { Icons } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SelectUser } from '@/types/db';

interface UserAvatarProps extends AvatarProps {
  user: Pick<SelectUser, 'image' | 'name'>;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      <AvatarImage alt="User Picture" src={user.image ?? undefined} />
      <AvatarFallback>
        <span className="sr-only">{user.name ?? undefined}</span>
        <Icons.user className="h-4 w-4" />
      </AvatarFallback>
    </Avatar>
  );
}
