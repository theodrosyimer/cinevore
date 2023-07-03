import Navbar from "@/components/Navbar"

export default function UserFilmsLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: {
    username: string
    id: number
  }
}) {
  // URL -> /shop/shoes/nike-air-max-97
  // `params` -> { tag: 'shoes', item: 'nike-air-max-97' }
  return (
    <>
      <Navbar />
      <h2>{params.username} Profile</h2>
      <section>{children}</section>
    </>
  )
}
