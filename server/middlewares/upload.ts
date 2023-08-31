import { Request } from 'express'
import multer, { FileFilterCallback } from 'multer'
import { UPLOADS_DIRECTORY } from '../server'

type DestinationCallback = (error: Error | null, destination: string) => void

type FileNameCallback = (error: Error | null, filename: string) => void

export const storage = multer.diskStorage({
  destination: (
    request: Request,
    file: Express.Multer.File,
    callback: DestinationCallback
  ): void => {
    callback(null, UPLOADS_DIRECTORY)
  },

  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: FileNameCallback
  ): void => {
    callback(null, `${Date.now()}-${file.originalname}`)
  }
})

export const fileFilter = (
  request: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
): void => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    callback(null, true)
  } else {
    callback(null, false)
  }
}

export const upload = multer({
  storage,
  fileFilter
})
