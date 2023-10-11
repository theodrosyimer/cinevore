import { getUsers } from "@/app/(site-layout)/(public)/members/getUsers"

export const metadata = {
  title: 'Members Page',
  description: 'Find all your preferred films here.',
}

export default async function UsersPage({
  params,
}: {
  params: { username: string }
}) {
  const users = await getUsers()
  return (
    <>
      <h1 className="text-4xl font-bold text-center">Members</h1>
      <pre className="divide-y-4 w-max">
        {users.length ? users.map((user) => {
          return (
            <div key={user.id}>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>
          )
        }) : null}
      </pre>
    </>
  )
}
