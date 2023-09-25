import { user, movieList } from "@/schema"
import { db } from "@/lib/db"
import { list } from "postcss"

// Transaction example:
//
// const json = await req.json()
// const body = movieListPostSchema.parse(json)

// await db.transaction(async (tx) => {
//   await Promise.all(
//     [tx.insert(list).values({ userId: user.id }).catch((error) => {
//       if (error instanceof Error) {
//         console.log(error)
//       } else {
//         console.log(`Error creating a new list with "userIdId: ${user.id}" from the database.`)
//       }
//     }),
//     tx.insert(movieList).values(body).catch((error) => {
//       if (error instanceof Error) {
//         console.log(error)
//       } else {
//         console.log(`Error creating a new movie list with "userIdId: ${user.id}" from the database.`)
//       }
//     })]
//   ).catch((e) => {
//     console.error(e)
//     throw new Error("Failed to empty the database")
//   }).finally(() => {
//   })
//   console.log("🗑️   Database emptied")
// })
