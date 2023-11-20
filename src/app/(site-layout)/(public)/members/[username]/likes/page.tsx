import { Separator } from '@/components/ui/separator'
import { db } from '@/lib/db'
import { MembersSidebarNav } from '@/app/(site-layout)/(public)/members/components/members-sidebar-nav'
import { membersNavConfig } from '@/config/members'
import { MemberInfos } from '@/app/(site-layout)/(public)/members/components/member-infos'

export const metadata = {
  title: 'Member Films Likes Page',
  description: 'Find all the list of films of a particular member.',
}

export type MemberFilmLikesPageProps = {
  params: { username: string }
}

export default async function MemberFilmLikesPage({
  params,
}: MemberFilmLikesPageProps) {
  console.log('PARAMS:', params)

  const userWithLikes = await db.query.user.findFirst({
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

  if (!userWithLikes) {
    return <div>No lists found</div>
  }

  return (
    <>
      <div className="space-y-6 pb-16">
        <div className="space-y-0.5">
          <MemberInfos
            user={userWithLikes}
            showUserName={false}
            avatarWidth="h-14 w-14"
            className="h-16 w-16"
          />
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 md:flex-row md:space-x-12 md:space-y-0">
          <aside className="hidden md:block md:w-1/5">
            <MembersSidebarNav
              member={userWithLikes}
              items={membersNavConfig.mainNav}
            />
          </aside>
          <div className="grid flex-1 gap-8 md:max-w-2xl">
            <h1 className="text-center text-4xl">
              {userWithLikes.name.charAt(0).toUpperCase() +
                userWithLikes.name.slice(1)}{' '}
              Likes
            </h1>
            {userWithLikes.reviews.map((review) => (
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
