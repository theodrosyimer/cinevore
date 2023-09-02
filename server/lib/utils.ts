import { Response } from "express"
import { dirname, join } from "path"
import { fileURLToPath } from "url"
import { unlink } from 'fs/promises'


export function hasNullValue(array: any[]) {
  return array.some(prop => prop == null)
}

export function sendErrorResponse(response: Response, statusCode: number, message: string) {
  response.status(statusCode).json({ error: { statusCode, message } })
}

export function getDirname(importMetaUrl: string, ...rest: string[]) {
  if (importMetaUrl == null || !importMetaUrl.startsWith('file:'))
    throw new Error(`Expected a file url, received "${JSON.stringify(importMetaUrl)}"`)

  if (rest.length === 1 && Array.isArray(rest[0])) {
    return join(dirname(fileURLToPath(importMetaUrl)), ...rest[0])
  }

  return join(dirname(fileURLToPath(importMetaUrl)), ...rest)
}

export async function deleteFile(path: string) {
  await unlink(path)
  console.log(`${JSON.stringify(path)} is deleted.`)
}
