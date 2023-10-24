import { FilmCardList } from '@/components/film-card-list'
import { UserFilmListDisplay } from '@/components/film-user-card-list'
import { buttonVariants } from '@/components/ui/button'
import { authOptions } from '@/lib/auth'
import { getCurrentUser } from '@/lib/session'
import { cn } from '@/lib/utils/utils'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import listModel from '@/models/lists'
import { Icons } from '@/components/icons'
import { handleSlug } from '@/lib/utils/slugify'

export const metadata = {
  title: 'Lists Page',
  description: 'Your lists of films.',
}

export default async function UserListsPage() {
  const { user } = await getCurrentUser()

  if (!user) {
    notFound()
  }

  const userLists = await listModel.getAllByUserId(user.id)

  console.log('userList', userLists)

  return (
    <>
      <Link
        href="/list/new"
        className={cn(
          'w-max justify-self-center',
          buttonVariants({ variant: 'default' }),
        )}
      >
        Start a new list
      </Link>

      <section className="grid gap-2">
        {/* <h2>My awesome list</h2> */}
        {/* <FilmCardList
          // limit={12}
          columnsCount={12}
          aspectRatio="portrait"
          width={92}
          movieImageWidth="w92"
          isSlider={true}
          isSnapped={true}
        /> */}
        {userLists?.length &&
          userLists.map((list) => {
            return (
              <div className="flex gap-4">
                <UserFilmListDisplay
                  movieImageWidth="w92"
                  aspectRatio="portrait"
                  columnsCount={4}
                  width={92}
                  limit={4}
                  filmList={list}
                />
                <Link
                  href={`/me/list/${handleSlug(list.title)?.slug}/edit/?id=${
                    list.id
                  }`}
                >
                  <Icons.pencil className="h-6 w-6" />
                </Link>
              </div>
            )
          })}
      </section>
      <section className="grid gap-2">
        <h2>My list for lovers</h2>
        <FilmCardList
          // limit={12}
          columnsCount={12}
          aspectRatio="portrait"
          width={92}
          movieImageWidth="w92"
          isSlider={true}
          isSnapped={true}
        />
      </section>
      <section className="grid gap-2">
        <h2>Horror films</h2>
        <FilmCardList
          // limit={12}
          columnsCount={12}
          aspectRatio="portrait"
          width={92}
          movieImageWidth="w92"
          isSlider={true}
          isSnapped={true}
        />
      </section>
    </>
  )
}
