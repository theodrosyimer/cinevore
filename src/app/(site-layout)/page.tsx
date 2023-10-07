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
import HeroImage from "@/components/hero-image"

export default function IndexPage() {
  // const stars = await getGitHubStars()
  // const stars = '10'
  // const { user, isAdmin } = await getCurrentUser()


  return (
    <>
      {/* <Image
        src='https://image.tmdb.org/t/p/w500/nuO8o9ltxhI7AZQxePavEZ4TyHa.jpg'
        alt='training day'
        width={500}
        height={750}
      /> */}
      {/* <HeroImage /> */}
    </>
  )
}
