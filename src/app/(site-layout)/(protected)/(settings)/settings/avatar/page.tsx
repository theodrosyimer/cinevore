'use client'

// You need to import our styles for the button to look right. Best to import in the root /layout.tsx but this is fine
import '@uploadthing/react/styles.css'

import { UploadDropzone } from '@/lib/utils/uploadthing'

import { OurFileRouter } from '@/app/api/uploadthing/core'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils/utils'

export default function UploadDnD() {
  const [images, setImages] = useState<
    {
      fileUrl: string
      fileKey: string
    }[]
  >([])

  const title = images.length ? (
    <>
      <p>Upload Complete!</p>
      <p className="mt-2">{images.length} files</p>
    </>
  ) : null

  const imgList = (
    <>
      {title}
      <ul>
        {images.map((image) => (
          <li key={image.fileUrl} className="mt-2">
            <Link href={image.fileUrl} target="_blank">
              {image.fileUrl}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )

  return (
    <UploadDropzone
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        if (res) {
          setImages(res)
          const json = JSON.stringify(res)
          // Do something with the response
          console.log(json)
        }
        //alert("Upload Completed");
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`)
      }}
      className={cn('max-w-full')}
    />
  )
}
