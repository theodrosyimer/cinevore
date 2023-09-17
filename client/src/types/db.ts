// import { PermissionFlag } from "@/core/middlewares/permissionflag-enum"
import { InferInsertModel, InferSelectModel, getTableColumns } from "drizzle-orm"
import { accounts, comment, film, filmLike, filmList, review, reviewLike, user, verificationTokens } from "@/drizzle/schema"


export type NewUser = InferInsertModel<typeof user>
export type SelectUser = InferSelectModel<typeof user>
export type Role = Pick<SelectUser, "role">

export type NewFilm = InferInsertModel<typeof film>
export type SelectFilm = InferSelectModel<typeof film>

export type NewFilmList = InferInsertModel<typeof filmList>
export type SelectFilmList = InferSelectModel<typeof filmList>

export type NewFilmLike = InferInsertModel<typeof filmLike>
export type SelectFilmLike = InferSelectModel<typeof filmLike>

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

