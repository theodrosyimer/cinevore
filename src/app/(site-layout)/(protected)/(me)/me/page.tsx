import { CardSkeleton } from "@/components/card-skeleton"
import { getCurrentUser } from "@/lib/session"

export const metadata = {
  title: "Profile Page",
  description: "User's Profile Page.",
}

export default async function MePage({ params }: { params: { username: string } }) {
  const { user, isAdmin } = await getCurrentUser()

  if (!user) {
    return null
  }
  // console.log(user)
  return (
    <>
      {/* <h1 className="text-4xl font-bold text-center">Welcome back <br />
          {user.name ? user.name[0]?.toUpperCase() + user.name.slice(1) : user.email}
        </h1> */}
      <section className="grid gap-8">
        <article className="grid gap-4">
          <h2>Favorite Films</h2>
          <div className="divide-y divide-border rounded-md border w-80">
            <CardSkeleton />
          </div>
        </article>
        <article className="grid gap-4">
          <h2>Recent Reviews</h2>
          <div className="divide-y divide-border rounded-md border w-80">
            <CardSkeleton />
          </div>
        </article>
      </section>
    </>
  )
}
