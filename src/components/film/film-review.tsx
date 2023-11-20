import { Icons } from '@/components/icon/icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { buttonVariants } from '@/components/ui/button'
import { UserAvatar } from '@/components/user-avatar'
import { MovieDetails } from '@/lib/tmdb/types/tmdb-api'
import { cn } from '@/lib/utils/utils'
import {
  SelectComment,
  SelectLike,
  SelectMovieReview,
  SelectUser,
} from '@/types/db'
import Link from 'next/link'

export interface ReviewAndCommentsProps extends SelectMovieReview {
  user: SelectUser
  comments: SelectComment[]
  likes: SelectLike[]
} /*  & { film: MovieDetails } */

export function FilmReview({
  review,
  film,
  imageWidth = 92,
}: {
  review: ReviewAndCommentsProps
  film: MovieDetails
  imageWidth?: number
}) {
  const likesCount = review.likes.length

  // console.log('FILM', film, review.user)

  return (
    <article className="grid grid-cols-[min-content,_1fr] gap-4">
      <UserAvatar user={review.user} />
      <Avatar className={cn('col-auto lg:h-10 lg:w-10')}>
        <AvatarImage src={review.user.image ?? undefined} className="" />
        <AvatarFallback className="">
          <span className="text-sm">
            {review.user.name?.slice(0, 2).toUpperCase()}
          </span>
          {/* <Icons.user /> */}
        </AvatarFallback>
      </Avatar>
      <div className="">
        <p className="text-xs text-muted-foreground">
          Review by{' '}
          <Link
            href={`/members/${review.user.name}?id=${review.user.id}`}
            className={cn(buttonVariants({ variant: 'link' }), 'px-0')}
          >
            {review.user.name}
          </Link>
        </p>
        <p className="text-muted-foreground">{review.content}</p>
        <p className="flex items-baseline space-x-1">
          <Icons.like size={13} />{' '}
          <span className="font-serif text-base">{likesCount} likes</span>
        </p>
        {/* {review.commentsToMovieReview.map(comment => comment?.comments?.content)} */}
      </div>
    </article>
  )
}
