'use client'

import { Icons } from '@/components/icons'
import LikeIcon from '@/components/like-icon'
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar'
import { cn } from '@/lib/utils/utils'
import { useState } from 'react'

export function MovieMenubar({ className }: { className?: string }) {
  const [liked, setLiked] = useState(false)

  return (
    <Menubar className={cn('', className)}>
      <MenubarMenu>
        <MenubarTrigger>
          <Icons.notWatched size={12} className="" />
        </MenubarTrigger>
        {/* <MenubarContent>
            <MenubarItem>
              New Tab <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              New Window <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>New Incognito Window</MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Share</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Email link</MenubarItem>
                <MenubarItem>Messages</MenubarItem>
                <MenubarItem>Notes</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem>
              Print... <MenubarShortcut>⌘P</MenubarShortcut>
            </MenubarItem>
          </MenubarContent> */}
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <LikeIcon size={12} className="" />
        </MenubarTrigger>
        {/* <MenubarContent>
            <MenubarItem>
              Undo <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Find</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Search the web</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Find...</MenubarItem>
                <MenubarItem>Find Next</MenubarItem>
                <MenubarItem>Find Previous</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem>Cut</MenubarItem>
            <MenubarItem>Copy</MenubarItem>
            <MenubarItem>Paste</MenubarItem>
          </MenubarContent> */}
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
      {/* <MenubarMenu>
          <MenubarTrigger>Profiles</MenubarTrigger>
          <MenubarContent>
            <MenubarRadioGroup value="benoit">
              <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
              <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
              <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
            </MenubarRadioGroup>
            <MenubarSeparator />
            <MenubarItem inset>Edit...</MenubarItem>
            <MenubarSeparator />
            <MenubarItem inset>Add Profile...</MenubarItem>
          </MenubarContent>
        </MenubarMenu> */}
    </Menubar>
  )
}
