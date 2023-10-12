import { getLists } from '@/app/(site-layout)/(public)/lists/getLists'

export async function Lists() {
  const lists = await getLists()

  console.log('LISTS:', lists)

  return (
    <>
      {/* <h1 className="text-4xl font-bold text-center">Search for Lists of Films</h1> */}

      <pre>
        {lists.length
          ? lists.map((list) => {
              return (
                <div key={list.id}>
                  <h2>{list.title}</h2>
                  <p>{list.description}</p>
                </div>
              )
            })
          : null}
      </pre>
    </>
  )
}
