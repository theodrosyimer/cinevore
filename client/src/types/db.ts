// import { PermissionFlag } from "@/core/middlewares/permissionflag-enum"
import { InferInsertModel, InferSelectModel, getTableColumns } from "drizzle-orm"
import { accounts, commentToMovieList, movie, likeToMovieList, movieList, follower, movieReview, likeToMovieReview, user, verificationTokens, commentToMovieReview, watchlist } from "@/drizzle/schema"
import * as schema from '@/drizzle/schema'

export type DbSchema = typeof schema
export type TableName = keyof DbSchema

// export type TableColumns = DbSchema[keyof DbSchema]

// export type NewDbEntry = `New${Capitalize<TableName>}`
// export type SelectDbEntry = `Select${Capitalize<TableName>}`

// let t: SelectDbEntry = 'SelectAccounts'

export type TableStatus = {
  Name: string
  Engine: 'InnoDB' | (string & {})
  Version: number
  Row_format: 'Dynamic' | (string & {})
  Rows: number
  Avg_row_length: number
  Data_length: number
  Max_data_length: number
  Index_length: number
  Data_free: number
  Auto_increment: null
  Create_time: string
  Update_time: string
  Check_time: null
  Collation: 'utf8_general_ci' | (string & {})
  Checksum: null
  Create_options: string
  Comment: string
}

export type NewUser = InferInsertModel<typeof user>
export type SelectUser = InferSelectModel<typeof user>
export type Role = Pick<SelectUser, "role">

export type NewFollower = InferInsertModel<typeof follower>
export type SelectFollower = InferSelectModel<typeof follower>

export type NewMovie = InferInsertModel<typeof movie>
export type SelectMovie = InferSelectModel<typeof movie>
export type NewMovieList = InferInsertModel<typeof movieList>
export type SelectMovieList = InferSelectModel<typeof movieList>

export type NewMovieLike = InferInsertModel<typeof likeToMovieList>
export type SelectMovieLike = InferSelectModel<typeof likeToMovieList>

export type NewComment = InferInsertModel<typeof commentToMovieList>
export type SelectComment = InferSelectModel<typeof commentToMovieList>

export type NewReviewLike = InferInsertModel<typeof likeToMovieReview>
export type SelectReviewLike = InferSelectModel<typeof likeToMovieReview>

export type NewMovieReview = InferInsertModel<typeof movieReview>
export type SelectMovieReview = InferSelectModel<typeof movieReview>

// NextAuth
export type NewAccount = InferInsertModel<typeof accounts>
export type SelectAccount = InferSelectModel<typeof accounts>
export type NewVerificationTokens = InferInsertModel<typeof verificationTokens>
export type SelectVerificationTokens = InferSelectModel<typeof verificationTokens>

