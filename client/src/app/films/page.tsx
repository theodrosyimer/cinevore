export default function UserProfilePage({ params }: { params: { username: string } }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold text-center">{params.username} Profile</h1>
    </main>
  )
}
