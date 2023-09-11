'use client'

import { Film } from "@/hooks/useFilm-zod"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function FilmCard({ film }: { film: Film }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{JSON.stringify(film.title)}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="text-sm">{JSON.stringify(film.opening_crawl)}</CardContent>
      <CardFooter></CardFooter>
    </Card>
  )
}
