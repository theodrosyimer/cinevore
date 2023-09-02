import type Express from 'express'
import { Query, Send } from 'express-serve-static-core'

interface TypedRequestBody<TBody> extends Express.Request {
  body: TBody
}


interface TypedRequestQuery<TQuery extends Query> extends Express.Request {
  query: TQuery
}

interface TypedRequest<TBody, TQuery extends Query> extends Express.Request {
  body: TBody,
  query: TQuery
}


export interface TypedResponse<ResBody> extends Express.Response {
  json: Send<ResBody, this>
}
