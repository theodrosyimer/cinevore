import { FilmCardList } from '@/components/film-card-list'

export const metadata = {
  title: 'Job Details Page',
  description: 'Job details by name.',
}

export default function JobDetailsPage({
  params,
}: {
  params: {
    username: string
    id: number
  }
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-center text-4xl font-bold">
        Films from {params.username}
      </h1>

      <section>
        <FilmCardList aspectRatio="portrait" width="w92" />
      </section>
    </main>
  )
}
