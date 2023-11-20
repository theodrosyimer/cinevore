import { Icons } from '@/components/icon/icons'
import { MemberFilmListDisplay } from '@/app/(site-layout)/(public)/members/components/member-film-card-list'
import { buttonVariants } from '@/components/ui/button'
import { getCurrentUser } from '@/lib/session'
import { handleSlug } from '@/lib/utils/slugify'
import { cn } from '@/lib/utils/utils'
import listsModel from '@/models/lists'
import Link from 'next/link'
import { notFound } from 'next/navigation'

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
  const { user } = await getCurrentUser()

  if (!user) {
    notFound()
  }
  const userPublicLists = await listsModel.getAllByUserName(params.username)

  if (!userPublicLists) {
    return <div>No lists found</div>
  }

  return (
    <>
      <div className="flex items-center justify-between justify-items-center">
        <h2 className="text-md mb-2 uppercase text-muted-foreground">Lists</h2>
        <Link
          href={`${process.env.NEXT_PUBLIC_APP_URL}/reviews?popular=all-time`}
          className={cn(
            'text-sm uppercase',
            buttonVariants({
              variant: 'link',
              className: 'pr-0 text-muted-foreground/50',
            }),
          )}
        >
          <Icons.watched size={24} />
        </Link>
      </div>
      <div className="mb-4 divide-y divide-border rounded-md border"></div>
      {userPublicLists.lists.map((list, index) => (
        <>
          <article key={index} className="flex gap-4">
            <Link
              href={`/members/${userPublicLists.name}/list/${handleSlug(
                list.title,
              )?.slug}?id=${list.id}`}
            >
              <MemberFilmListDisplay
                movieImageWidth="w92"
                aspectRatio="portrait"
                columnsCount={4}
                width={92}
                limit={4}
                filmList={list}
                hasInfos={true}
              />
            </Link>
          </article>
          <div className="my-4 divide-y divide-border rounded-md border"></div>
        </>
      ))}
    </>
  )
}
