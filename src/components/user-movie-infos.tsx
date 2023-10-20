import FilmRatingStars from '@/components/film-rating-stars'
import { Icons } from '@/components/icons'
import { Checkbox } from '@/components/ui/checkbox'
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
          <Icons.like className="fill-muted" />
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
        <Icons.starHalf className="hidden" />
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
