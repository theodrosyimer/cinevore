export const metadata = {
  title: "Profile Page",
  description: "User's Profile Page.",
}

export default function UserProfilePage({ params }: { params: { username: string } }) {
  return (
    <>
      <h1 className="text-4xl font-bold text-center">{params.username} Profile</h1>
    </>
  )
}
