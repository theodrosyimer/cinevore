export type MemberListPageProps = {
  params: {
    username: string
    reviewId: number
  }
}

export default function MemberReviewPage({ params }: MemberListPageProps) {
  return (
    <>
      <h1>{params.username} Review Page</h1>
    </>
  )
}
