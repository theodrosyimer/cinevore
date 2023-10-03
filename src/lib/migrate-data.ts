import * as schema from "@/db-planetscale/index"
import { hashPassword } from "@/lib/bcrypt"
import type { NewComment, NewCommentToMovieList, NewCommentToMovieReview, NewFollower, NewLike, NewLikeToMovieList, NewLikeToMovieReview, NewList, NewMovie, NewMovieInfosToUser, NewMovieList, NewMovieReview, NewRating, NewRatingToMovieList, NewRatingToMovieReview, NewUser, NewWatchlist, NewWatchlistToMovies } from "@/types/db"
import { type ExtractTablesWithRelations } from "drizzle-orm"
import { type MySqlTransaction } from "drizzle-orm/mysql-core"
import type { MySql2QueryResultHKT, MySql2PreparedQueryHKT } from "drizzle-orm/mysql2"
import { makeColumnEmojiFriendly } from "@/lib/db"
import { firstHalve, firstHalveIndex, randomFromArrayFirstHalve, randomFromArraySecondHalve, secondHalveIndex } from "@/lib/utils"
import type { PlanetscaleQueryResultHKT, PlanetScalePreparedQueryHKT, PlanetScaleDatabase } from "drizzle-orm/planetscale-serverless"

const adminPassword = await hashPassword('theotheo') as string
const superAdminPassword = await hashPassword('!#tHeodros1') as string
const yetuP = await hashPassword('yetuyetu') as string
const mathiasP = await hashPassword('mathiasmathias') as string
const edenP = await hashPassword('edeneden') as string
const antoineP = await hashPassword('antoineantoine') as string

// type MySql2DrizzleTransaction = MySqlTransaction<MySql2QueryResultHKT, MySql2PreparedQueryHKT, Record<string, never>, ExtractTablesWithRelations<Record<string, never>>>

type PlanetScaleDrizzleTransaction = MySqlTransaction<PlanetscaleQueryResultHKT, PlanetScalePreparedQueryHKT, typeof schema, ExtractTablesWithRelations<typeof schema>>

export async function addUsers(tx: PlanetScaleDatabase<typeof schema>) {
  await Promise.all(
    defaultUsers.map(async (defaultUser) => {
      if (defaultUser) await tx.insert(schema.user).values(defaultUser)
    })
  ).catch(() => {
    throw new Error("Failed to add users to the database")
  }).finally(() => {
  })
  console.log("\t👤  Created 6 new users:\n\t\t1 superadmin\n\t\t1 admin\n\t\t4 users\n")
}

export async function addMovies(tx: PlanetScaleDatabase<typeof schema>) {
  await Promise.all(
    defaultMovies.map(async (defaultMovie) => {
      if (defaultMovie) await tx.insert(schema.movie).values(defaultMovie)
    })
  ).catch(() => {
    throw new Error("Failed to add movies to the database")
  }).finally(() => {
  })
  console.log(`\t🎬  Added ${defaultMovies.length} movies\n`)
}

export async function addLists(tx: PlanetScaleDatabase<typeof schema>) {
  await Promise.all(
    defaultLists.map(async (defaultList) => {
      if (defaultList) await tx.insert(schema.list).values(defaultList)
    })
  ).catch(() => {
    throw new Error("Failed to add users to the database")
  }).finally(() => {
  })
  console.log(`\t🎬  Added ${defaultLists.length} list\n`)
}

export async function addMovieLists(tx: PlanetScaleDatabase<typeof schema>) {
  await Promise.all(
    defaultMovieLists.map(async (defaultMovieList) => {
      if (defaultMovieList) await tx.insert(schema.movieList).values(defaultMovieList)
    })
  ).catch(() => {
    throw new Error("Failed to add movies lists to the database")
  }).finally(() => {
  })
  console.log(`\t🎬  Added ${defaultMovieLists.length} movies to lists\n`)
}

export async function addMovieReviews(tx: PlanetScaleDatabase<typeof schema>) {
  await Promise.all(
    defaultMovieReviews.map(async (defaultMovieReview) => {
      if (defaultMovieReview) await tx.insert(schema.movieReview).values(defaultMovieReview)
    })
  ).catch(() => {
    throw new Error("Failed to add movies reviews to the database")
  }).finally(() => {
  })
  console.log(`\t🎬  Added ${defaultMovieReviews.length} movie reviews\n`)
}

export async function addComments(tx: PlanetScaleDatabase<typeof schema>) {
  await Promise.all(
    defaultComments.map(async (defaultComment) => {
      if (defaultComment) await tx.insert(schema.comment).values(defaultComment)
    })
  ).catch((e) => {
    console.log(e)
    throw new Error("Failed to add comments to the database")
  }).finally(() => {
  })
  console.log(`\t🎬  Added ${defaultComments.length} comments\n`)
}

export async function addCommentsToMovieLists(tx: PlanetScaleDatabase<typeof schema>) {
  await Promise.all(
    defaultCommentsToMovieLists.map(async (defaultCommentsToMovieList) => {
      if (defaultCommentsToMovieList) await tx.insert(schema.commentToMovieList).values(defaultCommentsToMovieList)
    })
  ).catch(() => {
    throw new Error("Failed to add comments to movies lists to the database")
  }).finally(() => {
  })
  console.log(`\t🎬  Added ${defaultCommentsToMovieLists.length} comments to movie list\n`)
}

export async function addCommentsToMovieReviews(tx: PlanetScaleDatabase<typeof schema>) {
  await Promise.all(
    defaultCommentsToMovieReviews.map(async (defaultCommentsToMovieReview) => {
      if (defaultCommentsToMovieReview) await tx.insert(schema.commentToMovieReview).values(defaultCommentsToMovieReview)
    })
  ).catch(() => {
    throw new Error("Failed to add comments to movies reviews to the database")
  }).finally(() => {
  })
  console.log(`\t🎬  Added ${defaultCommentsToMovieReviews.length} comments to movie reviews\n`)
}

export async function addLikes(tx: PlanetScaleDatabase<typeof schema>) {
  await Promise.all(
    defaultLikes.map(async (defaultLike) => {
      if (defaultLike) await tx.insert(schema.like).values(defaultLike)
    })
  ).catch(() => {
    throw new Error("Failed to add movies lists to the database")
  }).finally(() => {
  })
  console.log(`\t🎬  Added ${defaultLikes.length} likes to movies\n`)
}

export async function addLikesToMovieLists(tx: PlanetScaleDatabase<typeof schema>) {
  await Promise.all(
    defaultLikesToMovieLists.map(async (defaultLikesToMovieList) => {
      if (defaultLikesToMovieList) await tx.insert(schema.likeToMovieList).values(defaultLikesToMovieList)
    })
  ).catch(() => {
    throw new Error("Failed to add likes to movies lists to the database")
  }).finally(() => {
  })
  console.log(`\t🎬  Added ${defaultLikesToMovieLists.length} likes to movies lists\n`)
}

export async function addLikesToMovieReviews(tx: PlanetScaleDatabase<typeof schema>) {
  await Promise.all(
    defaultLikesToMovieReviews.map(async (defaultLikesToMovieReview) => {
      if (defaultLikesToMovieReview) await tx.insert(schema.likeToMovieReview).values(defaultLikesToMovieReview)
    })
  ).catch(() => {
    throw new Error("Failed to add likes to movies reviews to the database")
  }).finally(() => {
  })
  console.log(`\t🎬  Added ${defaultLikesToMovieReviews.length} likes to movies reviews\n`)
}

export async function addRatings(tx: PlanetScaleDatabase<typeof schema>) {
  await Promise.all(
    defaultRatings.map(async (defaultRating) => {
      if (defaultRating) await tx.insert(schema.rating).values(defaultRating)
    })
  ).catch(() => {
    throw new Error("Failed to add ratings to movies lists to the database")
  }).finally(() => {
  })
  console.log(`\t🎬  Added ${defaultRatings.length} ratings\n`)
}

export async function addRatingsToMovieLists(tx: PlanetScaleDatabase<typeof schema>) {
  await Promise.all(
    defaultRatingsToMovieLists.map(async (defaultRatingsToMovieList) => {
      if (defaultRatingsToMovieList) await tx.insert(schema.ratingToMovieList).values(defaultRatingsToMovieList)
    })
  ).catch(() => {
    throw new Error("Failed to add ratings to movies lists to the database")
  }).finally(() => {
  })
  console.log(`\t🎬  Added ${defaultRatingsToMovieLists.length} ratings to movies lists\n`)
}

export async function addRatingsToMovieReviews(tx: PlanetScaleDatabase<typeof schema>) {
  await Promise.all(
    defaultRatingsToMovieReviews.map(async (defaultRatingsToMovieReview) => {
      if (defaultRatingsToMovieReview) await tx.insert(schema.ratingToMovieReview).values(defaultRatingsToMovieReview)
    })
  ).catch(() => {
    throw new Error("Failed to add ratings to movies reviews to the database")
  }).finally(() => {
  })
  console.log(`\t🎬  Added ${defaultRatingsToMovieReviews.length} ratings to movies reviews\n`)
}

export async function addFollowers(tx: PlanetScaleDatabase<typeof schema>) {
  await Promise.all(
    defaultFollowers.map(async (defaultFollower) => {
      if (defaultFollower) await tx.insert(schema.follower).values(defaultFollower)
    })
  ).catch(() => {
    throw new Error("Failed to add movies lists to the database")
  }).finally(() => {
  })
  console.log(`\t🎬  Added ${defaultFollowers.length} followers\n`)
}

export async function addMovieInfosToUsers(tx: PlanetScaleDatabase<typeof schema>) {
  await Promise.all(
    defaultMovieInfosToUsers.map(async (defaultMovieInfosToUser) => {
      if (defaultMovieInfosToUser) await tx.insert(schema.movieInfosToUser).values(defaultMovieInfosToUser)
    })
  ).catch(() => {
    throw new Error("Failed to add movies infos to the database")
  }).finally(() => {
  })
  console.log(`\t🎬  Added ${defaultMovieInfosToUsers.length} movies infos from users\n`)
}

export async function addWatchlists(tx: PlanetScaleDatabase<typeof schema>) {
  await Promise.all(
    defaultWatchlists.map(async (defaultWatchlist) => {
      if (defaultWatchlist) await tx.insert(schema.watchlist).values(defaultWatchlist)
    })
  ).catch(() => {
    throw new Error("Failed to add watchlists to the database")
  }).finally(() => {
  })
  console.log(`\t🎬  Added ${defaultWatchlists.length} watchlists\n`)
}

export async function addWatchlistToMovies(tx: PlanetScaleDatabase<typeof schema>) {
  await Promise.all(
    defaultWatchlistToMovies.map(async (defaultWatchlistToMovie) => {
      if (defaultWatchlistToMovie) await tx.insert(schema.watchlistToMovies).values(defaultWatchlistToMovie)
    })
  ).catch(() => {
    throw new Error("Failed to add movies watchlists to the database")
  }).finally(() => {
  })
  console.log(`\t🎬  Added ${defaultWatchlistToMovies.length} movies to watchlists\n`)
}

export const defaultUsers = [{
  id: "02b399c4-34ef-4efb-a997-bd958d8e7d74",
  lastname: 'Yimer',
  firstname: 'Theodros',
  name: 'theo',
  email: 'theo@example.com',
  emailVerified: null,
  password: adminPassword,
  role: 'admin',
  urls: ['https://www.linkedin.com/in/theodros-yimer/', 'https://instagram.com/theodros-yimer',]
}, {
  id: "f6ebd336-966a-413a-b9ca-f876af96ed33",
  lastname: 'Yimer',
  firstname: 'Theodros',
  name: 'theosuper',
  email: 'theosuper@example.com',
  emailVerified: null,
  password: superAdminPassword,
  role: 'superadmin',
},
{
  id: "08f23385-ee88-451d-9626-a41bda446600",
  lastname: 'Yimer',
  firstname: 'Yetenayet',
  name: 'yetu',
  email: 'yetu@example.com',
  emailVerified: null,
  password: yetuP,
  role: 'user',
},
{
  id: "189f0a45-2a1b-4453-b21e-78ce6244c4be",
  lastname: 'Zélé',
  firstname: 'Antoine',
  name: 'antoine',
  email: 'antoine@example.com',
  emailVerified: null,
  password: antoineP,
  role: 'user',
},
{
  id: "f1188128-aa88-413d-a3bb-69932c3e3026",
  lastname: 'Geremew',
  firstname: 'Eden',
  name: 'eden',
  email: 'eden@example.com',
  emailVerified: null,
  password: edenP,
  role: 'user',
},
{
  id: "42a1a955-8d3d-4f94-bcc1-6427cc1cc648",
  lastname: 'Geremew',
  firstname: 'Mathias',
  name: 'mathias',
  email: 'mathias@example.com',
  emailVerified: null,
  password: mathiasP,
  role: 'user',
}
] satisfies NewUser[]

export const defaultMovies = [
  { tmdbId: 87101, imdbId: "tt1340138" },
  { tmdbId: 601, imdbId: "tt0083866" },
  { tmdbId: 238, imdbId: "tt0068646" },
  { tmdbId: 389, imdbId: "tt0050083" },
  { tmdbId: 603692, imdbId: "tt10366206" },
  { tmdbId: 157336, imdbId: "tt0816692" },
] satisfies NewMovie[]

export const defaultLists = [
  {
    id: 1,
    userId: defaultUsers[0]?.id ?? '',
    title: "My all-time favorite movies 👌"
  },
  {
    id: 2,
    userId: defaultUsers[1]?.id ?? '',
    title: "My other favorites movies 👌",
  },
  {
    id: 3,
    userId: defaultUsers[2]?.id ?? '',
    title: "My favorites scifi movies",
  },
  {
    id: 4,
    userId: defaultUsers[3]?.id ?? '',
    title: "I love those films",
  },
  {
    id: 5,
    userId: defaultUsers[4]?.id ?? '',
    title: "Best movies ever",
  },
  {
    id: 6,
    userId: defaultUsers[5]?.id ?? '',
    title: "Awesome movies",
  },
] satisfies NewList[]

export const defaultMovieLists = [
  {
    listId: 1,
    movieId: defaultMovies[0]?.tmdbId ?? 1,
  },
  {
    listId: 1,
    movieId: defaultMovies[1]?.tmdbId ?? 2,
  },
  {
    listId: 1,
    movieId: defaultMovies[3]?.tmdbId ?? 2,
  },
  {
    listId: 2,
    movieId: defaultMovies[0]?.tmdbId ?? 1,
  },
  {
    listId: 2,
    movieId: defaultMovies[1]?.tmdbId ?? 2,
  },
  {
    listId: 3,
    movieId: defaultMovies[2]?.tmdbId ?? 1,
  },
  {
    listId: 3,
    movieId: defaultMovies[4]?.tmdbId ?? 2,
  },
  {
    listId: 4,
    movieId: defaultMovies[1]?.tmdbId ?? 1,
  },
  {
    listId: 4,
    movieId: defaultMovies[3]?.tmdbId ?? 2,
  },
  {
    listId: 5,
    movieId: defaultMovies[5]?.tmdbId ?? 1,
  },
  {
    listId: 5,
    movieId: defaultMovies[3]?.tmdbId ?? 2,
  },
  {
    listId: 6,
    movieId: defaultMovies[2]?.tmdbId ?? 1,
  },
  {
    listId: 6,
    movieId: defaultMovies[5]?.tmdbId ?? 2,
  },
] satisfies NewMovieList[]

export const defaultMovieReviews = [
  {
    id: 1,
    userId: defaultUsers[0]?.id ?? '',
    movieId: defaultMovies[0]?.tmdbId ?? 1,
    content: "This is a great movie",
  },
  {
    id: 2,
    userId: defaultUsers[1]?.id ?? '',
    movieId: defaultMovies[1]?.tmdbId ?? 1,
    content: "This is a great movie",
  },
  {
    id: 3,
    userId: defaultUsers[2]?.id ?? '',
    movieId: defaultMovies[2]?.tmdbId ?? 1,
    content: "This is a great movie",
  },
  {
    id: 4,
    userId: defaultUsers[3]?.id ?? '',
    movieId: defaultMovies[3]?.tmdbId ?? 1,
    content: "This is a great movie",
  },
  {
    id: 5,
    userId: defaultUsers[4]?.id ?? '',
    movieId: defaultMovies[4]?.tmdbId ?? 1,
    content: "This is a great movie",
  },
  {
    id: 6,
    userId: defaultUsers[5]?.id ?? '',
    movieId: defaultMovies[5]?.tmdbId ?? 1,
    content: "This is a great movie",
  },
] satisfies NewMovieReview[]

export const defaultComments = [
  {
    id: 1,
    authorId: defaultUsers[0]?.id ?? '',
    content: "Very nice review 👌",
  },
  {
    id: 2,
    authorId: defaultUsers[0]?.id ?? '',
    content: "Very nice List 👌",
  },
  {
    id: 3,
    authorId: defaultUsers[1]?.id ?? '',
    content: "Very nice review 👌",
  },
  {
    id: 4,
    authorId: defaultUsers[1]?.id ?? '',
    content: "Very nice List 👌",
  },
  {
    id: 5,
    authorId: defaultUsers[2]?.id ?? '',
    content: "Very nice review 👌",
  },
  {
    id: 6,
    authorId: defaultUsers[2]?.id ?? '',
    content: "Very nice list 👌",
  },
  {
    id: 7,
    authorId: defaultUsers[3]?.id ?? '',
    content: "Interesting review 👌",
  },
  {
    id: 8,
    authorId: defaultUsers[3]?.id ?? '',
    content: "Interesting list 👌",
  },
  {
    id: 9,
    authorId: defaultUsers[4]?.id ?? '',
    content: "Got almost the same list as you. Go checkout mine: https://google.com 👌",
  },
  {
    id: 10,
    authorId: defaultUsers[4]?.id ?? '',
    content: "What an in-depth review! 👌",
  },
  {
    id: 11,
    authorId: defaultUsers[5]?.id ?? '',
    content: "Love this review 👌",
  },
  {
    id: 12,
    authorId: defaultUsers[5]?.id ?? '',
    content: "Love this list 👌",
  },


] satisfies NewComment[]

export const defaultCommentsToMovieLists = [
  {
    commentId: 2,
    listId: 1,
  },
  {
    commentId: 4,
    listId: 2,
  },
  {
    commentId: 6,
    listId: 3,
  },
  {
    commentId: 8,
    listId: 4,
  },
  {
    commentId: 10,
    listId: 5,
  },
  {
    commentId: 12,
    listId: 6,
  },
] satisfies NewCommentToMovieList[]

export const defaultCommentsToMovieReviews = [
  {
    commentId: 1,
    movieReviewId: 1,
  },
  {
    commentId: 3,
    movieReviewId: 1,
  },
  {
    commentId: 5,
    movieReviewId: 1,
  },
  {
    commentId: 7,
    movieReviewId: 1,
  },
  {
    commentId: 9,
    movieReviewId: 1,
  },
  {
    commentId: 11,
    movieReviewId: 1,
  },
] satisfies NewCommentToMovieReview[]

export const defaultLikes = [
  {
    id: 1,
    authorId: defaultUsers[0]?.id ?? '',
  },
  {
    id: 2,
    authorId: defaultUsers[0]?.id ?? '',
  },
  {
    id: 3,
    authorId: defaultUsers[1]?.id ?? '',
  },
  {
    id: 4,
    authorId: defaultUsers[1]?.id ?? '',
  },
  {
    id: 5,
    authorId: defaultUsers[2]?.id ?? '',
  },
  {
    id: 6,
    authorId: defaultUsers[2]?.id ?? '',
  },
  {
    id: 7,
    authorId: defaultUsers[3]?.id ?? '',
  },
  {
    id: 8,
    authorId: defaultUsers[3]?.id ?? '',
  },
  {
    id: 9,
    authorId: defaultUsers[4]?.id ?? '',
  },
  {
    id: 10,
    authorId: defaultUsers[4]?.id ?? '',
  },
  {
    id: 11,
    authorId: defaultUsers[5]?.id ?? '',
  },
  {
    id: 12,
    authorId: defaultUsers[5]?.id ?? '',
  },
] satisfies NewLike[]

export const defaultLikesToMovieLists = [
  {
    likeId: 2,
    listId: 1,
  },
  {
    likeId: 4,
    listId: 2,
  },
  {
    likeId: 6,
    listId: 3,
  },
  {
    likeId: 8,
    listId: 4,
  },
  {
    likeId: 10,
    listId: 5,
  },
  {
    likeId: 12,
    listId: 6,
  },
] satisfies NewLikeToMovieList[]

export const defaultLikesToMovieReviews = [
  {
    likeId: 1,
    movieReviewId: 1,
  },
  {
    likeId: 3,
    movieReviewId: 1,
  },
  {
    likeId: 5,
    movieReviewId: 1,
  },
  {
    likeId: 7,
    movieReviewId: 1,
  },
  {
    likeId: 9,
    movieReviewId: 1,
  },
  {
    likeId: 11,
    movieReviewId: 1,
  },
] satisfies NewLikeToMovieReview[]

const ratingsAvailable = ['0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5'] as const
export const defaultRatings = [
  {
    id: 1,
    userId: defaultUsers[0]?.id ?? '',
    value: '3.5',
  },
  {
    id: 2,
    userId: defaultUsers[0]?.id ?? '',
    value: '4.5',
  },
  {
    id: 3,
    userId: defaultUsers[1]?.id ?? '',
    value: '3.5',
  },
  {
    id: 4,
    userId: defaultUsers[1]?.id ?? '',
    value: '4.5',
  },
  {
    id: 5,
    userId: defaultUsers[2]?.id ?? '',
    value: '3.5',
  },
  {
    id: 6,
    userId: defaultUsers[2]?.id ?? '',
    value: '4.5',
  },
  {
    id: 7,
    userId: defaultUsers[3]?.id ?? '',
    value: '3.5',
  },
  {
    id: 8,
    userId: defaultUsers[3]?.id ?? '',
    value: '4.5',
  },
  {
    id: 9,
    userId: defaultUsers[4]?.id ?? '',
    value: '3.5',
  },
  {
    id: 10,
    userId: defaultUsers[4]?.id ?? '',
    value: '4.5',
  },
  {
    id: 11,
    userId: defaultUsers[5]?.id ?? '',
    value: '3.5',
  },
  {
    id: 12,
    userId: defaultUsers[5]?.id ?? '',
    value: '4.5',
  },
] satisfies NewRating[]

// const ratingsCountToCreate = 40

// for (let i = 0; i < ratingsCountToCreate; i++) {
//   defaultRatings.push({
//     id: defaultRatings.length + 1,
//     userId: defaultUsers?.[Math.round(Math.random() * defaultUsers.length)]?.id,
//     value: (ratingsAvailable[Math.round(Math.random() * ratingsAvailable.length)])!,
//   } as NewRating)
// }

let [start, end] = firstHalveIndex(defaultRatings)
export const defaultRatingsToMovieLists = [
  {
    ratingId: 2,
    listId: 1,
  },
  {
    ratingId: 4,
    listId: 2,
  },
  {
    ratingId: 6,
    listId: 3,
  },
  {
    ratingId: 8,
    listId: 4,
  },
  {
    ratingId: 10,
    listId: 5,
  },
  {
    ratingId: 12,
    listId: 6,
  },
] satisfies NewRatingToMovieList[]

// for (let i = start; i < end; i++) {
//   defaultRatingsToMovieLists.push({
//     listId: Math.round(Math.random() * defaultLists.length),
//     ratingId: randomFromArrayFirstHalve(defaultRatings).id ?? 1,
//   } as NewRatingToMovieList)
// }
// [start, end] = secondHalveIndex(defaultRatings)
export const defaultRatingsToMovieReviews = [
  {
    ratingId: 1,
    movieReviewId: 1,
  },
  {
    ratingId: 3,
    movieReviewId: 1,
  },
  {
    ratingId: 5,
    movieReviewId: 1,
  },
  {
    ratingId: 7,
    movieReviewId: 1,
  },
  {
    ratingId: 9,
    movieReviewId: 1,
  },
  {
    ratingId: 11,
    movieReviewId: 1,
  },
] satisfies NewRatingToMovieReview[]

// for (let i = start; i < end; i++) {
//   defaultRatingsToMovieReviews.push({
//     ratingId: randomFromArraySecondHalve(defaultRatings).id ?? 1,
//     movieReviewId: Math.round(Math.random() * defaultMovieReviews.length)
//   } as NewRatingToMovieReview)
// }
export const defaultFollowers = [
  {
    followee: defaultUsers[0]?.id ?? '',
    follower: defaultUsers[1]?.id ?? '',
  },
  {
    followee: defaultUsers[0]?.id ?? '',
    follower: defaultUsers[2]?.id ?? '',
  },
  {
    followee: defaultUsers[0]?.id ?? '',
    follower: defaultUsers[3]?.id ?? '',
  },
  {
    followee: defaultUsers[0]?.id ?? '',
    follower: defaultUsers[4]?.id ?? '',
  },
  {
    followee: defaultUsers[0]?.id ?? '',
    follower: defaultUsers[5]?.id ?? '',
  },
  {
    followee: defaultUsers[1]?.id ?? '',
    follower: defaultUsers[0]?.id ?? '',
  },
  {
    followee: defaultUsers[1]?.id ?? '',
    follower: defaultUsers[2]?.id ?? '',
  },
  {
    followee: defaultUsers[2]?.id ?? '',
    follower: defaultUsers[0]?.id ?? '',
  },
  {
    followee: defaultUsers[2]?.id ?? '',
    follower: defaultUsers[1]?.id ?? '',
  },
  {
    followee: defaultUsers[2]?.id ?? '',
    follower: defaultUsers[3]?.id ?? '',
  },
  {
    followee: defaultUsers[3]?.id ?? '',
    follower: defaultUsers[2]?.id ?? '',
  },
  {
    followee: defaultUsers[3]?.id ?? '',
    follower: defaultUsers[4]?.id ?? '',
  },
  {
    followee: defaultUsers[4]?.id ?? '',
    follower: defaultUsers[3]?.id ?? '',
  },
  {
    followee: defaultUsers[4]?.id ?? '',
    follower: defaultUsers[5]?.id ?? '',
  },
] satisfies NewFollower[]

export const defaultMovieInfosToUsers = [
  {
    userId: defaultUsers[0]?.id ?? '',
    movieId: defaultMovies[0]?.tmdbId ?? 1,
    liked: true,
    rating: '3.5',
  },
  {
    userId: defaultUsers[0]?.id ?? '',
    movieId: defaultMovies[1]?.tmdbId ?? 1,
    watched: true,
    rating: '4.5',
  },
  {
    userId: defaultUsers[1]?.id ?? '',
    movieId: defaultMovies[2]?.tmdbId ?? 1,
    liked: true,
    watched: true,
    rating: '1.5',
  },
  {
    userId: defaultUsers[1]?.id ?? '',
    movieId: defaultMovies[3]?.tmdbId ?? 1,
    liked: true,
    watched: true,
    rating: '5',
  },
  {
    userId: defaultUsers[2]?.id ?? '',
    movieId: defaultMovies[4]?.tmdbId ?? 1,
    liked: true,
    watched: true,
    rating: '2.5',
  },
  {
    userId: defaultUsers[2]?.id ?? '',
    movieId: defaultMovies[5]?.tmdbId ?? 1,
    liked: true,
    watched: true,
    rating: '3.5',
  },
  {
    userId: defaultUsers[3]?.id ?? '',
    movieId: defaultMovies[1]?.tmdbId ?? 1,
    liked: true,
    watched: true,
    rating: '5',
  },
  {
    userId: defaultUsers[3]?.id ?? '',
    movieId: defaultMovies[5]?.tmdbId ?? 1,
    liked: true,
    watched: true,
    rating: '2.5',
  },
  {
    userId: defaultUsers[4]?.id ?? '',
    movieId: defaultMovies[2]?.tmdbId ?? 1,
    liked: true,
    watched: true,
    rating: '1.5',
  },
  {
    userId: defaultUsers[4]?.id ?? '',
    movieId: defaultMovies[3]?.tmdbId ?? 1,
    liked: true,
    watched: true,
    rating: '2',
  },
  {
    userId: defaultUsers[5]?.id ?? '',
    movieId: defaultMovies[3]?.tmdbId ?? 1,
    liked: true,
    watched: true,
    rating: '3',
  },
  {
    userId: defaultUsers[5]?.id ?? '',
    movieId: defaultMovies[5]?.tmdbId ?? 1,
    liked: true,
    watched: true,
    rating: '4',
  },
] satisfies NewMovieInfosToUser[]

export const defaultWatchlists = [
  {
    id: 1,
    userId: defaultUsers[0]?.id ?? '',
  },
  {
    id: 2,
    userId: defaultUsers[1]?.id ?? '',
  },
  {
    id: 3,
    userId: defaultUsers[2]?.id ?? '',
  },
  {
    id: 4,
    userId: defaultUsers[3]?.id ?? '',
  },
  {
    id: 5,
    userId: defaultUsers[4]?.id ?? '',
  },
  {
    id: 6,
    userId: defaultUsers[5]?.id ?? '',
  },
] satisfies NewWatchlist[]

export const defaultWatchlistToMovies = [
  {
    watchlistId: 1,
    movieId: defaultMovies[0]?.tmdbId ?? 1,
  },
  {
    watchlistId: 1,
    movieId: defaultMovies[1]?.tmdbId ?? 1,
  },
  {
    watchlistId: 1,
    movieId: defaultMovies[2]?.tmdbId ?? 1,
  },
  {
    watchlistId: 2,
    movieId: defaultMovies[3]?.tmdbId ?? 1,
  },
  {
    watchlistId: 2,
    movieId: defaultMovies[4]?.tmdbId ?? 1,
  },
  {
    watchlistId: 2,
    movieId: defaultMovies[5]?.tmdbId ?? 1,
  },
  {
    watchlistId: 3,
    movieId: defaultMovies[0]?.tmdbId ?? 1,
  },
  {
    watchlistId: 3,
    movieId: defaultMovies[1]?.tmdbId ?? 1,
  },
  {
    watchlistId: 3,
    movieId: defaultMovies[2]?.tmdbId ?? 1,
  },

  {
    watchlistId: 4,
    movieId: defaultMovies[3]?.tmdbId ?? 1,
  },
  {
    watchlistId: 4,
    movieId: defaultMovies[4]?.tmdbId ?? 1,
  },
  {
    watchlistId: 4,
    movieId: defaultMovies[5]?.tmdbId ?? 1,
  },
  {
    watchlistId: 5,
    movieId: defaultMovies[0]?.tmdbId ?? 1,
  },
  {
    watchlistId: 5,
    movieId: defaultMovies[1]?.tmdbId ?? 1,
  },
  {
    watchlistId: 5,
    movieId: defaultMovies[2]?.tmdbId ?? 1,
  },
  {
    watchlistId: 6,
    movieId: defaultMovies[3]?.tmdbId ?? 1,
  },
  {
    watchlistId: 6,
    movieId: defaultMovies[4]?.tmdbId ?? 1,
  },
  {
    watchlistId: 6,
    movieId: defaultMovies[5]?.tmdbId ?? 1,
  },
] satisfies NewWatchlistToMovies[]

