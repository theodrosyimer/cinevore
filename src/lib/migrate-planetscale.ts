import * as schema from '@/db/planetscale'
// import { migrate } from 'drizzle-orm/mysql2/migrator'
import { migrate } from 'drizzle-orm/planetscale-serverless/migrator'
import { connect } from '@planetscale/database'
import { drizzle } from 'drizzle-orm/planetscale-serverless'
// import { drizzle } from 'drizzle-orm/mysql2'

// import * as dotenv from "dotenv"
// dotenv.config({ path: '.env.local' })
import { clearDbTables, db, makeColumnEmojiFriendly } from '@/lib/db'
import {
  addComments,
  addCommentsToMovieLists,
  addCommentsToMovieReviews,
  addFollowers,
  addLikes,
  addLikesToMovieLists,
  addLikesToMovieReviews,
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
} from '@/lib/migrate-data'

console.log(
  process.env.DB_HOST,
  process.env.DB_ADMIN,
  process.env.DB_NAME,
  process.env.DB_PORT,
)

// const client = await mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_ADMIN,
//   database: process.env.DB_NAME,
//   port: Number(process.env.DB_PORT),
//   // password: process.env.DB_PASSWORD,
// })

// const dbMigrationOnly = drizzle(client)

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
    await addLikesToMovieLists(db)
    await addLikesToMovieReviews(db)
    await addComments(db)
    await addCommentsToMovieLists(db)
    await addCommentsToMovieReviews(db)
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
