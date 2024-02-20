import { UserFilmListDisplay } from '@/components/film/film-user-card-list'
import { Icons } from '@/components/icon/icons'
import { buttonVariants } from '@/components/ui/button'
import { getCurrentUser } from '@/lib/session'
import { handleSlug } from '@/lib/utils/slugify'
import { cn } from '@/lib/utils/utils'
import listModel from '@/models/lists'
import Link from 'next/link'
import { notFound } from 'next/navigation'

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

  // console.log('userList', userLists)

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

      <section className="grid grid-cols-2 gap-2">
        {userLists?.length &&
          userLists.map((list, index) => {
            return (
              <article key={index} className="flex gap-4">
                <Link href={`/me/list/${handleSlug(list.title)}?id=${list.id}`}>
                  <UserFilmListDisplay
                    movieImageWidth="w92"
                    aspectRatio="portrait"
                    columnsCount={4}
                    width={92}
                    limit={4}
                    filmList={list}
                    hasInfos={false}
                  />
                </Link>
                <Link
                  href={`/me/list/${handleSlug(list.title)}/edit/?id=${
                    list.id
                  }`}
                >
                  <Icons.pencil className="h-5 w-5" />
                </Link>
              </article>
            )
          })}
      </section>
    </>
  )
}
