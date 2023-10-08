"use client"

import Fuse from 'fuse.js'

import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { searchMulti } from "@/lib/tmdb/src/tmdb"
import { cn } from "@/lib/utils"
import { useRouter, useSearchParams } from "next/navigation"
import { HTMLAttributes, SyntheticEvent, useEffect, useRef, useState } from 'react'
import { useDebounce } from "use-debounce"
import { SearchMovieMulti, SearchPersonMulti, SearchTvShowMulti, TMDBSearchMulti, TMDBSearchMultiResult } from '@/lib/tmdb/types/tmdb-api'

interface SearchProps extends HTMLAttributes<HTMLFormElement> {}

export function Search({ className, ...props }: SearchProps) {
  const [results, setResults] = useState<TMDBSearchMultiResult | null>(null)
  const searchParams = useSearchParams()
  const search = searchParams.get('search') || ''
  const router = useRouter()

  const initialRender = useRef(true)

  const [text, setText] = useState(search)
  const [query] = useDebounce(text, 500)

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
      return
    }

    if (!query) {
      router.push(`/search`)
    } else {
      // router.push(`/search?search=${query}`)
      searchMulti({ query }).then(res => {
        // console.log('res', res)
        // TODO: do better handling of results
        if (!res?.results) return

        const movies = res.results
          .filter(result => result.media_type !== 'tv')
          .map(result => {
            if (!result) return
            const { id, media_type } = result
            if (media_type === 'movie') {
              // return { id, title: result.title, media_type }
              return result
            }
            if (media_type === 'person') {
              // return { id, name: result.name, media_type }
              return result
            }
          })
        console.log(movies)
        setResults(movies as TMDBSearchMultiResult)
      })
    }
  }, [query, router])

  function onSubmit(event: SyntheticEvent) {
    event.preventDefault()
    console.log('event target', text)
    return toast({
      title: "Not implemented",
      description: "We're still working on the search.",
    })
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn("relative w-full ml-4", className)}
      {...props}
    >
      <Input
        type="search"
        autoFocus
        placeholder="Search for Films, Actors..."
        className="h-8 w-full sm:w-64 sm:pr-12  md:max-w-40"
        onChange={(e) => {
          const { value } = e.currentTarget
          setText(value)
        }}
      />
      {/* <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex">
        <span className="text-xs">⌘</span>K
      </kbd>
      <br /> */}

      <pre>Results: {JSON.stringify(results, null, 2)}</pre>

    </form>
  )
}
