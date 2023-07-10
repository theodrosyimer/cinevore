import { response } from "express"

export function hasNullValue(array: any[]) {
  return array.some(prop => prop == null)
}

export function sendErrorResponse(statusCode: number, message: string) {
  return response.status(statusCode).json({ error: { statusCode, message } })
}
