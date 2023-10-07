'use client'

import { useState } from 'react'
import Fuse from 'fuse.js'
import { Input } from '@/components/ui/input'
import { Search } from '@/components/search'

export type FuseResult<T> = Fuse.FuseResult<T>

const names = ['Tim', 'Joe', 'Bel', 'Lee']

export default function SearchPage() {
  const [results, setResults] = useState<FuseResult<string>[]>([])

  return (
    <div className='grid place-items-center mx-auto w-full space-y-6 sm:w-[350px]'>
      <Search />
    </div>
  )
}
