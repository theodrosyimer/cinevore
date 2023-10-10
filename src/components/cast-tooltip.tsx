import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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
            className="hover:bg-secondary/60 space-y-1 space-x-1 mr-2 rounded-md"
            key={cast.id}
          >
            <Link
              href={`${process.env.NEXT_PUBLIC_APP_URL}/job/actor/${cast.id}`}
              className={cn(
                'text-foreground text-sm font-medium transition-colors sm:text-xs rounded-md'
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
