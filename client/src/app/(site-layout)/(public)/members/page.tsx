export const metadata = {
  title: "Members Page",
  description: "Find all your preferred films here.",
}

export default function UsersPage({ params }: { params: { username: string } }) {
  return (
    <>
      <h1 className="text-4xl font-bold text-center">Members</h1>
    </>)

}
