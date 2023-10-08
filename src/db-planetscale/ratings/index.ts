import { relations, sql } from 'drizzle-orm';
import {
  index,
  int,
  mysqlEnum,
  mysqlTable,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';
import { list } from '../lists';
import { movieReview } from '../movie-reviews';
import { user } from '../users';

export const rating = mysqlTable(
  'rating',
  {
    id: int('id').autoincrement().primaryKey().notNull(),
    userId: varchar('user_id', {
      length: 255,
    }).notNull() /* .references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }) */,
    value: mysqlEnum('value', [
      '0',
      '0.5',
      '1',
      '1.5',
      '2',
      '2.5',
      '3',
      '3.5',
      '4',
      '4.5',
      '5',
    ]).notNull(),
    createdAt: timestamp('created_at')
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at').onUpdateNow(),
  },
  (table) => ({
    id: index('id').on(table.id),
    userId: index('user_id').on(table.userId),
  })
);

export const ratingRelations = relations(rating, ({ one, many }) => ({
  user: one(user, { fields: [rating.userId], references: [user.id] }),
  ratingToMovieList: many(ratingToMovieList),
}));

export const ratingToMovieList = mysqlTable(
  'rating_to_movie_list',
  {
    listId:
      int(
        'list_id'
      ).notNull() /* .references(() => list.id, { onDelete: "cascade", onUpdate: "cascade" }) */,
    ratingId:
      int(
        'rating_id'
      ).notNull() /* .references(() => rating.id, { onDelete: "cascade", onUpdate: "cascade" }) */,
  },
  (table) => {
    return {
      fkListId: index('FK_list_id').on(table.listId),
      fkRatingId: index('FK_rating_id').on(table.ratingId),
    };
  }
);

export const ratingToMovieListRelations = relations(
  ratingToMovieList,
  ({ one, many }) => ({
    lists: many(list),
    ratings: many(rating),
  })
);

export const ratingToMovieReview = mysqlTable(
  'rating_to_movie_review',
  {
    movieReviewId:
      int(
        'movie_review'
      ).notNull() /* .references(() => movieReview.id, { onDelete: "cascade", onUpdate: "cascade" }) */,
    ratingId:
      int(
        'rating_id'
      ).notNull() /* .references(() => rating.id, { onDelete: "cascade", onUpdate: "cascade" }) */,
  },
  (table) => {
    return {
      fkMovieReviewId: index('FK_list_id').on(table.movieReviewId),
      fkRatingId: index('FK_rating_id').on(table.ratingId),
    };
  }
);

export const ratingToMovieReviewRelations = relations(
  ratingToMovieList,
  ({ one, many }) => ({
    movieReviews: many(movieReview),
    ratings: many(rating),
  })
);
