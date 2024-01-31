import { migrate } from 'drizzle-orm/mysql2/migrator'
// import { migrate } from 'drizzle-orm/planetscale-serverless/migrator'

// import * as dotenv from "dotenv"
// dotenv.config({ path: '.env.local' })
import { db } from "@/db/index-mysql2"
import {
  addComments,
  addFollowers,
  addLikes,
  addLists,
  addMovieInfosToUsers,
  addMovieLists,
  addMovieReviews,
  addMovies,
  addRatings,
  addRatingsToMovieLists,
  addRatingsToMovieReviews,
  addUsers,
  addWatchlistToMovies,
  addWatchlists,
} from '@/db/seed-mysql2'
import { clearDbTables, makeColumnEmojiFriendly } from '@/lib/db-mysql'

console.log(
  process.env.DB_HOST,
  process.env.DB_ADMIN,
  process.env.DB_NAME,
  process.env.DB_PORT,
)

async function main() {
  await clearDbTables().catch((e) => {
    console.error(e)
    process.exit(1)
  })

  console.log('\n🗄️   Migrating the database...\n')

  await migrate(db, { migrationsFolder: './drizzle' })

  await makeColumnEmojiFriendly('comment', 'content')
  // @ts-ignore
  await makeColumnEmojiFriendly('movie_review', 'content')
  await makeColumnEmojiFriendly('list', 'title')
  await makeColumnEmojiFriendly('list', 'description')

  await db.transaction(async (tx) => {
    await Promise.all([
      addUsers(tx),
      addMovies(tx),
      addLists(tx),
      addMovieLists(tx),
      addMovieReviews(tx),
      addLikes(tx),
      addComments(tx),
      addFollowers(tx),
      addWatchlists(tx),
      addWatchlistToMovies(tx),
      addRatings(tx),
      addRatingsToMovieLists(tx),
      addRatingsToMovieReviews(tx),
      addMovieInfosToUsers(tx),
    ]).catch((e) => {
      console.error(e)
      throw new Error('Failed to add default data the database ❌')
    })
    console.log('🎉  Migration Done!')
  })
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
