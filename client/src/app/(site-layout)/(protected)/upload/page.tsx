import { env } from "../../../../../env.mjs"

export default function UploadPage({ params }: { params: { username: string } }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <form
        className="mt-4"
        action={`${env.SERVER_URL}/upload`}
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
        <button type="submit" className="">Submit</button>
      </form>
    </main>
  )
}
