// import { defaultMovieReviews } from "./src/lib/migrate-data"
import { firstHalveIndex, randomFromArrayFirstHalve, secondHalveIndex, randomFromArraySecondHalve } from "./src/lib/utils"
// import { NewRating, NewRatingToMovieList, NewRatingToMovieReview } from "./types/db"
import { hashPassword } from "./src/lib/bcrypt"

const adminPassword = await hashPassword('theotheo') as string
const superAdminPassword = await hashPassword('!#tHeodros1') as string
const yetuP = await hashPassword('yetuyetu') as string
const mathiasP = await hashPassword('mathiasmathias') as string
const edenP = await hashPassword('edeneden') as string
const antoineP = await hashPassword('antoineantoine') as string

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
]

export const defaultLists = [
  {
    id: 1,
    userId: defaultUsers[0]?.id ?? '',
    title: "My all-time favorite movies"
  },
  {
    id: 2,
    userId: defaultUsers[1]?.id ?? '',
    title: "My other favorites movies",
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
]


const ratingsAvailable = ['0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5'] as const
export const defaultRatings = [{}
  // {
  //   id: 1,
  //   userId: defaultUsers[0]?.id ?? '',
  //   value: '3.5',
  // },
  // {
  //   id: 2,
  //   userId: defaultUsers[0]?.id ?? '',
  //   value: '4.5',
  // },
  // {
  //   id: 3,
  //   userId: defaultUsers[1]?.id ?? '',
  //   value: '3.5',
  // },

]

// const ratingsCountToCreate = 40

// for (let i = 0; i < ratingsCountToCreate; i++) {
//   defaultRatings.push({
//     id: defaultRatings.length + 1,
//     userId: defaultUsers?.[Math.round(Math.random() * defaultUsers.length)]?.id,
//     value: (ratingsAvailable[Math.round(Math.random() * ratingsAvailable.length)])!,
//   } as NewRating)
// }

// let [start, end] = firstHalveIndex(defaultRatings)

// console.log(start, end)
// export const defaultRatingsToMovieLists = [
//   // {
//   //   ratingId: 1,
//   //   listId: 1,
//   // },
//   {}
// ]

// for (let i = start; i < end; i++) {
//   defaultRatingsToMovieLists.push({
//     listId: Math.round(Math.random() * defaultLists.length),
//     ratingId: randomFromArrayFirstHalve(defaultRatings).id ?? 1,
//   } as NewRatingToMovieList)
// }

// [start, end] = secondHalveIndex(defaultRatings)

// console.log(start, end)

// export const defaultRatingsToMovieReviews = [
//   {
//     ratingId: 1,
//     movieReviewId: 1,
//   },
// ]

// for (let i = start; i < end; i++) {
//   defaultRatingsToMovieReviews.push({
//     ratingId: randomFromArraySecondHalve(defaultRatings).id ?? 1,
//     movieReviewId: Math.round(Math.random() * defaultMoviesReviews.length)
//   } as NewRatingToMovieReview)
// }

// defaultLists[Math.round(Math.random() * defaultLists.length)]!.id
