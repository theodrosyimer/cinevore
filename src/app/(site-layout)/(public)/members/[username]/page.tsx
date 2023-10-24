import { SidebarNav } from '@/components/sidebar-nav'
import { Members } from '@/app/(site-layout)/(public)/members/members'
import { Separator } from '@/components/ui/separator'
import { UserInfos } from '@/components/user-infos'
import { membersNavConfig } from '@/config/members'
import { userNavigationConfig } from '@/config/user-profile'
import { db } from '@/lib/db'
import { MembersSidebarNav } from '@/components/members-sidebar-nav'
import { MemberReviews } from '@/components/member-reviews'
import { MemberInfos } from '@/components/member-infos'

export const metadata = {
  title: 'Member Films Reviews Page',
  description: 'Find all the list of films of a particular member.',
}

export type MemberFilmReviewsPageProps = {
  params: { username: string }
}

export default async function MemberFilmReviewsPage({
  params,
}: MemberFilmReviewsPageProps) {
  console.log('PARAMS:', params)

  const userWithReviews = await db.query.user.findFirst({
    where: (user, { eq }) => eq(user.name, params.username),

    with: {
      // movies: {
      //   with: {
      //     movie: true,
      //   },
      // },
      reviews: true,
    },
  })

  if (!userWithReviews) {
    return <div>No lists found</div>
  }

  return (
    <>
      <div className="space-y-6 pb-16">
        <div className="grid grid-cols-[_1fr,auto]">
          <div className="space-y-0.5">
            <MemberInfos
              user={userWithReviews}
              showUserName={false}
              avatarWidth="h-14 w-14"
              className="h-16 w-16 text-lg font-bold"
            />
            {/* <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
            <p className="text-muted-foreground">
              Manage your account settings and set e-mail preferences.
            </p> */}
          </div>
          <div>Test</div>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 md:flex-row md:space-x-12 md:space-y-0">
          <aside className="hidden md:block md:w-1/5">
            <MembersSidebarNav
              member={userWithReviews}
              items={membersNavConfig.mainNav}
            />
          </aside>
          <div className="grid flex-1 gap-8 md:max-w-2xl">
            <MemberReviews user={userWithReviews} />
          </div>
        </div>
      </div>
    </>
  )
}
