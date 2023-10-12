// import { likeToMovieList } from '../lists'
// import { likeToMovieReview } from '../movie-reviews'
import { relations, sql } from 'drizzle-orm'
import {
  index,
  int,
  mysqlEnum,
  mysqlTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/mysql-core'
import { user } from '../users'
import { list } from '../lists'
import { movieReview } from '../movie-reviews'

export const like = mysqlTable(
  'like',
  {
    id: int('id').autoincrement().primaryKey().notNull(),
    authorId: varchar('author_id', {
      length: 255,
    }).notNull() /* .references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }) */,
    resourceType: mysqlEnum('resource_type', [
      'movie_review',
      'movie_list',
    ]).notNull(),
    resourceId: int('resource_id').notNull(),
    createdAt: timestamp('created_at')
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at').onUpdateNow(),
  },
  (table) => {
    return {
      id: primaryKey(table.id, table.authorId, table.resourceId),
      fkAuthorId: index('FK_author_id').on(table.authorId),
      fkResourceId: index('FK_resource_id').on(table.resourceId),
      fkResourceType: index('FK_resource_type').on(table.resourceType),
    }
  },
)

export const likeRelations = relations(like, ({ one, many }) => ({
  user: one(user, { fields: [like.authorId], references: [user.id] }),
  review: one(movieReview, {
    fields: [like.resourceId],
    references: [movieReview.id],
    relationName: 'reviewLikes',
  }),
  list: one(list, {
    fields: [like.resourceId],
    references: [list.id],
    relationName: 'listLikes',
  }),
  // listLikes: many(list, {
  //   relationName: 'listLikes',
  // }),
  // reviewLikes: many(movieReview, {
  //   relationName: 'reviewLikes',
  // }),
}))
