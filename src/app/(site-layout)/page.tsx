import Link from "next/link"

// import { env } from "@env.mjs"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { globalConfig, getPopular } from "@/lib/tmdb/src/tmdb"
import Image from "next/image"

export default function IndexPage() {
  // const stars = await getGitHubStars()
  // const stars = '10'
  // const { user, isAdmin } = await getCurrentUser()


  return (
    <>
      <h1 className="text-4xl font-bold text-center">Cinevore</h1>
      <p className="text-center">Welcome to Cinevore, the only place to be...</p>
    </>
  )
}
