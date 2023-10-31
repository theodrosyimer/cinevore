import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { UserMovieActions } from '@/components/user-movie-infos'

export function MovieInfosPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Icons.MoreHorizontal />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <UserMovieActions />
      </PopoverContent>
    </Popover>
  )
}
