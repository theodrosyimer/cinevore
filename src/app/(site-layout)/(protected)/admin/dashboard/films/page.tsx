export type DashboardFilmsPage = {}

import { db } from '@/lib/db'
import { EmptyPlaceholder } from '@/components/empty-placeholder'
import { DashboardHeader } from '@/components/dashboard-header'
import { UserCreateButton } from '@/components/admin-create-user-button'
import { DashboardShell } from '@/components/shell'
import { desc } from 'drizzle-orm'
import { user } from '@/db/planetscale'
import { FilmCardDisplay } from '@/components/film-user-card'
import { AddFilmButton } from '@/components/admin-add-films'

export const metadata = {
  title: 'Dashboard',
}

export default async function DashboardFilmsPage({}: DashboardFilmsPage) {
  const movies = await db.query.movie.findMany({
    // where: eq(user.id, currentUser.id),
    // columns: {
    //   id: true,
    //   name: true,
    //   updatedAt: true,
    //   createdAt: true,
    // },
    orderBy: [desc(user.updatedAt)],
  })

  return (
    <DashboardShell>
      <DashboardHeader heading="Films" text="Add and manage films.">
        <AddFilmButton />
      </DashboardHeader>
      <div>
        {movies?.length ? (
          <div className="divide-y divide-border rounded-md border ">
            <div className="grid grid-cols-6 p-4">
              {movies.map((movie) => (
                // <UserItem key={user.id} user={user} />
                <FilmCardDisplay
                  key={movie.tmdbId}
                  movie={movie}
                  movieImageWidth="w185"
                  aspectRatio="portrait"
                  width={185}
                />
              ))}
            </div>
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="user" />
            <EmptyPlaceholder.Title>No users created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any users yet. Start adding users.
            </EmptyPlaceholder.Description>
            <UserCreateButton variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}
