'use client'

import { Icons } from '@/components/icons'

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarTrigger,
} from '@/components/ui/menubar'
import {
  genreFilters,
  popularFilters,
  ratingFilters,
  serviceFilters,
  yearFilters,
} from '@/config/film-search-filter'
import { DotFilledIcon } from '@radix-ui/react-icons'
import { MenubarItemIndicator } from '@radix-ui/react-menubar'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

export function FilmSearchFilter() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const year = searchParams.get('year') ?? ''
  const rating = searchParams.get('rating') ?? ''
  const popular = searchParams.get('popular') ?? ''
  const genre = searchParams.get('genre') ?? ''
  const service = searchParams.get('service') ?? ''

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
      console.log(name, value, params.toString())

      return params.toString()
    },
    [searchParams],
  )

  return (
    <Menubar loop={true}>
      <MenubarMenu>
        <MenubarTrigger className="flex items-center gap-2">
          <span>Year</span>
          <Icons.chevronDown className="w-4" />
        </MenubarTrigger>
        <MenubarPortal>
          <MenubarContent className="w-min">
            <MenubarRadioGroup
              defaultValue={ratingFilters[0]?.title}
              value={year}
              onValueChange={() => year}
            >
              {yearFilters.map((filter) => (
                <MenubarRadioItem
                  className="MenubarRadioItem inset"
                  key={filter.title}
                  value={filter.title}
                  onSelect={() => {
                    router.push(
                      `${
                        pathname === '/search/films'
                          ? pathname
                          : `/search/films`
                      }?${createQueryString('year', filter.title)}`,
                    )
                  }}
                >
                  <MenubarItemIndicator className="MenubarItemIndicator"></MenubarItemIndicator>
                  {filter.title}
                </MenubarRadioItem>
              ))}
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarPortal>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="flex items-center gap-2">
          <span>Rating</span>
          <Icons.chevronDown className="w-4" />
        </MenubarTrigger>
        <MenubarPortal>
          <MenubarContent align="start">
            <MenubarRadioGroup
              defaultValue={ratingFilters[0]?.title}
              value={rating}
              onValueChange={() => rating}
            >
              {ratingFilters.map((filter) => (
                <MenubarRadioItem
                  className="MenubarRadioItem inset"
                  key={filter.title}
                  value={filter.title}
                  onSelect={() => {
                    router.push(
                      `${
                        pathname === '/search/films'
                          ? pathname
                          : `/search/films`
                      }?${createQueryString('rating', filter.title)}`,
                    )
                  }}
                >
                  <MenubarItemIndicator className="MenubarItemIndicator"></MenubarItemIndicator>
                  {filter.title}
                </MenubarRadioItem>
              ))}
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarPortal>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="flex items-center gap-2">
          <span>Popular</span>
          <Icons.chevronDown className="w-4" />
        </MenubarTrigger>
        <MenubarPortal>
          <MenubarContent>
            <MenubarRadioGroup
              defaultValue={ratingFilters[0]?.title}
              value={popular}
              onValueChange={() => popular}
            >
              {popularFilters.map((filter) => (
                <MenubarRadioItem
                  className="MenubarRadioItem inset"
                  key={filter.title}
                  value={filter.title}
                  onSelect={() => {
                    router.push(
                      `${
                        pathname === '/search/films'
                          ? pathname
                          : `/search/films`
                      }?${createQueryString('popular', filter.title)}`,
                    )
                  }}
                >
                  <MenubarItemIndicator className="MenubarItemIndicator"></MenubarItemIndicator>
                  {filter.title}
                </MenubarRadioItem>
              ))}
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarPortal>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="flex items-center gap-2">
          <span>Genre</span>
          <Icons.chevronDown className="w-4" />
        </MenubarTrigger>
        <MenubarPortal>
          <MenubarContent>
            <MenubarRadioGroup
              defaultValue={ratingFilters[0]?.title}
              value={genre}
              onValueChange={() => genre}
            >
              {genreFilters.map((filter) => (
                <MenubarRadioItem
                  className="MenubarRadioItem inset"
                  key={filter.title}
                  value={filter.title}
                  onSelect={() => {
                    router.push(
                      `${
                        pathname === '/search/films'
                          ? pathname
                          : `/search/films`
                      }?${createQueryString('genre', filter.title)}`,
                    )
                  }}
                >
                  <MenubarItemIndicator className="MenubarItemIndicator"></MenubarItemIndicator>
                  {filter.title}
                </MenubarRadioItem>
              ))}
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarPortal>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="flex items-center gap-2">
          <span>Service</span>
          <Icons.chevronDown className="w-4" />
        </MenubarTrigger>
        <MenubarPortal>
          <MenubarContent>
            <MenubarRadioGroup
              defaultValue={ratingFilters[0]?.title}
              value={service}
              onValueChange={() => service}
            >
              {serviceFilters.map((filter) => (
                <MenubarRadioItem
                  className="MenubarRadioItem inset"
                  key={filter.title}
                  value={filter.title}
                  onSelect={() => {
                    router.push(
                      `${
                        pathname === '/search/films'
                          ? pathname
                          : `/search/films`
                      }?${createQueryString('service', filter.title)}`,
                    )
                  }}
                >
                  <MenubarItemIndicator className="MenubarItemIndicator"></MenubarItemIndicator>
                  {filter.title}
                </MenubarRadioItem>
              ))}
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarPortal>
      </MenubarMenu>
    </Menubar>
  )
}
