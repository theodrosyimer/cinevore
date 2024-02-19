'use client'

import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'

import { cn } from '@/lib/utils/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { type SyntheticEvent, useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
// import { searchMulti } from '@/lib/tmdb/src/tmdb'
import {
  SearchMovieMulti,
  SearchPersonMulti,
  type TMDBSearchMultiResult,
} from '@/lib/tmdb/types/tmdb-api'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useDebounce } from 'use-debounce'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Label } from '@radix-ui/react-label'
import { slugify } from '@/lib/utils/slugify'

export function SearchCombo() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  // const [value, setValue] = useState<TMDBSearchMultiResult | null>(null)

  const [results, setResults] = useState<TMDBSearchMultiResult | null>(null)
  const searchParams = useSearchParams()
  const search = searchParams.get('search') ?? ''

  const initialRender = useRef(true)

  const [text, setText] = useState(search)
  const [query] = useDebounce(text, 500, { leading: true })

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
      return
    }

    if (!query) {
      // router.push(`/search`)
    } else {
      // searchMulti({ query }).then((res) => {
      //   // console.log('res', res)
      //   // TODO: do better handling of results
      //   // if (!res?.results) return

      //   const movies = res?.results
      //     .filter((result) => result.media_type !== 'tv')
      //     .map((result) => {
      //       if (!result) return

      //       setOpen(true)

      //       const { id, media_type } = result
      //       if (media_type === 'movie') {
      //         // return { id, title: result.title, media_type }
      //         return result as SearchMovieMulti
      //       }
      //       if (media_type === 'person') {
      //         // return { id, name: result.name, media_type }
      //         return result as SearchPersonMulti
      //       }
      //     })
      //   console.log(movies)
      //   setResults(movies as TMDBSearchMultiResult)
      //   setOpen(false)
      // })
    }
  }, [query])

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setText(event.currentTarget.value)
}

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault()
    console.log('event target', text)
    router.push(`/search?search=${query}`)
    setResults(null)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {/* <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? results.find((framework) => framework.value === value)?.label
            : "Search for Films, persons..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button> */}
        <form
          onSubmit={handleSubmit}
          className={cn('relative mr-2 w-full md:ml-2' /* , className */)}
          // {...props}
        >
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <Input
            id="search"
            type="search"
            value={text}
            aria-expanded={open}
            placeholder="Search for Films, Actors..."
            className="h-8 w-auto "
            onChange={handleChange}
            onFocus={() => {
              setOpen(false)
            }}
          />
        </form>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <ScrollArea>
          {/* <CommandInput placeholder="Search framework..." className="h-9" /> */}
          {results?.length
            ? results.map((result) => (
                <CommandItem
                  key={result.id}
                  onSelect={(currentValue) => {
                    setText(currentValue === text ? '' : currentValue)
                    setOpen(false)
                    result.media_type === 'movie'
                      ? router.push(
                          `/film/${slugify(result.title ?? '')}/?id=${
                            result.id
                          }`,
                        )
                      : result.media_type === 'person'
                      ? router.push(
                          `/person/${slugify(result.name ?? '')}/?id=${
                            result.id
                          }`,
                        )
                      : null
                  }}
                >
                  {result.media_type === 'movie'
                    ? result.title ?? ''
                    : result.media_type === 'person'
                    ? result.name ?? ''
                    : null}
                  {/* <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    // value === movie?.id ? "opacity-100" : "opacity-0"
                  )}
                /> */}
                </CommandItem>
              ))
            : null}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}
