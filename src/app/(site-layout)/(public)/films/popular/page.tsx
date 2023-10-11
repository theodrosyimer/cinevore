export const metadata = {
  title: 'Upcoming Films Page',
  description: 'Search for Upcoming films.',
}

export default function UpcomingFilmsPage({
  params,
}: {
  params: { username: string }
}) {
  return (
    <>
      <h1 className="text-4xl font-bold text-center">
        Search for Popular Films
      </h1>
    </>
  )
}
