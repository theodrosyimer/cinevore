import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { MovieCast } from '@/lib/tmdb/types/tmdb-api-movie-details'
import { cn } from '@/lib/utils/utils'
import Link from 'next/link'

export function CastTooltip({ cast }: { cast: MovieCast }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant="secondary"
            className="mr-2 space-x-1 space-y-1 rounded-md hover:bg-secondary/60"
            key={cast.id}
          >
            <Link
              href={`/job/actor/${encodeURI(cast.name)}?id=${cast.id}`}
              className={cn(
                'rounded-md text-sm font-medium text-foreground transition-colors sm:text-xs',
              )}
            >
              {cast.name}
            </Link>
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{cast.character}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
