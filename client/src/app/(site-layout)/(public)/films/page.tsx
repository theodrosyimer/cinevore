export const metadata = {
  title: "Films Search Page",
  description: "Find all your preferred films here.",
}

export default function FilmsPage({ params }: { params: { username: string } }) {
  return (
    <>
      <h1 className="text-4xl font-bold text-center">Search for Films</h1>
    </>
  )
}
