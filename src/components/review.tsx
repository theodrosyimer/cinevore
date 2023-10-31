'use client'

import { FilmCard } from '@/components/film-card'
import { MemberInfos } from '@/components/member-infos'
import { getImageFormatSize } from '@/lib/tmdb/src/utils'
import { MovieDetails } from '@/lib/tmdb/types/tmdb-api'
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

export function Review({
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
    <article className="flex gap-6">
      <FilmCard
        aspectRatio="portrait"
        // @ts-ignore
        width={imageWidth}
        // @ts-ignore
        movieImageWidth={getImageFormatSize('poster_sizes', 'w92')}
        movie={film}
        hasMenu={false}
      />
      <div className="grid">
        <Link
          href={`/members/${review.user.name}/reviews/${review.id}`}
          className="text-xl "
        >
          {film.title}
        </Link>
        <MemberInfos user={review.user} showUserName={false} />
        <p className="text-muted-foreground">{review.content}</p>
        <p>{likesCount} likes</p>
        {/* {review.commentsToMovieReview.map(comment => comment?.comments?.content)} */}
      </div>
    </article>
  )
}
