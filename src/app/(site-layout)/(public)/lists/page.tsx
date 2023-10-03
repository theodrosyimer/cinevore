import { getLists } from "@/app/(site-layout)/(public)/lists/getLists"

export const metadata = {
  title: "Lists Page",
  description: "Your lists of films.",
}

export default async function ListsPage({ params }: { params: { username: string } }) {

  const lists = await getLists()
  return (
    <>
      <h1 className="text-4xl font-bold text-center">Search for Lists of Films</h1>

      <pre>
        {lists ? JSON.stringify(lists, null, 2) : null}
      </pre>
    </>
  )
}
