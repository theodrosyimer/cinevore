'use client'

import { Icons } from '@/components/icons'

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/components/ui/menubar'
import {
  genreFilters,
  popularFilters,
  ratingFilters,
  serviceFilters,
  yearFilters,
} from '@/config/film-search-filter'
import { MenubarArrow } from '@radix-ui/react-menubar'

export function FilmSearchFilter() {
  return (
    <Menubar loop={true}>
      <MenubarMenu>
        <MenubarTrigger className="flex items-center gap-2">
          <span>Year</span>
          <Icons.chevronDown className="w-4" />
        </MenubarTrigger>
        <MenubarContent className="w-min">
          {yearFilters.map((rating) => (
            <MenubarItem key={rating.title}>{rating.title}</MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="flex items-center gap-2">
          <span>Rating</span>
          <Icons.chevronDown className="w-4" />
        </MenubarTrigger>
        <MenubarContent align="center">
          {ratingFilters.map((rating) => (
            <MenubarItem key={rating.title} className="w-max">
              {rating.title}
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="flex items-center gap-2">
          <span>Popular</span>
          <Icons.chevronDown className="w-4" />
        </MenubarTrigger>
        <MenubarContent>
          {popularFilters.map((rating) => (
            <MenubarItem key={rating.title}>{rating.title}</MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="flex items-center gap-2">
          <span>Genre</span>
          <Icons.chevronDown className="w-4" />
        </MenubarTrigger>
        <MenubarContent>
          {genreFilters.map((rating) => (
            <MenubarItem key={rating.title}>{rating.title}</MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="flex items-center gap-2">
          <span>Service</span>
          <Icons.chevronDown className="w-4" />
        </MenubarTrigger>
        <MenubarContent>
          {serviceFilters.map((rating) => (
            <MenubarItem key={rating.title}>{rating.title}</MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
