import Films from "@/components/films-list"

export const metadata = {
  title: "Films Page",
  description: "All your films in one place.",
}

export default function UserFilmsPage({ params }: {
  params: {
    username: string,
    id: number
  }
}) {

  return (
    <>
      <h1 className="text-4xl font-bold text-center">Films from {params.username}</h1>

      <section>
        <Films />
      </section>

    </>
  )
}
