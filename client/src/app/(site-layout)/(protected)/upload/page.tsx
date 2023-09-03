import { env } from "@env.mjs"

export const metadata = {
  title: "Upload Page",
  description: "Upload your avatar's image.",
}

export default function UploadPage({ params }: { params: { username: string } }) {
  return (
    <>

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
    </>
  )
}
