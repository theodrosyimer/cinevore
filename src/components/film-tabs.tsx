import { CastTooltip } from '@/components/cast-tooltip'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MovieCredits } from '@/lib/tmdb/types/tmdb-api'
import { MovieGenre } from '@/lib/tmdb/types/tmdb-api-movie-details'
import { cn } from '@/lib/utils/utils'
import Link from 'next/link'

type MovieInfosTabsProps = {
  className?: string
  credits?: MovieCredits
  details?: Record<string, unknown>
  genres?: MovieGenre[]
  releases?: Record<string, unknown>
}
export function MovieInfosTabs({
  className,
  credits,
  details,
  genres,
  releases,
}: MovieInfosTabsProps) {
  return (
    <Tabs defaultValue="cast" className={cn('grid w-full', className)}>
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="cast">CAST</TabsTrigger>
        <TabsTrigger value="crew">CREW</TabsTrigger>
        <TabsTrigger value="details">DETAILS</TabsTrigger>
        <TabsTrigger value="genres">GENRES</TabsTrigger>
        <TabsTrigger value="releases">RELEASES</TabsTrigger>
      </TabsList>
      <TabsContent value="cast">
        <Card>
          <CardContent className="mt-4 space-y-1">
            {credits?.cast?.map((cast) => (
              <CastTooltip cast={cast} key={cast.id} />
            ))}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="crew">
        <Card>
          <CardContent className="mt-4 space-y-2">
            {credits?.crew?.map((crew) => (
              <div
                className="flex w-full items-center justify-between space-x-2"
                key={crew.id}
              >
                <div className="flex items-center space-x-2">
                  <Link
                    href={`/job/${crew.job}/${crew.name}`}
                    className="w-max text-sm font-semibold hover:underline"
                  >
                    {crew.name}
                  </Link>
                </div>

                <Separator className="shrink" />

                <div className="flex gap-2">
                  <Badge variant="secondary" className="w-max">
                    {crew.job}
                  </Badge>
                  <div className="w-max text-sm text-gray-500">
                    {crew.department}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent aria-disabled value="details">
        <Card>
          <CardHeader>
            <CardTitle></CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent className="space-y-2"></CardContent>
          <CardFooter></CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="genres">
        <Card>
          <CardHeader>
            <CardTitle></CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent className="space-y-2"></CardContent>
          <CardFooter></CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="releases">
        <Card>
          <CardHeader>
            <CardTitle></CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent className="space-y-2"></CardContent>
          <CardFooter></CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
