import { user } from '@/db/schema/planetscale'
import { db } from '@/db'
import { getCurrentUser } from '@/lib/session'
import { eq } from 'drizzle-orm'
import { type NextRequest } from 'next/server'
import { createUploadthing, type FileRouter } from 'uploadthing/next'

const f = createUploadthing()

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: '4MB', maxFileCount: 10 } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const { user } = await getCurrentUser()

      // If you throw, the user will not be able to upload
      if (!user) throw new Error('Unauthorized')

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      await db
        .update(user)
        .set({ image: file.url })
        .where(eq(user.id, metadata.userId))

      console.log('Upload complete for userId:', metadata.userId)
      console.log('file url', file.url)
    }),

  // Takes a 4 2mb images and/or 1 256mb video
  // mediaPost: f({
  //   image: { maxFileSize: '2MB', maxFileCount: 4 },
  //   video: { maxFileSize: '256MB', maxFileCount: 1 },
  // })
  //   .middleware(({ req }) => auth(req))
  //   .onUploadComplete((data) => console.log('file', data)),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
