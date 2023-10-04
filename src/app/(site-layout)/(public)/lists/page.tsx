import { getLists } from "@/app/(site-layout)/(public)/lists/getLists"
import { UserInfos } from "@/components/user-infos"
import { getCurrentUser } from "@/lib/session"

export const metadata = {
  title: "Lists Page",
  description: "Your lists of films.",
}

export default async function ListsPage({ params }: { params: { username: string } }) {
  const { user } = await getCurrentUser()
  // const lists = await getLists()

  // console.log(lists)

  return (
    <>
      {/* <h1 className="text-4xl font-bold text-center">Search for Lists of Films</h1> */}

      {user ? <UserInfos /* user={user} */ /> : null}
      <pre>
        {/* {lists ? JSON.stringify(lists, null, 2) : null} */}
      </pre>
    </>
  )
}
