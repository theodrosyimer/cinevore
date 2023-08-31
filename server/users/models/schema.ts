import { InferModel, sql } from "drizzle-orm"
import { mysqlTable, mysqlSchema, AnyMySqlColumn, uniqueIndex, index, foreignKey, text, varchar, char, int, timestamp, mysqlEnum } from "drizzle-orm/mysql-core"


export const comment = mysqlTable("comment", {
  commentId: int("comment_id").autoincrement().primaryKey().notNull(),
  listId: int("list_id").notNull().references(() => filmList.listId, { onDelete: "restrict", onUpdate: "cascade" }),
  userId: int("user_id").notNull().references(() => user.userId),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull(),
  content: text("content").notNull(),
},
  (table) => {
    return {
      id: uniqueIndex("comment_id").on(table.commentId),
      fkListComment: index("FK_list_comment").on(table.listId),
      fkUserComment: index("FK_user_comment").on(table.userId),
    }
  })

export const film = mysqlTable("film", {
  filmId: int("film_id").autoincrement().primaryKey().notNull(),
  userId: int("user_id").notNull().references(() => user.userId, { onDelete: "cascade", onUpdate: "cascade" }),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull(),
  content: text("content").notNull(),
},
  (table) => {
    return {
      id: uniqueIndex("film_id").on(table.filmId),
      fkUserFilm: index("FK_user_film").on(table.userId),
    }
  })

export const filmList = mysqlTable("film_list", {
  listId: int("list_id").autoincrement().primaryKey().notNull(),
  userId: int("user_id").notNull(),
},
  (table) => {
    return {
      listId: uniqueIndex("list_id").on(table.listId),
    }
  })

export const filmLike = mysqlTable("film_like", {
  filmLikeId: int("film_like_id").autoincrement().primaryKey().notNull(),
  filmId: int("film_id").notNull().references(() => film.filmId, { onDelete: "cascade", onUpdate: "cascade" }),
  userId: int("user_id").notNull().references(() => user.userId, { onDelete: "cascade", onUpdate: "cascade" }),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull(),
},
  (table) => {
    return {
      id: uniqueIndex("film_like_id").on(table.filmLikeId),
      fkFilmLikeFilm: index("FK_film_like_film").on(table.filmId),
      fkUserLikeFilm: index("FK_user_like_film").on(table.userId),
    }
  })

export const reviewLike = mysqlTable("review_like", {
  likeReviewId: int("review_like_id").autoincrement().primaryKey().notNull(),
  reviewId: int("review_id").notNull().references(() => review.reviewId, { onDelete: "cascade", onUpdate: "cascade" }),
  userId: int("user_id").notNull().references(() => user.userId, { onDelete: "cascade", onUpdate: "cascade" }),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull(),
},
  (table) => {
    return {
      id: uniqueIndex("review_like_id").on(table.likeReviewId),
      fkReviewLikeReview: index("FK_review_like_review").on(table.reviewId),
      fkUserLikeReview: index("FK_user_like_review").on(table.userId),
    }
  })

export const review = mysqlTable("review", {
  reviewId: int("review_id").autoincrement().primaryKey().notNull(),
  filmId: int("film_id").notNull().references(() => film.filmId, { onDelete: "cascade", onUpdate: "cascade" }),
  userId: int("user_id").notNull().references(() => user.userId, { onDelete: "cascade", onUpdate: "cascade" }),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull(),
  content: text("content").notNull(),
},
  (table) => {
    return {
      id: uniqueIndex("review_id").on(table.reviewId),
      fkFilmReview: index("FK_film_review").on(table.filmId),
      fkUserReview: index("FK_user_review").on(table.userId),
    }
  })

export const role = mysqlTable("role", {
  roleId: int("role_id").primaryKey(),
  role: varchar("role", { length: 30 }).notNull(),
  // role: mysqlEnum('role', ['user', 'admin', 'superadmin'])
},
  (table) => {
    return {
      role: uniqueIndex("role").on(table.role),
      id: uniqueIndex("role_id").on(table.roleId),
    }
  })

export const user = mysqlTable("user", {
  userId: int("user_id").autoincrement().primaryKey().notNull(),
  roleId: int("role_id").notNull().references(() => role.roleId, { onDelete: "cascade", onUpdate: "cascade" }),
  lastname: varchar("lastname", { length: 60 }).notNull(),
  firstname: varchar("firstname", { length: 50 }).notNull(),
  username: varchar("username", { length: 50 }).notNull(),
  email: varchar("email", { length: 150 }).notNull(),
  password: char("password", { length: 60 }).notNull(),
  bio: text("bio"),
  avatarFilename: text("avatar_filename"),
  createdAt: timestamp('created_at', { mode: 'date' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull(),
},
  (table) => {
    return {
      email: uniqueIndex("email").on(table.email),
      username: uniqueIndex("username").on(table.username),
      id: uniqueIndex("user_id").on(table.userId),
      fkRoleUser: index("FK_role_user").on(table.roleId),
    }
  })
