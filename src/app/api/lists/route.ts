import * as z from 'zod'

import { list, movieList } from '@/db/planetscale'
import { db } from '@/lib/db'
import { RequiresProPlanError } from '@/lib/exceptions'
import { getCurrentUser } from '@/lib/session'
// import { movieListPostSchema } from "@/lib/validations/movie-list"
import { formatSimpleErrorMessage } from '@/lib/utils/utils'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const lists = await db.query.list.findMany({})

    console.log('lists', lists)

    return NextResponse.json(lists, {
      status: 200,
      headers: { 'content-type': 'application/json' }
    })
  } catch (error) {
    if (error instanceof Error) {
      console.log(error)
      return new Response(formatSimpleErrorMessage(error), { status: 500 })
    }

    return new Response(null, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { user: currentUser, isAdmin } = await getCurrentUser()

    if (!currentUser || !isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    // const json = await req.json()
    // const body = movieListPostSchema.parse(json)

    // const results = await db.insert(list).values({})

    // if (!results) {
    //   return new Response(null, { status: 500 })
    // }

    // console.log("insert id:", results[0].insertId)

    // if (body?.movieId) {
    //   await db.insert(movieList).values({ ...body, listId: results[0].insertId, movieId: body.movieId, userId: currentUser.id })

    //   return new Response("List created", { status: 201 })
    // }

    return NextResponse.json({ message: 'List created' }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 422 })
    }

    if (error instanceof RequiresProPlanError) {
      return NextResponse.json({ error: 'Requires Pro Plan' }, { status: 402 })
    }

    if (error instanceof Error) {
      console.log(error)
      return NextResponse.json({ error: formatSimpleErrorMessage(error) }, { status: 500 })
    }

    return NextResponse.json({ error: `Error creating a list from the database.` }, {
      status: 500,
    })
  }
}
