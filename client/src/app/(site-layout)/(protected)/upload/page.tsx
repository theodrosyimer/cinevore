import { env } from "@/env.mjs"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"

export const metadata = {
  title: "Upload Page",
  description: "Upload your avatar's image.",
}

export default async function UploadPage({ params }: { params: { username: string } }) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <>

      <form
        className="mt-4"
        action={`${env.NEXT_PUBLIC_APP_URL}/upload`}
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
