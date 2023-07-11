import type { Request, Response } from 'express'

// import { UsersModel } from '@/models/user.js'
import UsersModel from '@/users/models/users'

import { deleteFile } from '@/lib/utils.js'
import { UPLOADS_DIRECTORY } from '@/server.js'
import UsersService from '@/users/services/users-service'

export const uploadFiles = async (req: Request, res: Response) => {
  console.log('Upload FILES')
  console.log(req.file)

  if (req.file == undefined) {
    return res.status(400).json({ error: { message: `You must select a file.` } })
  }

  // const userId = req.params.id
  const userId = '1'

  if (Number.isNaN(userId)) {
    return res.status(400).json({
      error: `Invalid parameter type! \`id\` must be of type number, received ${JSON.stringify(
        req.params.id
      )}`,
    })
  }
  const [results, userInfos] = await UsersService.getById(userId).catch((error) => {
    console.log(error)
  })
  const user = results[0]

  if (user.avatar_filename) {
    // console.log('Delete file')
    await deleteFile(`${UPLOADS_DIRECTORY}${user.avatar_filename}`)
      .catch((error) => {
        console.log(error)
      })
  }

  UsersService.patchById(userId, {
    avatar_filename: req.file.filename,
  }).then(() => {
    return res.status(200).json({ message: 'Avatar successfully uploaded', user: { ...user, avatar_filename: req.file?.filename } })
  }).catch((error) => {
    console.log(error)
    return res.status(400).json({
      error: {
        message: `Error when trying to upload images: ${error}`
      }
    })
  })
}
