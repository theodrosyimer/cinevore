// import type { NextRequest, NextResponse } from 'next/server'

export {};
// import { deleteFile, sendErrorResponse } from '@/lib/utils.js'
// import { UPLOADS_DIRECTORY } from '@/server.js'
// import UsersModel from '@/models/users'
// import { useSearchParams } from 'next/navigation'

// export const uploadFiles = async (req: NextRequest, res: NextResponse) => {
//   const params = useSearchParams()
//   console.log('Upload FILES')
//   console.log(req.file)

//   if (req.file == undefined) {
//     return res.status(400).json({ error: { message: `You must select a file.` } })
//   }

//   const userId = params.id
//   // const userId = 1

//   if (Number.isNaN(userId)) {
//     return res.status(400).json({
//       error: `Invalid parameter type! \`id\` must be of type number, received ${JSON.stringify(
//         userId
//       )}`,
//     })
//   }
//   const userData = await UsersModel.getById(userId).catch((error) => {
//     console.log(error)
//   })

//   if (!userData || !(Array.isArray(userData) && userData.length)) return sendErrorResponse(res, 400, 'No User found!')

//   const [user] = userData

//   if (user?.image) {
//     // console.log('Delete file')
//     await deleteFile(`${UPLOADS_DIRECTORY}${user.image}`)
//       .catch((error) => {
//         console.log(error)
//       })
//   }

//   UsersModel.updateById(userId, {
//     image: req.file.filename,
//   }).then(() => {
//     return res.status(200).json({ message: 'Avatar successfully uploaded', user: { ...user, image: req.file?.filename } })
//   }).catch((error) => {
//     console.log(error)
//     return res.status(400).json({
//       error: {
//         message: `Error when trying to upload images: ${error}`
//       }
//     })
//   })
// }
