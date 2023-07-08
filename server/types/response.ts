import type Express from 'express'

import { Send } from 'express-serve-static-core'

export interface TypedResponse<ResBody> extends Express.Response {
  json: Send<ResBody, this>
}
