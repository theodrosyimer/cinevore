import { NextRequest } from "next/server"

export function getUserIdFromUrl(req: NextRequest) {
  return new URL(req.url).pathname.split('/').slice(3)[0]
}
