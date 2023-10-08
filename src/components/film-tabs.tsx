import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { globalConfig } from "@/lib/tmdb/src/tmdb"
import { MovieCredits } from "@/lib/tmdb/types/tmdb-api"
import { MovieGenre } from "@/lib/tmdb/types/tmdb-api-movie-details"
import { cn } from "@/lib/utils"
import Link from "next/link"

export function MovieInfosTabs({ className, credits, details, genres, releases }: { className?: string, credits?: MovieCredits, details?: Record<string, unknown>, genres?: MovieGenre[], releases?: Record<string, unknown> }) {
  return (
    <Tabs defaultValue="cast" className={cn("w-full", className)}>
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="cast">CAST</TabsTrigger>
        <TabsTrigger value="crew">CREW</TabsTrigger>
        <TabsTrigger value="details">DETAILS</TabsTrigger>
        <TabsTrigger value="genres">GENRES</TabsTrigger>
        <TabsTrigger value="releases">RELEASES</TabsTrigger>
      </TabsList>
      <TabsContent value="cast">
        <Card>
          <CardHeader>
            <CardTitle></CardTitle>
            <CardDescription>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {credits?.cast?.map((cast) => (
              <span className="space-y-1 space-x-1 mr-2" key={cast.id}>
                <Link
                  href={`${process.env.NEXT_PUBLIC_APP_URL}/job/actor/${cast.id}`}
                  className="text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm"
                >
                  {cast.name}
                </Link>
              </span>
            ))}
          </CardContent>
          <CardFooter>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="crew">
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
          <CardFooter>
          </CardFooter>
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
          <CardFooter>
          </CardFooter>
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
          <CardFooter>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs >
  )
}
