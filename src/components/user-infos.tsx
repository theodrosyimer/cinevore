import { ChevronDownIcon } from '@radix-ui/react-icons';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { SelectUser } from '@/types/db';
import { User } from 'next-auth';

interface UserInfos {
  user: User;
}

export function UserInfos({ user }: UserInfos) {
  return (
    <Card className="xs:w-auto w-60 border-0">
      {/* <CardHeader>
        <CardTitle>Team Members</CardTitle>
        <CardDescription>
          Invite your team members to collaborate.
        </CardDescription>
      </CardHeader> */}
      {/* <CardContent className="grid gap-6"> */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center justify-between space-x-4">
          <Avatar className="lg:h-14 lg:w-14">
            <AvatarImage src={user.image ?? undefined} />
            <AvatarFallback>
              {user.name?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="md:text-md lg:text-md font-medium leading-none">
              {user.name}
            </p>
            <p className="md:text-md lg:text-md text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>
      </div>
      {/* </CardContent> */}
    </Card>
  );
}
