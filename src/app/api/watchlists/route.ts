import * as z from 'zod';

import { list, movieList } from '@/db-planetscale';
import { db } from '@/lib/db';
import { RequiresProPlanError } from '@/lib/exceptions';
import { getCurrentUser } from '@/lib/session';

export async function GET() {
  try {
    const { user: currentUser } = await getCurrentUser();

    if (
      !currentUser ||
      !(currentUser?.role === 'admin' || currentUser?.role === 'superadmin')
    ) {
      return new Response('Unauthorized', { status: 403 });
    }

    const lists = await db.query.movieList
      .findMany(/* {
      where: eq(user.id, movieList.userId),
    } */)
      .catch((error) => {
        if (error instanceof Error) {
          console.log('Failed to get movie list\n', error);
        } else {
          console.log(
            `Error getting user with "userId: ${currentUser.id}" from the database.`
          );
        }
      });

    return new Response(JSON.stringify(lists));
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { user, isAdmin } = await getCurrentUser();

    if (!user || !(user?.role === 'admin' || user?.role === 'superadmin')) {
      return new Response('Unauthorized', { status: 403 });
    }

    // const json = await req.json()
    // const body = movieListPostSchema.parse(json)

    // const results = await db.insert(list).values({}).catch((error) => {
    //   if (error instanceof Error) {
    //     console.log('Failed to create a list\n', error)
    //   } else {
    //     console.log(`Error creating a new list with "userId: ${user.id}" from the database.`)
    //   }
    // })

    // if (!results) {
    //   return new Response(null, { status: 500 })
    // }

    // console.log("insert id:", results[0].insertId)

    // if (body?.movieId) {
    //   await db.insert(movieList).values({ ...body, listId: results[0].insertId, movieId: body.movieId, userId: user.id }).catch((error) => {
    //     if (error instanceof Error) {
    //       console.log('Failed to insert movies to list\n', error)
    //       return new Response(null, { status: 500 })
    //     } else {
    //       console.log(`Error creating a new movie list with "userIdId: ${user.id}" from the database.`)
    //       return new Response(null, { status: 500 })
    //     }
    //   })
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

    return new Response(null, { status: 500 });
  }
}
