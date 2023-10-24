import { SidebarNav } from '@/components/sidebar-nav'
import { Members } from '@/app/(site-layout)/(public)/members/members'
import { Separator } from '@/components/ui/separator'
import { UserInfos } from '@/components/user-infos'
import { userNavigationConfig } from '@/config/user-profile'
import { db } from '@/lib/db'
import { UserFilmListDisplay } from '@/components/film-user-card-list'
import { getAllUserListsAndWatchedFilmsAndLikesByUsername } from '@/lib/actions/admin/getUserListsAndReviewsWithCommentsAndLikes'
import { MemberFilmCardList } from '@/components/members-film-card-list'
import { membersNavConfig } from '@/config/members'
import { MembersSidebarNav } from '@/components/members-sidebar-nav'
import { MemberInfos } from '@/components/member-infos'

export const metadata = {
  title: 'Member Films Reviews Page',
  description: 'Find all the list of films of a particular member.',
}

export type MemberFilmsPageProps = {
  params: { username: string }
}

export default async function MemberFilmsPage({
  params,
}: MemberFilmsPageProps) {
  console.log('PARAMS:', params)

  // const userWithReviews = await db.query.user.findFirst({
  //   where: (user, { eq }) => eq(user.name, params.username),

  //   with: {
  //     movieInfosToUser: {
  //       with: {
  //         movie: true,
  //       },
  //     },
  //     reviews: true,
  //   },
  // })

  const userWithReviews =
    await getAllUserListsAndWatchedFilmsAndLikesByUsername(params.username)

  if (!userWithReviews) {
    return <div>No lists found</div>
  }
  // console.log('USER WITH REVIEWS:', JSON.stringify(userWithReviews, null, 2))

  return (
    <>
      <div className="space-y-6 pb-16">
        <div className="space-y-0.5">
          <MemberInfos
            user={userWithReviews}
            showUserName={false}
            avatarWidth="h-14 w-14"
            className="h-16 w-16"
          />
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
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
            {/* <MemberFilmCardList filmList={userWithReviews} /> */}
            {userWithReviews.reviews.map((review) => (
              <div key={review.id}>
                <h2>Review ID: {review.id}</h2>
                <p>{review.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
