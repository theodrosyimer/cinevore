import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"


export async function GET() {
  const session = await getServerSession(authOptions)

  const movies = await db.query.movie.findMany({
    with: {
      movieInfosToUsers: true,
    }
  })

  if (session) {
    return NextResponse.json({
      movies: [
        { title: "Alien vs Predator", id: 1 },
        { title: "Reservoir Dogs", id: 2 },
      ],
    })
  } else {
    return NextResponse.json({
      error: "You must sign in to view movies.",
    })
  }
}
