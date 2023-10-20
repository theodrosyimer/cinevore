import { db } from '@/lib/db'
import { sql } from 'drizzle-orm'

const preparedUser = db.query.user
  .findFirst({
    where: (user, { eq }) => eq(user.id, sql.placeholder('id')),
    columns: {
      password: false,
    },
    with: {
      watchlist: {
        with: {
          movies: {
            columns: {
              watchlistId: false,
            },
          },
        },
      },
      lists: {
        with: {
          movies: {
            columns: {
              listId: false,
            },
          },
          comments: {
            where: (comment, { eq }) => eq(comment.resourceType, 'movie_list'),
          },
          likes: {
            where: (like, { eq }) => eq(like.resourceType, 'movie_list'),
          },
        },
      },
      reviews: {
        with: {
          movie: {
            columns: {
              tmdbId: false,
              imdbId: false,
            },
          },
          comments: {
            where: (comment, { eq }) =>
              eq(comment.resourceType, 'movie_review'),
          },
          likes: {
            where: (like, { eq }) => eq(like.resourceType, 'movie_review'),
          },
        },
      },
      movieInfosToUser: true,
      followers: {
        columns: {
          followedDate: true,
        },
        with: {
          follower: {
            columns: {
              id: true,
              name: true,
            },
          },
        },
      },
      likes: true,
      comments: true,
      ratings: true,
    },
  })
  .prepare()

const preparedUsersResources = db.query.user
  .findMany({
    columns: {
      password: false,
    },
    with: {
      watchlist: {
        with: {
          movies: {
            columns: {
              watchlistId: false,
            },
          },
        },
      },
      lists: {
        with: {
          movies: {
            columns: {
              listId: false,
            },
          },
          comments: true,
          likes: true,
        },
      },
      reviews: {
        with: {
          movie: {
            columns: {
              tmdbId: false,
              imdbId: false,
            },
          },
          comments: true,
          likes: true,
        },
      },
      movieInfosToUser: true,
      followers: {
        columns: {
          followedDate: true,
        },
        with: {
          follower: {
            columns: {
              id: true,
              name: true,
            },
          },
        },
      },
      likes: true,
      comments: true,
      ratings: true,
    },
  })
  .prepare()

export async function getUserListsAndReviewsWithCommentsAndLikes(id: string) {
  const user = await preparedUser.execute({ id })

  return user
}

export async function getAllUsersListsAndReviewsWithCommentsAndLikes() {
  const users = await preparedUsersResources.execute()

  return users
}

const preparedUsers = db.query.user
  .findMany({
    columns: {
      password: false,
    },
    with: {
      lists: {
        with: {
          movies: {
            columns: {
              listId: false,
            },
          },
          comments: true,
          likes: true,
        },
      },
      reviews: {
        with: {
          movie: {
            columns: {
              tmdbId: false,
              imdbId: false,
            },
          },
          comments: true,
          likes: true,
        },
      },
      movieInfosToUser: {
        where: (movieInfoToUser, { eq, or }) =>
          or(
            eq(movieInfoToUser.watched, true),
            eq(movieInfoToUser.reviewed, true),
            eq(movieInfoToUser.liked, true),
          ),
        // with: {}
      },
      likes: true,
    },
  })
  .prepare()

export async function getAllUsersListsAndWatchedFilmsAndLikes() {
  const users = await preparedUsers.execute()

  return users
}

const preparedUserResource = db.query.user
  .findFirst({
    where: (user, { eq }) => eq(user.name, sql.placeholder('name')),
    columns: {
      password: false,
    },
    with: {
      lists: {
        with: {
          movies: {
            columns: {
              listId: false,
            },
          },
          comments: true,
          likes: true,
        },
      },
      reviews: {
        with: {
          movie: {
            columns: {
              tmdbId: false,
              imdbId: false,
            },
          },
          comments: true,
          likes: true,
        },
      },
      movieInfosToUser: {
        where: (movieInfoToUser, { eq, or }) =>
          or(
            eq(movieInfoToUser.watched, true),
            eq(movieInfoToUser.reviewed, true),
            eq(movieInfoToUser.liked, true),
          ),
        with: {
          movie: true,
        },
      },
      likes: true,
    },
  })
  .prepare()

export async function getAllUserListsAndWatchedFilmsAndLikesByUsername(
  name: string,
) {
  const users = await preparedUserResource.execute({ name })

  return users
}
