import type Express from 'express'

export interface TypedRequestBody<T> extends Express.Request {
  body: T
}

import { Query } from 'express-serve-static-core'

export interface TypedRequestQuery<T extends Query> extends Express.Request {
  query: T
}

export interface TypedRequest<U, T extends Query> extends Express.Request {
  body: U,
  query: T
}
