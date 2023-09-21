// import { PermissionFlag } from "@/core/middlewares/permissionflag-enum"
import { InferInsertModel, InferSelectModel, getTableColumns } from "drizzle-orm"
import { accounts, comment, movie, movieLike, movieList, follower, review, reviewLike, user, verificationTokens } from "@/drizzle/schema"


export type NewUser = InferInsertModel<typeof user>
export type SelectUser = InferSelectModel<typeof user>
export type Role = Pick<SelectUser, "role">

export type NewFollower = InferInsertModel<typeof follower>
export type SelectFollower = InferSelectModel<typeof follower>

export type NewMovie = InferInsertModel<typeof movie>
export type SelectMovie = InferSelectModel<typeof movie>
export type NewMovieList = InferInsertModel<typeof movieList>
export type SelectMovieList = InferSelectModel<typeof movieList>

export type NewFilmLike = InferInsertModel<typeof movieLike>
export type SelectFilmLike = InferSelectModel<typeof movieLike>

export type NewComment = InferInsertModel<typeof comment>
export type SelectComment = InferSelectModel<typeof comment>

export type NewReviewLike = InferInsertModel<typeof reviewLike>
export type SelectReviewLike = InferSelectModel<typeof reviewLike>

export type NewReview = InferInsertModel<typeof review>
export type SelectReview = InferSelectModel<typeof review>

// NextAuth
export type NewAccount = InferInsertModel<typeof accounts>
export type SelectAccount = InferSelectModel<typeof accounts>
export type NewVerificationTokens = InferInsertModel<typeof verificationTokens>
export type SelectVerificationTokens = InferSelectModel<typeof verificationTokens>

