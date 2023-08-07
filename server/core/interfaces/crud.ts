import { MySqlRawQueryResult } from 'drizzle-orm/mysql2'

export interface CRUD {
    list: (limit: number, page: number) => Promise<any>
    create: (resource: any) => Promise<any>
    putById: (id: number, resource: any) => Promise<string>
    patchById: (id: number, resource: any) => Promise<string>
    getById: (id: number) => Promise<any>
    deleteById: (id: number) => Promise<string | void | MySqlRawQueryResult>
}
