import { NewListForm } from '@/components/list-create'
import { getCurrentUser } from '@/lib/session'
import { notFound } from 'next/navigation'

export const metadata = {
  title: 'Create List Page',
  description: 'Create a new list of films.'
}

export default async function NewListPage() {
  const { user } = await getCurrentUser()

  if (!user) {
    return notFound()
  }

  return (
    <section className="-mt-8 grid w-full space-y-6 md:mt-0">
      <div className="grid place-items-start space-y-2">
        {/* <Icons.logo className="mx-auto h-6 w-6" /> */}
        <h1 className="text-2xl font-semibold tracking-tight">New List</h1>
        <p className="text-sm text-muted-foreground">Add a new list</p>
      </div>
      <NewListForm user={user} />
    </section>
  )
}
