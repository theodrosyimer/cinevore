import Film from "@/components/Film"

export default function UserFilmPage({ params }: {
  params: {
    username: string,
    id: number
  }
}) {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <Film></Film>

    </main>
  )
}
