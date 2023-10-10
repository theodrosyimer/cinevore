import { MovieArtwork } from "@/components/film-artwork"
import { UserInfos } from "@/components/user-infos"
import { user } from "@/db/planetscale"
import { db } from "@/lib/db"
import { searchByID } from "@/lib/tmdb/src/tmdb"
import { getImageFormatSize } from "@/lib/tmdb/src/utils"
import { MovieDetails } from "@/lib/tmdb/types/tmdb-api"
import { SelectComment, SelectCommentToMovieReview, SelectLike, SelectLikeToMovieReview, SelectMovieReview, SelectUser } from "@/types/db"
import { useState } from "react"

export type ReviewAndCommentsProps = SelectMovieReview & {
  user: SelectUser
  commentsToMovieReview: (SelectCommentToMovieReview & {
    comments: SelectComment[]
  })[]
  likesToMovieReview: (SelectLikeToMovieReview & {
    likes: SelectLike[]
  })[]
} & { film: MovieDetails }
export function Review({ review, film }: { review: ReviewAndCommentsProps }) {
  const likesCount = review.likesToMovieReview.length

  console.log('FILM', film, review.user)

  return (
    <article className='flex gap-6 mb-8'>
      <MovieArtwork aspectRatio='portrait' height={50} width={getImageFormatSize("poster_sizes", "w92")} movie={film} movieId={film.id.toString()} />
      <div className="grid">
        <h2 className='text-xl '>{film.title}</h2>
        <UserInfos user={review.user} />
        <p>{review.content}</p>
        <p>{likesCount} likes</p>
        {/* {review.commentsToMovieReview.map(comment => comment?.comments?.content)} */}
      </div>
    </article>
  )
}
