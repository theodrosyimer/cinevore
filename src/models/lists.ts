// import debug from 'debug'
import { and, eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { list } from '@/db/planetscale'
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

  getById = async (listId: number, userId: string) =>
    db.query.list.findFirst({
      where: (list, { and, eq }) =>
        and(eq(list.id, listId), eq(list.userId, userId)),
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
        and(eq(list.id, listId), eq(list.userId, userId)),
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

  deleteById = async (listId: number, userId: string) =>
    db.delete(list).where(and(eq(list.id, listId), eq(list.userId, userId)))

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
