import { MovieMenubar } from '@/components/film-menubar'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { MovieInfosPopover } from '@/components/user-movie-infos-popover'
import { SearchMovie } from '@/lib/tmdb/types/tmdb-api'

export function FilmCard({ film }: { film: SearchMovie }) {
  return (
    <Card className="grid">
      <CardHeader>
        <CardTitle className="text-lg">{JSON.stringify(film.title)}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="text-sm">
        {JSON.stringify(film.overview?.slice(0, 100))}
      </CardContent>
      <CardFooter></CardFooter>
      {/* <MovieMenubar className="absolute bottom-0" /> */}
      <MovieInfosPopover />
    </Card>
  )
}
