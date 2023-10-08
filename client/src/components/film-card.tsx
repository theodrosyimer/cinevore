'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Movie } from "@/lib/tmdb/types/types"

export function FilmCard({ film }: { film: Movie }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{JSON.stringify(film.title)}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="text-sm">{JSON.stringify(film.overview)}</CardContent>
      <CardFooter></CardFooter>
    </Card>
  )
}
