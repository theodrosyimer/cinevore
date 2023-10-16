import { Users } from '@/app/(site-layout)/(public)/members/user'
import { db } from '@/lib/db'

export const metadata = {
  title: 'Member Films Lists Page',
  description: 'Find all the list of films of a particular member.',
}

export type MemberFilmListsPageProps = {
  params: { username: string }
}

export default async function MemberFilmListsPage({
  params,
}: MemberFilmListsPageProps) {
  console.log('PARAMS:', params)

  const userLists = await db.query.user.findMany({
    where: (user, { eq }) => eq(user.name, params.username),

    with: {
      // movies: {
      //   with: {
      //     movie: true,
      //   },
      // },
      lists: true,
    },
  })

  if (!userLists.length) {
    return <div>No lists found</div>
  }

  return (
    <>
      <h1 className="text-center text-4xl">Member Film Lists Page</h1>
      {userLists.map((lists) =>
        lists.lists.map((list) => (
          <div key={list.id}>
            <h2>{list.title}</h2>
          </div>
        )),
      )}
    </>
  )
}
