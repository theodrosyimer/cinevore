import * as schema from "@/schema/index"
import { hashPassword } from "@/lib/bcrypt"
import { NewList, NewMovie, NewMovieList, NewMovieReview, NewUser } from "@/types/db"
import { type ExtractTablesWithRelations } from "drizzle-orm"
import { type MySqlTransaction } from "drizzle-orm/mysql-core"
import type { MySql2QueryResultHKT, MySql2PreparedQueryHKT } from "drizzle-orm/mysql2"

const adminPassword = await hashPassword('theotheo') as string
const superAdminPassword = await hashPassword('!#tHeodros1') as string
const yetuP = await hashPassword('yetuyetu') as string
const mathiasP = await hashPassword('mathiasmathias') as string
const edenP = await hashPassword('edeneden') as string
const antoineP = await hashPassword('antoineantoine') as string


type DrizzleTransaction = MySqlTransaction<MySql2QueryResultHKT, MySql2PreparedQueryHKT, Record<string, never>, ExtractTablesWithRelations<Record<string, never>>>

export async function addUsers(tx: DrizzleTransaction) {
  await Promise.all(
    defaultUsers.map(async (defaultUser) => {
      if (defaultUser) await tx.insert(schema.user).values(defaultUser)
    })
  ).catch(() => {
    throw new Error("Failed to add users to the database")
  }).finally(() => {
  })
  console.log("👤  Created 6 new users:\n\t1 superadmin\n\t1 admin\n\t4 users\n")
}

export async function addMovies(tx: DrizzleTransaction) {
  await Promise.all(
    defaultMovies.map(async (defaultMovie) => {
      if (defaultMovie) await tx.insert(schema.movie).values(defaultMovie)
    })
  ).catch(() => {
    throw new Error("Failed to add movies to the database")
  }).finally(() => {
  })
  console.log(`🎬  Added ${defaultMovies.length} movies\n`)
}

export async function addLists(tx: DrizzleTransaction) {
  await Promise.all(
    defaultLists.map(async (defaultList) => {
      if (defaultList) await tx.insert(schema.list).values(defaultList)
    })
  ).catch(() => {
    throw new Error("Failed to add users to the database")
  }).finally(() => {
  })
  console.log("👤  Created 6 new users:\n\t1 superadmin\n\t1 admin\n\t4 users\n")
}

export async function addMovieLists(tx: DrizzleTransaction) {
  await Promise.all(
    defaultMovieLists.map(async (defaultMovieList) => {
      if (defaultMovieList) await tx.insert(schema.movieList).values(defaultMovieList)
    })
  ).catch(() => {
    throw new Error("Failed to add movies lists to the database")
  }).finally(() => {
  })
  console.log(`🎬  Added ${defaultMovieLists.length} movies\n`)
}

export const defaultUsers = [{
  id: crypto.randomUUID(),
  lastname: 'Yimer',
  firstname: 'Theodros',
  name: 'theo',
  email: 'theo@example.com',
  emailVerified: null,
  password: adminPassword,
  role: 'admin',
}, {
  id: crypto.randomUUID(),
  lastname: 'Yimer',
  firstname: 'Theodros',
  name: 'theosuper',
  email: 'theosuper@example.com',
  emailVerified: null,
  password: superAdminPassword,
  role: 'superadmin',
},
{
  id: crypto.randomUUID(),
  lastname: 'Yimer',
  firstname: 'Yetenayet',
  name: 'yetu',
  email: 'yetu@example.com',
  emailVerified: null,
  password: yetuP,
  role: 'user',
},
{
  id: crypto.randomUUID(),
  lastname: 'Zélé',
  firstname: 'Antoine',
  name: 'antoine',
  email: 'antoine@example.com',
  emailVerified: null,
  password: antoineP,
  role: 'user',
},
{
  id: crypto.randomUUID(),
  lastname: 'Geremew',
  firstname: 'Eden',
  name: 'eden',
  email: 'eden@example.com',
  emailVerified: null,
  password: edenP,
  role: 'user',
},
{
  id: crypto.randomUUID(),
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
] satisfies NewMovie[]

export const defaultLists = [
  {
    id: 1,
    userId: defaultUsers[0]?.id ?? '',
    title: "My all-time favorite movies"
  },
  {
    id: 2,
    userId: defaultUsers[0]?.id ?? '',
    title: "My other favorites movies",
  },
  {
    id: 3,
    userId: defaultUsers[0]?.id ?? '',
    title: "My favorites scifi movies",
  },
  {
    id: 4,
    userId: defaultUsers[1]?.id ?? '',
    title: "I love those films",
  },
  {
    id: 5,
    userId: defaultUsers[2]?.id ?? '',
    title: "Best movies ever",
  },
  {
    id: 6,
    userId: defaultUsers[3]?.id ?? '',
    title: "Oooh yeah",
  },
  {
    id: 7,
    userId: defaultUsers[4]?.id ?? '',
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
] satisfies NewMovieList[]


// export const defaultMovieReview = [
//   {},
//   {},
//   {},
//   {},
//   {},
//   {}
// ] satisfies NewMovieReview[]
