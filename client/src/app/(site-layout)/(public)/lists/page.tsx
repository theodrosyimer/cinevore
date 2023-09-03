
export const metadata = {
  title: "Lists Page",
  description: "Your lists of films.",
}

export default function ListsPage({ params }: { params: { username: string } }) {
  return (
    <>
      <h1 className="text-4xl font-bold text-center">Search for Lists of Films</h1>
    </>
  )
}
