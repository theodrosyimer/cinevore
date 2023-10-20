import { Members } from '@/app/(site-layout)/(public)/members/members'
import { MemberReviews } from '@/components/member-reviews'
import { MembersSidebarNav } from '@/components/members-sidebar-nav'
import { UserInfos } from '@/components/user-infos'
import { membersNavConfig } from '@/config/members'
import { db } from '@/lib/db'
import { Separator } from '@radix-ui/react-dropdown-menu'

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
  // console.log('PARAMS:', params)

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
  console.log('USER LISTS:', JSON.stringify(userLists, null, 2))

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
      {/* <div className="space-y-6 pb-16">
        <div className="grid grid-cols-[_1fr,auto]">
          <div className="space-y-0.5">
            <UserInfos
              user={userLists}
              showUserName={false}
              avatarWidth="h-14 w-14"
              className="h-16 w-16 text-lg font-bold"
            />
          </div>
          <div>Test</div>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 md:flex-row md:space-x-12 md:space-y-0">
          <aside className="hidden md:block md:w-1/5">
            <MembersSidebarNav
              member={userLists}
              items={membersNavConfig.mainNav}
            />
          </aside>
          <div className="grid flex-1 gap-8 md:max-w-2xl">
            <MemberReviews user={userLists} />
          </div>
        </div>
      </div> */}
    </>
  )
}
