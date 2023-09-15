import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"

export default async function listMovies(req, res) {
  const session = await getServerSession(req, res, authOptions)

  if (session) {
    res.send({
      movies: [
        { title: "Alien vs Predator", id: 1 },
        { title: "Reservoir Dogs", id: 2 },
      ],
    })
  } else {
    res.send({
      error: "You must sign in to view movies.",
    })
  }
}
