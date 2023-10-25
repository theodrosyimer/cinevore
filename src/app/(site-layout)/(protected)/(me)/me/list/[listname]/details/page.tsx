import { NewListForm } from '@/components/list-create'
import { getCurrentUser } from '@/lib/session'
import listsModel from '@/models/lists'
import { notFound } from 'next/navigation'

export const metadata = {
  title: 'List Page',
  description: 'User list of films.',
}

export type UserListPageProps = {}

export default function UserListPage(props: UserListPageProps) {
  return <></>
}
