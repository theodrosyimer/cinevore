import { migrate } from 'drizzle-orm/planetscale-serverless/migrator'

// import * as dotenv from "dotenv"
// dotenv.config({ path: '.env.local' })
import { clearDbTables, makeColumnEmojiFriendly } from '@/lib/db'
import { db } from "@/db"
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
} from '@/db/seed'

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

  try {
    await migrate(db, { migrationsFolder: './drizzle' })

    await makeColumnEmojiFriendly('comment', 'content')
    // @ts-ignore
    await makeColumnEmojiFriendly('movie_review', 'content')
    await makeColumnEmojiFriendly('list', 'title')
    await makeColumnEmojiFriendly('list', 'description')
    await addUsers(db)
    await addMovies(db)
    await addLists(db)
    await addMovieLists(db)
    await addMovieReviews(db)
    await addLikes(db)
    await addComments(db)
    await addFollowers(db)
    await addWatchlists(db)
    await addWatchlistToMovies(db)
    await addRatings(db)
    await addRatingsToMovieLists(db)
    await addRatingsToMovieReviews(db)
    await addMovieInfosToUsers(db)
  } catch (e) {
    console.error(e)
    throw new Error('Failed to add default data the database ❌')
  }
  console.log('🎉  Migration Done!')

  process.exit(0)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
