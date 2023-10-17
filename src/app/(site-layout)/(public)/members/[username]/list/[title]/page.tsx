export type MemberListPageProps = {
  params: {
    username: string
    title: string
  }
}

export default function MemberListPage({ params }: MemberListPageProps) {
  return (
    <>
      <h1>{params.username}</h1>
      <p>{params.title}</p>
    </>
  )
}
