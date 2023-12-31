import { db } from '@/db'
import { getCurrentUser } from '@/lib/session'
import { NextResponse } from 'next/server'
import { formatSimpleErrorMessage } from '@/lib/utils/utils'

export async function GET() {
  try {
    const { user: currentUser } = await getCurrentUser()

    if (
      !currentUser ||
      !(currentUser?.role === 'admin' || currentUser?.role === 'superadmin')
    ) {
      return new Response('Unauthorized', { status: 403 })
    }

    const comments = await db.query.comment.findMany()

    return NextResponse.json(comments)
  } catch (error) {
    if (error instanceof Error) {
      console.log(error)
      return new Response(formatSimpleErrorMessage(error), { status: 500 })
    }
    return new Response(null, { status: 500 })
  }
}
