import { getUsers } from '@/app/(site-layout)/(public)/members/getUsers'

export async function Users() {
  const users = await getUsers()
  return (
    <>
      <pre className="w-max divide-y-4">
        {users.length
          ? users.map((user) => {
              return (
                <div key={user.id}>
                  <h2>{user.name}</h2>
                  <p>{user.email}</p>
                </div>
              )
            })
          : null}
      </pre>
    </>
  )
}
