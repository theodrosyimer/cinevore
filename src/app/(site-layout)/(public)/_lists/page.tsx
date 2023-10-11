import { Lists } from '@/app/(site-layout)/(public)/_lists/lists'

export const metadata = {
  title: 'Lists Page',
  description: 'Your lists of films.',
}

export default function ListsPage() {
  return (
    <>
      <h1 className="text-center text-4xl font-bold">Lists</h1>

      <Lists />
    </>
  )
}
