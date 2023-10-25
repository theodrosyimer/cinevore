import { getUsers } from '@/app/(site-layout)/(public)/members/getUsers'
import { Icons } from '@/components/icons'
import { MemberAvatar } from '@/components/member-avatar'
import { UserAvatar } from '@/components/user-avatar'
import { getAllUsersListsAndWatchedFilmsAndLikes } from '@/lib/actions/admin/getUserListsAndReviewsWithCommentsAndLikes'
import { cn } from '@/lib/utils/utils'
import Link from 'next/link'
import React from 'react'

export async function Members() {
  // const users = await getUsers()
  const users = await getAllUsersListsAndWatchedFilmsAndLikes()

  return (
    <section className="grid">
      {users.length
        ? users.map((user) => {
            return (
              <React.Fragment key={user.id}>
                <article
                  className={cn(
                    'grid grid-cols-[_1.5fr,_0.7fr,_0.7fr,_0.7fr] items-baseline sm:grid-cols-[_2fr,_1fr,_1fr,_1fr]',
                  )}
                >
                  <div className="flex items-center gap-2">
                    <MemberAvatar
                      user={user}
                      className="h-8 w-8 md:h-12 md:w-12"
                    />
                    <div className="grid">
                      <Link
                        href={`/members/${user.name}?id=${user.id}`}
                        className="text-xs sm:text-base"
                      >
                        {user.name}
                      </Link>
                      <p className="text-muted-foreground/60">
                        <Link
                          href={`/members/${user.name}/reviews?id=${user.id}`}
                          className="text-xs sm:text-base"
                        >
                          {user.reviews.length} reviews
                        </Link>
                      </p>
                    </div>
                  </div>
                  <span className="flex items-center gap-2 text-muted-foreground/60">
                    <Icons.watched
                      className="h-[1em] w-[1em]"
                      color="green"
                      // size={16}
                    />
                    <Link href={`members/${user.name}/films?id=${user.id}`}>
                      {(user.movieInfosToUser.filter((movie) => movie.watched)
                        .length ?? 0) +
                        (user.movieInfosToUser.filter((movie) => movie.reviewed)
                          .length ?? 0)}
                    </Link>
                  </span>
                  <span className="flex items-center gap-2 text-muted-foreground/60">
                    <Icons.post
                      className="h-[1em] w-[1em]"
                      color="cyan"
                      // size={16}
                    />
                    <Link href={`members/${user.name}/lists?id=${user.id}`}>
                      {user.lists.length}
                    </Link>
                  </span>
                  <span className="flex items-center gap-2 text-muted-foreground/60 ">
                    <Icons.like
                      className="h-[1em] w-[1em]"
                      color="orange"
                      // size={16}
                    />
                    <Link href={`members/${user.name}/likes?id=${user.id}`}>
                      {user.movieInfosToUser.filter((movie) => movie.liked)
                        .length ?? 0}
                    </Link>
                  </span>
                </article>
                <div
                  key={user.id}
                  className="my-4 divide-y divide-border rounded-md border"
                ></div>
              </React.Fragment>
            )
          })
        : null}
    </section>
  )
}
