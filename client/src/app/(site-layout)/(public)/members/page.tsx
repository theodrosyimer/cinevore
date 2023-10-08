import { getUsers } from "./getUsers"

export const metadata = {
  title: "Members Page",
  description: "Find all your preferred films here.",
}

export default async function UsersPage({ params }: { params: { username: string } }) {
  const users = await getUsers()
  return (
    <>
      <h1 className="text-4xl font-bold text-center">Members</h1>
      <pre>
        {JSON.stringify(users, null, 2)}
      </pre>
    </>)

}
