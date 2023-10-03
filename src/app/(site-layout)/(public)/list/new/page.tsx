import FilmCardList from "@/components/film-card-list"

export const metadata = {
  title: "Create List Page",
  description: "Create a new list of films.",
}

export default function NewListPage({ params }: {
  params: {
    username: string,
    id: number
  }
}) {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold text-center">Create a new list.</h1>

      <section>
        <FilmCardList />
      </section>

    </main>
  )
}
