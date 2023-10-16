import { FilmCard } from '@/components/film-card'
import { UserInfos } from '@/components/user-infos'
import { getImageFormatSize } from '@/lib/tmdb/src/utils'
import { MovieDetails } from '@/lib/tmdb/types/tmdb-api'
import {
  SelectComment,
  SelectLike,
  SelectMovieReview,
  SelectUser,
} from '@/types/db'

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
    <article className="mb-8 flex gap-6">
      <FilmCard
        aspectRatio="portrait"
        // @ts-ignore
        width={imageWidth}
        // @ts-ignore
        movieImageWidth={getImageFormatSize('poster_sizes', 'w92')}
        movie={film}
      />
      <div className="grid">
        <h2 className="text-xl ">{film.title}</h2>
        <UserInfos user={review.user} avatarWidth={1} showUserName={false} />
        <p className="text-muted-foreground">{review.content}</p>
        <p>{likesCount} likes</p>
        {/* {review.commentsToMovieReview.map(comment => comment?.comments?.content)} */}
      </div>
    </article>
  )
}
