import * as schema from '@/schema'
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

export type NewMovie = InferInsertModel<typeof schema.movie>
export type SelectMovie = InferSelectModel<typeof schema.movie>
export type NewList = InferInsertModel<typeof schema.list>
export type SelectList = InferSelectModel<typeof schema.list>
export type NewMovieList = InferInsertModel<typeof schema.movieList>
export type SelectMovieList = InferSelectModel<typeof schema.movieList>

export type NewMovieLike = InferInsertModel<typeof schema.likeToMovieList>
export type SelectMovieLike = InferSelectModel<typeof schema.likeToMovieList>

export type NewComment = InferInsertModel<typeof schema.commentToMovieList>
export type SelectComment = InferSelectModel<typeof schema.commentToMovieList>

export type NewMovieReview = InferInsertModel<typeof schema.movieReview>
export type SelectMovieReview = InferSelectModel<typeof schema.movieReview>
export type NewReviewLike = InferInsertModel<typeof schema.likeToMovieReview>
export type SelectReviewLike = InferSelectModel<typeof schema.likeToMovieReview>
export type NewFollower = InferInsertModel<typeof schema.follower>
export type SelectFollower = InferSelectModel<typeof schema.follower>

// NextAuth
export type NewAccount = InferInsertModel<typeof schema.accounts>
export type SelectAccount = InferSelectModel<typeof schema.accounts>
export type NewSession = InferInsertModel<typeof schema.accounts>
export type SelectSession = InferSelectModel<typeof schema.accounts>
export type NewVerificationToken = InferInsertModel<typeof schema.verificationTokens>
export type SelectVerificationToken = InferSelectModel<typeof schema.verificationTokens>

