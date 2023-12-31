export type DashboardFilmsPage = {}

import { DashboardHeader } from '@/app/(site-layout)/(protected)/_components/dashboard-header'
import { EmptyPlaceholder } from '@/app/(site-layout)/(protected)/admin/dashboard/_components/empty-placeholder'
import { FilmCardDisplay } from '@/components/film/film-user-card'
import { DashboardShell } from '@/app/(site-layout)/(protected)/_components/shell'
import { user } from '@/db/schema/planetscale'
import { db } from '@/db'
import { desc } from 'drizzle-orm'
import { UserCreateButton } from '../_components/admin-create-user-button'
import { AddFilmButton } from './_components/admin-add-films'

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
