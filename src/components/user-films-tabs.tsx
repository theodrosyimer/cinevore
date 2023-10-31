import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UserFilmCard } from '@/components/user-film-card'
import { searchByID } from '@/lib/tmdb/src/tmdb'
import { cn } from '@/lib/utils/utils'
import { SelectMovieInfosToUser, SelectUser } from '@/types/db'

type MovieInfosTabsProps = {
  className?: string
  userMovies?: SelectUser & {
    movieInfosToUser: SelectMovieInfosToUser[]
  }
}
export function UserFilmsTabs({ className, userMovies }: MovieInfosTabsProps) {
  const watched = userMovies?.movieInfosToUser?.filter(
    (movie) => movie.watched === true,
  )
  const diary = userMovies?.movieInfosToUser
  const reviewed = userMovies?.movieInfosToUser?.filter(
    (movie) => movie.reviewed === true,
  )

  return (
    <Tabs defaultValue="watched" className={cn('grid w-full', className)}>
      <TabsList className="grid w-full grid-cols-3 sm:grid-cols-5 ">
        <TabsTrigger className="sm:text-md text-xs" value="watched">
          WATCHED
        </TabsTrigger>
        <TabsTrigger className="sm:text-md text-xs" value="diary">
          DIARY
        </TabsTrigger>
        <TabsTrigger className="sm:text-md text-xs" value="reviews">
          REVIEWS
        </TabsTrigger>
      </TabsList>
      <TabsContent value="watched">
        <Card>
          <CardContent className="mt-4 space-y-1">
            {watched?.map(async (movie) => {
              const film = await searchByID({
                id: movie.movieId.toString(),
                category: 'movie',
              })
              return (
                <UserFilmCard
                  movie={film}
                  key={film.id}
                  movieImageWidth="w185"
                  aspectRatio="portrait"
                />
              )
            })}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="diary">
        <Card>
          <CardContent className="mt-4 space-y-2">
            {diary?.map(async (movie) => {
              const film = await searchByID({
                id: movie.movieId.toString(),
                category: 'movie',
              })
              return (
                <UserFilmCard
                  movie={film}
                  key={film.id}
                  movieImageWidth="w185"
                  aspectRatio="portrait"
                />
              )
            })}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent aria-disabled value="reviews">
        <Card>
          <CardContent className="mt-4 space-y-2">
            {reviewed?.map(async (movie) => {
              const film = await searchByID({
                id: movie.movieId.toString(),
                category: 'movie',
              })

              return (
                <UserFilmCard
                  movie={film}
                  key={film.id}
                  movieImageWidth="w185"
                  aspectRatio="portrait"
                />
              )
            })}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
