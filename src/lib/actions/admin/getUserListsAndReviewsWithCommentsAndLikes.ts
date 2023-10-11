import { db } from '@/lib/db'
import { sql } from 'drizzle-orm'

const preparedUser = db.query.user
  .findMany({
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
            with: {
              comment: {
                with: {
                  commentsToMovieList: true,
                },
              },
            },
          },
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
          comments: {
            with: {
              comment: true,
            },
          },
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

const preparedUsers = db.query.user
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
          comments: {
            with: {
              comment: {
                with: {
                  commentsToMovieList: true,
                },
              },
            },
          },
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
          comments: {
            with: {
              comment: true,
            },
          },
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

// export async function getAllUsersListsAndReviewsWithCommentsAndLikes() {
//   const users = await preparedUsers.execute()
//
//   return users
// }
