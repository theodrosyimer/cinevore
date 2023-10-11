import { getUsers } from '@/app/(site-layout)/(public)/_members/getUsers'

export async function Users() {
  const users = await getUsers()
  return (
    <>
      <pre className="divide-y-4 w-max">
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
