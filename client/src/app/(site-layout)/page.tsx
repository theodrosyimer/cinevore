import Link from "next/link"

import { env } from "@env.mjs"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { configOptions, getPopular } from "@/lib/tmdb/tmdb"
import Image from "next/image"
import { useFilms } from "@/hooks/useFilms-zod"

export default function IndexPage() {
  // const stars = await getGitHubStars()
  // const stars = '10'
  // const { user, isAdmin } = await getCurrentUser()

  const { data: films, isLoading } = useFilms()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!films) {
    return <div>No films found</div>
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-center">Home Page</h1>
      <div className="grid grid-cols-3 gap-4">
        {films.results.map((movie) => (
          <div key={movie.id}>
            <Link href={`/films/${movie.id}`}>
              <a>
                <Image
                  src={`${configOptions.IMAGE_BASE_URI}/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              </a>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}
