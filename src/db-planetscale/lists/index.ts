import { relations, sql } from 'drizzle-orm';
import {
  boolean,
  index,
  int,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';
import { movieList } from '../movie-lists';
import { user } from '../users';
import { comment } from '../comments';
import { like } from '../likes';

export const list = mysqlTable(
  'list',
  {
    id: int('id').autoincrement().primaryKey().notNull(),
    userId: varchar('user_id', {
      length: 255,
    }).notNull() /* .references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }) */,
    title: varchar('title', { length: 2000 }).notNull(),
    description: text('description'),
    isPrivate: boolean('is_private').default(false),
    createdAt: timestamp('created_at')
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    publishedAt: timestamp('published_at')
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at').onUpdateNow(),
  },
  (table) => ({
    id: index('id').on(table.id),
    userId: index('user_id').on(table.userId),
  })
);

export const listRelations = relations(list, ({ one, many }) => ({
  user: one(user, { fields: [list.userId], references: [user.id] }),
  movieLists: many(movieList),
  commentsToMovieList: many(commentToMovieList, {
    relationName: 'comments',
  }),
  likesToMovieList: many(likeToMovieList, {
    relationName: 'likes',
  }),
}));

export const commentToMovieList = mysqlTable(
  'comment_to_movie_list',
  {
    listId:
      int(
        'list_id'
      ).notNull() /* .references(() => list.id, { onDelete: "cascade", onUpdate: "cascade" }) */,
    commentId:
      int(
        'comment_id'
      ).notNull() /* .references(() => comment.id, { onDelete: "cascade", onUpdate: "cascade" }) */,
    createdAt: timestamp('created_at')
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at').onUpdateNow(),
  },
  (table) => {
    return {
      compositeKeyIndex: index('compositeKeyIndex').on(
        table.commentId,
        table.listId
      ),
    };
  }
);

export const commentToMovieListRelations = relations(
  commentToMovieList,
  ({ one, many }) => ({
    comments: one(comment, {
      fields: [commentToMovieList.commentId],
      references: [comment.id],
      relationName: 'comments',
    }),
    list: one(list, {
      fields: [commentToMovieList.listId],
      references: [list.id],
      relationName: '',
    }),
  })
);

export const likeToMovieList = mysqlTable(
  'like_to_movie_list',
  {
    listId:
      int(
        'list_id'
      ).notNull() /* .references(() => list.id, { onDelete: "cascade", onUpdate: "cascade" }) */,
    likeId:
      int(
        'like_id'
      ).notNull() /* .references(() => like.id, { onDelete: "cascade", onUpdate: "cascade" }) */,
    createdAt: timestamp('created_at')
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at').onUpdateNow(),
  },
  (table) => {
    return {
      compositeKeyIndex: index('compositeKeyIndex').on(
        table.listId,
        table.likeId
      ),
    };
  }
);

export const likeToMovieListRelations = relations(
  likeToMovieList,
  ({ one, many }) => ({
    likes: one(like, {
      fields: [likeToMovieList.likeId],
      references: [like.id],
      relationName: 'likes',
    }),
    list: one(list, {
      fields: [likeToMovieList.listId],
      references: [list.id],
    }),
  })
);
