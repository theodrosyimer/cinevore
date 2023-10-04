import { ChevronDownIcon } from "@radix-ui/react-icons"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { SelectUser } from "@/types/db"

interface UserInfos {
  user: SelectUser
}

export function UserInfos(/* { user }: UserInfos */) {
  return (
    <Card className="p-4 xs:w-auto w-60 border-0">
      {/* <CardHeader>
        <CardTitle>Team Members</CardTitle>
        <CardDescription>
          Invite your team members to collaborate.
        </CardDescription>
      </CardHeader> */}
      {/* <CardContent className="grid gap-6"> */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center justify-between space-x-4">
          <Avatar className="">
            {/* <AvatarImage src={user.image ?? undefined} /> */}
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">Sofia Davis</p>
            <p className="text-sm text-muted-foreground">m@example.com</p>
          </div>
        </div>
      </div>
      {/* </CardContent> */}
    </Card>
  )
}
