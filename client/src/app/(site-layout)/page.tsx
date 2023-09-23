import Link from "next/link"

import { env } from "@/env.mjs"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"

export default async function IndexPage() {
  // const stars = await getGitHubStars()
  // const stars = '10'
  // const user = await getCurrentUser()



  return (
    <>
      <h1 className="text-4xl font-bold text-center">Home Page</h1>
    </>
  )
}
