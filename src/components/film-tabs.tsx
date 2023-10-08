import { CastTooltip } from '@/components/cast-tooltip';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { globalConfig } from '@/lib/tmdb/src/tmdb';
import { MovieCredits } from '@/lib/tmdb/types/tmdb-api';
import { MovieGenre } from '@/lib/tmdb/types/tmdb-api-movie-details';
import { cn, handleSlug, slugify } from '@/lib/utils';
import Link from 'next/link';

type MovieInfosTabsProps = {
  className?: string;
  credits?: MovieCredits;
  details?: Record<string, unknown>;
  genres?: MovieGenre[];
  releases?: Record<string, unknown>;
};
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
          <CardContent className="space-y-1 mt-4">
            {credits?.cast?.map((cast) => (
              <CastTooltip cast={cast} key={cast.id} />
            ))}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="crew">
        <Card>
          <CardContent className="space-y-2 mt-4">
            {credits?.crew?.map((crew) => (
              <div
                className="w-full flex items-center justify-between space-x-2"
                key={crew.id}
              >
                <div className="flex items-center space-x-2">
                  <Link
                    href={`job/person/${crew.id}`}
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
                  <div className="text-sm text-gray-500 w-max">
                    {crew.department}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="details">
        <Card>
          <CardHeader>
            <CardTitle></CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="genres">
        <Card>
          <CardHeader>
            <CardTitle></CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="releases">
        <Card>
          <CardHeader>
            <CardTitle></CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
