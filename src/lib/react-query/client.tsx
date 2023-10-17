// ! `QueryClient` is only for prefetching data on the server
// ! not the same as react-query's `useQueryClient` (which is for the client)
import { QueryClient } from '@tanstack/react-query'
import { cache } from 'react'

const getQueryClient = cache(() => new QueryClient())
export default getQueryClient
