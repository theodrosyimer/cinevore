import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  const session = await getServerSession(authOptions)

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
