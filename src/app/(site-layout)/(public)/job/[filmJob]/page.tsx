import { FilmCardList } from '@/components/film-card-list'

export const metadata = {
  title: 'Job Details Page',
  description: 'Job details by name.',
}

type Job = 'actor' | 'producer' | 'cameraman'
type Params = { params: { job: Job; name: string } }

export function generateStaticParams() {
  return [
    { job: 'actor', name: 'john' },
    { job: 'producer', name: 'mouss' },
    { job: 'cameraman', name: 'aron' },
  ]
}

export default function JobDetailsPage({ params }: Params) {
  const { job, name } = params

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold text-center">Films from {job}</h1>
      <p>{name}</p>
      <section>{/* <FilmCardList /> */}</section>
    </div>
  )
}
