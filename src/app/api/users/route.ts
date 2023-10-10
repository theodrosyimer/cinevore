import * as z from 'zod'

import { user } from '@/db/planetscale'
import { hashPassword } from '@/lib/bcrypt'
import { db } from '@/lib/db'
import { RequiresProPlanError } from '@/lib/exceptions'
import { getCurrentUser } from '@/lib/session'
import { formatSimpleErrorMessage } from '@/lib/utils'
import { userPOSTSchema } from '@/lib/validations/user'

export async function GET() {
  try {
    const { user: currentUser, isAdmin } = await getCurrentUser()

    // if (!currentUser || !isAdmin) {
    //   return new Response("Unauthorized", { status: 403 })
    // }

    const users = await db.query.user.findMany({
      // where: (user, { eq }) => eq(user.id, currentUser.id),
      columns: {
        password: false,
      },
      // with: {
      //   likes: true,
      //   comments: true,
      //   ratings: true,
      //   movieReviews: {
      //     with: {
      //       movie: {
      //         columns: {
      //           tmdbId: false,
      //           imdbId: false,
      //         },
      //       },
      //       // commentsToMovieReview: true,
      //     },
      //   },
      //   watchlist: {
      //     with: {
      //       watchlistToMovies: true
      //     },
      //   },
      //   lists: {
      //     with: {
      //       movieLists: true,
      //     },
      //     // with: {
      //     //   movieLists: {
      //     //     with: {
      //     //       commentsToMovieList: true,
      //     //     }
      //     //   }
      //     // },
      //   },
      //   followers: {
      //     columns: {
      //       followedDate: true,
      //     },
      //     with: {
      //       follower: {
      //         columns: {
      //           id: true,
      //           name: true,
      //         },
      //       },
      //     },
      //   },
      //   movieInfosToUser: true,
      // },
    })

    if (!users /* || !users[0] */) {
      return new Response('Users  not found', { status: 404 })
    }

    return new Response(JSON.stringify(users), { status: 200 })
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
    const { isAdmin } = await getCurrentUser()

    if (!isAdmin) {
      return new Response('Unauthorized', { status: 403 })
    }

    const json = await req.json()
    const body = userPOSTSchema.parse(json)
    let hashedPassword = null

    if (body?.password) {
      hashedPassword = await hashPassword(body?.password)
    }

    await db.insert(user).values({
      ...body,
      // have to cast out `void` type returned from `hashPassword`
      password: hashedPassword ?? null,
    })

    return new Response('User created successfully', { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    if (error instanceof RequiresProPlanError) {
      return new Response('Requires Pro Plan', { status: 402 })
    }

    if (error instanceof Error) {
      console.log(error)
      return new Response(formatSimpleErrorMessage(error), { status: 500 })
    }

    return new Response(`Error creating a user from the database.`, {
      status: 500,
    })
  }
}
