import { Icons } from '@/components/icons'
import LikeIcon from '@/components/like-icon'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils/utils'

export function UserMovieActions({ ...className }: { className?: string }) {
  return (
    <article
      className={cn(
        'hidden h-max rounded-md bg-secondary p-4 lg:grid',
        className,
      )}
    >
      <div className="flex justify-evenly">
        <div className="grid  place-items-center">
          {/* <Icons.like className="fill-muted" /> */}
          <LikeIcon />
          <Label className="text-sm text-muted-foreground">Watch</Label>
          {/* <Checkbox /> */}
        </div>
        <div className="grid  place-items-center">
          <Icons.notWatched className="fill-muted" />
          <Label className="text-sm text-muted-foreground">Like</Label>
        </div>
        <div className="grid  place-items-center">
          <Icons.listVideo className="fill-muted" />
          <Label className="text-sm text-muted-foreground">WatchList</Label>
        </div>
      </div>
      <div className="my-4 divide-y divide-border rounded-md border bg-primary-foreground"></div>
      <div className="flex justify-evenly">
        <Icons.starHalf className="hidden hover:block hover:stroke-red-600" />
        <Icons.star />
        <Icons.star />
        <Icons.star />
        <Icons.star />
        <Icons.star />
      </div>
      {/* <div className="my-4 divide-y divide-border rounded-md border"></div>
      <div className="flex justify-evenly">
        <FilmRatingStars />
      </div> */}
    </article>
  )
}
