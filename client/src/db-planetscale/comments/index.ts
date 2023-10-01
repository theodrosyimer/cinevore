import { relations, sql } from "drizzle-orm"
import {
  index,
  int, mysqlTable, text,
  timestamp, uniqueIndex,
  varchar
} from "drizzle-orm/mysql-core"
import { user } from "../users"
import { commentToMovieList } from "../movie-lists"
import { commentToMovieReview } from "../movie-reviews"

export const comment = mysqlTable('comment', {
  id: int("id").autoincrement().primaryKey().notNull(),
  authorId: varchar("author_id", { length: 255 }).notNull()/* .references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }) */,
  content: text('content').notNull(),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at').onUpdateNow(),
}, (table) => {
  return {
    id: uniqueIndex("id").on(table.id),
    fkAuthorId: index("FK_author_id").on(table.authorId),
  }
})

export const commentRelations = relations(comment, ({ one, many }) => ({
  user: one(user, { fields: [comment.authorId], references: [user.id] }),
  commentsToMovieList: many(commentToMovieList),
  commentsToMovieReview: many(commentToMovieReview,),
}))
