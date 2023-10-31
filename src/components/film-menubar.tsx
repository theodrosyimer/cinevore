'use client'

import { Icons } from '@/components/icons'
import LikeIcon from '@/components/like-icon'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar'
import { cn } from '@/lib/utils/utils'
import { useState } from 'react'

export function MovieMenubar({ className }: { className?: string }) {
  const [liked, setLiked] = useState(false)

  return (
    <Menubar className={cn('justify-evenly', className)}>
      <MenubarMenu>
        <MenubarTrigger>
          <Icons.notWatched size={12} className="" />
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <LikeIcon size={12} className="" />
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <Icons.MoreHorizontal size={12} className="" />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem inset>
            Log or Review {/* <MenubarShortcut>⌘R</MenubarShortcut> */}
          </MenubarItem>
          <MenubarItem inset>
            Add to watchlist {/* <MenubarShortcut>⌘R</MenubarShortcut> */}
          </MenubarItem>
          <MenubarItem disabled inset>
            Add to List {/* <MenubarShortcut>⇧⌘R</MenubarShortcut> */}
          </MenubarItem>
          <MenubarItem disabled inset>
            Show in Lists
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem disabled inset>
            Where to watch
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
