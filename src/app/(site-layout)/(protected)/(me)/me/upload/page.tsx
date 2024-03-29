import { env } from "@/env.js"
export const metadata = {
  title: 'Upload Image',
  description: "Upload your avatar's image.",
}

export default async function UploadPage({
  params,
}: {
  params: { username: string }
}) {
  return (
    <>
      <form
        className="mt-4"
        // action={`${env.NEXT_PUBLIC_APP_URL}/upload`}
        action={`${env.NEXT_PUBLIC_APP_URL}/api/upload`}
        method="POST"
        encType="multipart/form-data"
      >
        <div className="form-group">
          <input
            type="file"
            name="file"
            id="input-files"
            className="form-control-file border"
          />
        </div>
        <button type="submit" className="">
          Submit
        </button>
      </form>
    </>
  )
}
