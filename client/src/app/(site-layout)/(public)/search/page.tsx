'use client'

import { useState } from 'react'
import Fuse from 'fuse.js'
import { Input } from '@/components/ui/input'
import { DocsSearch } from '@/components/search'

export type FuseResult<T> = Fuse.FuseResult<T>

const names = ['Tim', 'Joe', 'Bel', 'Lee']

export default function SearchPage() {
  const [results, setResults] = useState<FuseResult<string>[]>([])

  return (
    <div className='container grid place-items-center mx-auto w-full space-y-6 sm:w-[350px]'>
      <Input
        type="text"
        placeholder="Search"
        onChange={async (e) => {
          const { value } = e.currentTarget
          // Dynamically load fuse.js
          const Fuse = (await import('fuse.js')).default
          const fuse = new Fuse(names)

          setResults(fuse.search(value))
        }}
      />
      <br />
      <pre>Results: {JSON.stringify(results, null, 2)}</pre>
      <DocsSearch />
    </div>
  )
}
