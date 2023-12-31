import { relations, sql } from 'drizzle-orm'
import {
  index,
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/mysql-core'
import { user } from '../users'
import { movieReview } from '../movie-reviews'
import { list } from '../lists'

export const comment = mysqlTable(
  'comment',
  {
    id: int('id').autoincrement().primaryKey().notNull(),
    authorId: varchar('author_id', {
      length: 255,
    }).notNull() /* .references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }) */,
    resourceId: int('resource_id').notNull(),
    resourceType: mysqlEnum('resource_type', [
      'movie_review',
      'movie_list',
    ]).notNull(),
    content: text('content').notNull(),
    createdAt: timestamp('created_at')
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at').onUpdateNow(),
  },
  (table) => {
    return {
      id: uniqueIndex('id').on(table.id),
      fkAuthorId: index('FK_author_id').on(table.authorId),
      fkResourceId: index('FK_resource_id').on(table.resourceId),
      fkResourceType: index('FK_resource_type').on(table.resourceType),
    }
  },
)

export const commentRelations = relations(comment, ({ one, many }) => ({
  user: one(user, { fields: [comment.authorId], references: [user.id] }),
  review: one(movieReview, {
    fields: [comment.resourceId],
    references: [movieReview.id],
    relationName: 'reviewComments',
  }),
  list: one(list, {
    fields: [comment.resourceId],
    references: [list.id],
    relationName: 'listComments',
  }),
  // commentsToMovieList: many(commentToMovieList),
  // commentsToMovieReview: many(commentToMovieReview),
}))
