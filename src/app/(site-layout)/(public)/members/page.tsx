import { Members } from '@/app/(site-layout)/(public)/members/members'
import { MemberAvatar } from '@/app/(site-layout)/(public)/members/components/member-avatar'
import { buttonVariants } from '@/components/ui/button'
import { db } from '@/lib/db'
import { cn } from '@/lib/utils/utils'
import Link from 'next/link'

export const metadata = {
  title: 'Members Page',
  description: 'Find all members films here.'
}

export default async function MembersPage() {
  const users = await db.query.user.findMany({
    limit: 6,
  })

  return (
    <>
      <div className="w-full">
        <div className="mb-8 grid gap-6">
          <h1 className="text-center text-3xl text-muted-foreground">
            Film lovers, critics and friends — find popular members.
          </h1>
          <section className="grid w-full">
            <div className="flex items-center justify-between justify-items-center">
              <h2 className="text-md mb-2 uppercase text-muted-foreground/50">
                Popular this week
              </h2>
              <Link
                href={`${process.env.NEXT_PUBLIC_APP_URL}/members?popular=this-week`}
                className={cn(
                  'text-sm uppercase',
                  buttonVariants({
                    variant: 'link',
                    className: 'pr-0 text-muted-foreground/50',
                  }),
                )}
              >
                More
              </Link>
            </div>
            <div className="mb-4 divide-y divide-border rounded-md border"></div>
            <div className="grid grid-flow-col grid-cols-[6] gap-4 overflow-x-auto overscroll-x-contain">
              {users.map((user) => (
                <div key={user.id} className={cn('grid gap-2')}>
                  <Link
                    href={`/members/${encodeURI(user.name)}`}
                    className="font-serif"
                  >
                    <MemberAvatar
                      key={user.id}
                      user={user}
                      className="h-[8.5rem] w-[8.5rem]"
                      iconSize="h-8.5 w-8.5"
                    />
                  </Link>
                  <Link
                    href={`/members/${encodeURI(user.name)}`}
                    className="font-serif text-xs md:text-sm"
                  >
                    {user.name}
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </div>
        <div className="mb-4 mt-4 divide-y divide-border rounded-md border"></div>
        <Members />
      </div>
    </>
  )
}
