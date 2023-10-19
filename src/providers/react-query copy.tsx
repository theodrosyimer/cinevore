'use client'

import { queryClientOptions } from '@/lib/react-query/options'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

type Props = { children: React.ReactNode }

export default function ReactQueryProvider({ children }: Props) {
  const [queryClient] = useState(() => new QueryClient(queryClientOptions))

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
