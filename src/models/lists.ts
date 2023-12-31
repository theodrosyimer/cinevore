// import debug from 'debug'
import { and, eq } from 'drizzle-orm'
import { db } from '@/db'
import { list } from '@/db/schema/planetscale'
import { NewList, SelectList } from '@/types/db'

// const log: debug.IDebugger = debug('app:lists-model')

class ListsModel {
  constructor() {
    // log('Created new instance of ListsModel')
  }

  create = async (newList: NewList) => {
    return db.insert(list).values(newList)
  }

  getAll = async (userId: string) =>
    db.query.list.findMany({
      with: {
        movies: true,
        user: true,
        likes: true,
        comments: true,
      },
    })

  getAllByPage = async (page: number, limit = 3) =>
    db
      .select()
      .from(list)
      .limit(limit)
      .offset((page - 1) * limit)

  getAllByUserId = async (userId: string) =>
    db.query.list.findMany({
      where: (list, { eq }) => eq(list.userId, userId),
      with: {
        movies: {
          with: {
            movie: true,
          },
        },
        user: {
          columns: {
            password: false,
          },
        },
        likes: true,
        comments: true,
      },
    })

  getAllByUserName = async (username: string) =>
    db.query.user.findFirst({
      where: (user, { eq }) => eq(user.name, username),
      columns: {
        password: false,
      },
      with: {
        lists: {
          with: {
            movies: {
              with: {
                movie: true,
              },
            },
            likes: true,
            comments: true,
          },
        },
      },
    })

  getAllByUserIdOnlyPublic = async (userId: string) =>
    db.query.list.findMany({
      where: (list, { eq }) =>
        and(eq(list.userId, userId), eq(list.isPrivate, false)),
      with: {
        movies: {
          with: {
            movie: true,
          },
        },
        user: {
          columns: {
            password: false,
          },
        },
        likes: true,
        comments: true,
      },
    })

  getAllByUserIdByPage = async (userId: string, page: number, limit = 3) =>
    db.query.list.findMany({
      where: (list, { eq }) => eq(list.userId, userId),
      limit: limit,
      offset: (page - 1) * limit,
      with: {
        movies: {
          with: {
            movie: true,
          },
        },
        user: {
          columns: {
            password: false,
          },
        },
        likes: true,
        comments: true,
      },
    })

  getAllByUserIdByPageOnlyPublic = async (
    userId: string,
    page: number,
    limit = 3,
  ) =>
    db.query.list.findMany({
      where: (list, { eq, and }) =>
        and(eq(list.userId, userId), eq(list.isPrivate, false)),
      limit: limit,
      offset: (page - 1) * limit,
      with: {
        movies: {
          with: {
            movie: true,
          },
        },
        user: {
          columns: {
            password: false,
          },
        },
        likes: true,
        comments: true,
      },
    })

  getById = async (listId: number) =>
    db.query.list.findFirst({
      where: (list, { and, eq }) => and(eq(list.id, listId)),
      with: {
        movies: {
          with: {
            movie: true,
          },
        },
        user: {
          columns: {
            password: false,
          },
        },
      },
    })

  getByIdWithLikesAndComments = async (listId: number, userId: string) =>
    db.query.list.findFirst({
      where: (list, { and, eq }) =>
        and(
          eq(list.id, listId),
          eq(list.userId, userId),
          eq(list.isPrivate, true),
        ),
      with: {
        movies: {
          with: {
            movie: true,
          },
        },
        user: {
          columns: {
            password: false,
          },
        },
        likes: true,
        comments: true,
      },
    })

  getByIdWithLikesAndCommentsOnlyPublic = async (
    listId: number,
    userId: string,
  ) =>
    db.query.list.findFirst({
      where: (list, { and, eq }) =>
        and(
          eq(list.id, listId),
          eq(list.userId, userId),
          eq(list.isPrivate, false),
        ),
      with: {
        movies: {
          with: {
            movie: true,
          },
        },
        user: {
          columns: {
            password: false,
          },
        },
        likes: true,
        comments: true,
      },
    })

  getByTitle = async (listTitle: string) =>
    db.query.list.findFirst({
      where: (list, { and, eq }) => and(eq(list.title, listTitle)),
      with: {
        movies: {
          with: {
            movie: true,
          },
        },
        user: {
          columns: {
            password: false,
          },
        },
      },
    })

  deleteById = async (listId: number) =>
    db.delete(list).where(eq(list.id, listId))

  updateById = async (
    listId: number,
    userId: string,
    data: NewList | SelectList,
  ) =>
    db
      .update(list)
      .set(data)
      .where(and(eq(list.id, listId), eq(list.userId, userId)))
}

const listsModel = new ListsModel()
export default listsModel
