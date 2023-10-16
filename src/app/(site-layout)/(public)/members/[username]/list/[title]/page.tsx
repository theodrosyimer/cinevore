import { z } from 'zod'

export const paramsSchema = z.object({
  props: z.object({
    username: z.string(),
    title: z.string(),
  }),
})

export type MemberListPageProps = z.infer<typeof paramsSchema>

export default function MemberListPage({ props }: MemberListPageProps) {
  return (
    <>
      <h1>Member List Page</h1>
    </>
  )
}
