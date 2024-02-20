// import { ListForm } from '@/components/list-create'
// import { getCurrentUser } from '@/lib/session'
// import listsModel from '@/models/lists'
// import { notFound } from 'next/navigation'

export const metadata = {
  title: 'List Page',
  description: 'User list of films.',
}

type UserListPageProps = {
  list: string
}

export default async function UserListPage(_props: UserListPageProps) {
  return <></>
}
