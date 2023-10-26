import { UserFilmListDisplay } from '@/components/film-user-card-list'
import { Icons } from '@/components/icons'
import { NewListForm } from '@/components/list-create'
import { getCurrentUser } from '@/lib/session'
import { handleSlug } from '@/lib/utils/slugify'
import listsModel from '@/models/lists'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { list } from 'postcss'

export const metadata = {
  title: 'User List Page',
  description: 'Your list of films.',
}

export default async function UserListPage({
  params,
  searchParams,
}: {
  params: { listname: string }
  searchParams: { id: string }
}) {
  const { user } = await getCurrentUser()
  if (!user) {
    return notFound()
  }

  const userList = await listsModel.getById(+searchParams.id)
  // console.log('userList', userList)

  if (!user) {
    return notFound()
  }

  return (
    <section className="-mt-8 grid w-full space-y-6 md:mt-0">
      <div className="grid place-items-start space-y-2">
        {/* <Icons.logo className="mx-auto h-6 w-6" /> */}
        <h1 className="text-2xl font-semibold tracking-tight">
          {userList?.title ?? 'No title'}
        </h1>
        {/* <p className="text-sm text-muted-foreground">Add a new list</p> */}
      </div>
      {userList ? (
        <div className="flex gap-4">
          <Link
            href={`/me/list/${handleSlug(userList.title)?.slug}?id=${
              userList.id
            }`}
          >
            <UserFilmListDisplay
              movieImageWidth="w92"
              aspectRatio="portrait"
              columnsCount={4}
              width={92}
              limit={4}
              filmList={userList}
              hasInfos={false}
              hasTitle={false}
            />
          </Link>
          <Link
            href={`/me/list/${handleSlug(userList.title)?.slug}/edit/?id=${
              userList.id
            }`}
          >
            <Icons.pencil className="h-5 w-5" />
          </Link>
        </div>
      ) : null}
      <p className="">{userList?.description}</p>
    </section>
  )
}
