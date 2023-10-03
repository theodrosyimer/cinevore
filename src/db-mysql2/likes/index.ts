import { likeToMovieList } from "../movie-lists"
import { likeToMovieReview } from "../movie-reviews"
import { relations, sql } from "drizzle-orm"
import {
  index,
  int,
  mysqlTable,
  text,
  timestamp,
  uniqueIndex,
  varchar
} from "drizzle-orm/mysql-core"
import { user } from "../users"

export const like = mysqlTable('like', {
  id: int("id").autoincrement().primaryKey().notNull(),
  authorId: varchar("author_id", { length: 255 }).notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at').onUpdateNow(),
}, (table) => {
  return {
    id: uniqueIndex("id").on(table.id),
    fkAuthorId: index("FK_author_id").on(table.authorId),
  }
})

export const likeRelations = relations(like, ({ one, many }) => ({
  user: one(user, { fields: [like.authorId], references: [user.id] }),
  likesToMovieList: many(likeToMovieList),
  likesToMovieReview: many(likeToMovieReview,),
}))
