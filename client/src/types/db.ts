// import { PermissionFlag } from "@/core/middlewares/permissionflag-enum"
import * as schema from '@/drizzle/schema'
import { InferInsertModel, InferSelectModel } from "drizzle-orm"

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

export type NewUser = InferInsertModel<typeof schema.user>
export type SelectUser = InferSelectModel<typeof schema.user>
export type Role = Pick<SelectUser, "role">

export type NewFollower = InferInsertModel<typeof schema.follower>
export type SelectFollower = InferSelectModel<typeof schema.follower>

export type NewMovie = InferInsertModel<typeof schema.movie>
export type SelectMovie = InferSelectModel<typeof schema.movie>
export type NewMovieList = InferInsertModel<typeof schema.movieList>
export type SelectMovieList = InferSelectModel<typeof schema.movieList>

export type NewMovieLike = InferInsertModel<typeof schema.likeToMovieList>
export type SelectMovieLike = InferSelectModel<typeof schema.likeToMovieList>

export type NewComment = InferInsertModel<typeof schema.commentToMovieList>
export type SelectComment = InferSelectModel<typeof schema.commentToMovieList>

export type NewReviewLike = InferInsertModel<typeof schema.likeToMovieReview>
export type SelectReviewLike = InferSelectModel<typeof schema.likeToMovieReview>

export type NewMovieReview = InferInsertModel<typeof schema.movieReview>
export type SelectMovieReview = InferSelectModel<typeof schema.movieReview>

// NextAuth
export type NewAccount = InferInsertModel<typeof schema.accounts>
export type SelectAccount = InferSelectModel<typeof schema.accounts>
export type NewVerificationTokens = InferInsertModel<typeof schema.verificationTokens>
export type SelectVerificationTokens = InferSelectModel<typeof schema.verificationTokens>

