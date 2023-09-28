import FilmCardList from "@/components/film-card-list"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"

export const metadata = {
  title: "Films Page",
  description: "All your films in one place.",
}

export default async function UserFilmsPage({ params }: {
  params: {
    username: string,
    id: number
  }
}) {

  // const { user, isAdmin } = await getCurrentUser()

  // if (!user) {
  //   redirect(authOptions?.pages?.signIn || "/login")
  // }

  return (
    <>
      <h1 className="text-4xl font-bold text-center">Films from {params.username}</h1>

      <section>
        <FilmCardList />
      </section>

    </>
  )
}
