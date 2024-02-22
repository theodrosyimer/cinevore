import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'

export async function GET() {
  const session = await getServerSession(authOptions)

  const movies = await db.query.movie.findMany({})

  if (session) {
    return NextResponse.json(movies)
  } else {
    return NextResponse.json({
      error: 'You must sign in to view movies.',
    })
  }
}
