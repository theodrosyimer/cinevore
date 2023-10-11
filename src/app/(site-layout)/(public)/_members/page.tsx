import { Users } from '@/app/(site-layout)/(public)/_members/user'

export const metadata = {
  title: 'Members Page',
  description: 'Find all your preferred films here.',
}

export default function UsersPage() {
  return (
    <>
      <h1 className="text-center text-4xl font-bold">Members</h1>
      <Users />
    </>
  )
}
