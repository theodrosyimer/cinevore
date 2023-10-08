import * as z from 'zod';

import { list, movieList } from '@/db-planetscale';
import { db } from '@/lib/db';
import { RequiresProPlanError } from '@/lib/exceptions';
import { getCurrentUser } from '@/lib/session';
// import { movieListPostSchema } from "@/lib/validations/movie-list"
import { formatSimpleErrorMessage } from '@/lib/utils';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    // const { user: currentUser, isAdmin } = await getCurrentUser()

    // if (!user || !isAdmin) {
    //   return new Response("Unauthorized", { status: 403 })
    // }

    // console.log("currentUser:", currentUser)

    // if (!currentUser) {
    //   return new Response("Unauthorized", { status: 403 })
    // }

    const lists = await db.query.list.findMany({
      // where: eq(list.userId, currentUser.id),
      // with: {
      //   movieLists: {
      //     with: {
      //       movie: {
      //         columns: {
      //           tmdbId: false,
      //           imdbId: false,
      //         },
      //       },
      //     },
      //   },
      //   commentsToMovieList: true/* {
      //     with: {
      //       comments: {
      //         columns: {
      //           content: true,
      //         },
      //       },
      //     },
      //   } */,
      //   likesToMovieList: true /* {
      //     with: {
      //       likes: true,
      //     },
      //   } */,
      // },
    });

    return new Response(JSON.stringify(lists));
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return new Response(formatSimpleErrorMessage(error), { status: 500 });
    }

    return new Response(null, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { user: currentUser, isAdmin } = await getCurrentUser();

    if (!currentUser || !isAdmin) {
      return new Response('Unauthorized', { status: 403 });
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

    return new Response('List created', { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    if (error instanceof RequiresProPlanError) {
      return new Response('Requires Pro Plan', { status: 402 });
    }

    if (error instanceof Error) {
      console.log(error);
      return new Response(formatSimpleErrorMessage(error), { status: 500 });
    }

    return new Response(`Error creating a list from the database.`, {
      status: 500,
    });
  }
}
