import Films from "@/components/films-list"

export const metadata = {
  title: "Diary Page",
  description: "Your diary of films.",
}

export default function DiaryPage({ params }: {
  params: {
    username: string,
    id: number
  }
}) {

  return (
    <>
      <h1 className="text-4xl font-bold text-center">Diary</h1>

      <section>
        <Films />
      </section>

    </>
  )
}
