// import debug from 'debug'
import { and, eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { list } from '@/schema'
import { NewList, SelectList } from '@/types/db'
import { CRUD } from '@/types/crud'

// const log: debug.IDebugger = debug('app:lists-model')

class ListsModel {

  constructor() {
    // log('Created new instance of ListsModel')
  }

  create = async (newList: NewList) => {
    return db.insert(list).values(newList)
  }

  getAll = async () => db.select().from(list)

  getAllByPage = async (page: number, limit = 3) => db.select().from(list).limit(limit).offset((page - 1) * limit)

  getById = async (listId: number, userId: string) => db.select().from(list).where(and(eq(list.id, listId), eq(list.userId, userId)))

  deleteById = async (listId: number, userId: string) =>
    db.delete(list).where(and(eq(list.id, listId), eq(list.userId, userId)))

  updateById = async (listId: number, userId: string, data: NewList | SelectList) => db.update(list)
    .set(data)
    .where(and(eq(list.id, listId), eq(list.userId, userId)))
}

export default new ListsModel()
