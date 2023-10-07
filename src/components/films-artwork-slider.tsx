import * as dotenv from "dotenv"
dotenv.config()
import Image from "next/image"
import { PlusCircledIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

import { Album } from "../data/albums"
import { playlists } from "../data/playlists"
import { SearchMovie } from "@/lib/tmdb/types/tmdb-api"
import { generateTMDBImageUrl } from "@/lib/tmdb/src/utils"

interface MovieArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  movie: SearchMovie
  aspectRatio?: "portrait" | "square"
  width?: number
  height?: number
}

export function MovieArtworkSlider({
  movie,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: MovieArtworkProps) {
  console.log('TMDB IMAGE URL:', process.env.TMDB_IMAGE_BASE_URI)
  let imageUrl
  if (aspectRatio === "portrait") {
    imageUrl = generateTMDBImageUrl('poster_sizes', 'w154', movie.poster_path!)
    console.log('Image URL:', imageUrl)
  }
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="overflow-hidden rounded-md">
            <Image
              src={imageUrl!}
              alt={movie.title!}
              width={width}
              height={height}
              className={cn(
                "h-auto w-auto object-cover transition-all hover:scale-105",
                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
              )}
            />
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-40">
          <ContextMenuItem>Add to Library</ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>Add to Playlist</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem>
                <PlusCircledIcon className="mr-2 h-4 w-4" />
                New Playlist
              </ContextMenuItem>
              <ContextMenuSeparator />
              {playlists.map((playlist) => (
                <ContextMenuItem key={playlist}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="mr-2 h-4 w-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 15V6M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM12 12H3M16 6H3M12 18H3" />
                  </svg>
                  {playlist}
                </ContextMenuItem>
              ))}
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem>Play Next</ContextMenuItem>
          <ContextMenuItem>Play Later</ContextMenuItem>
          <ContextMenuItem>Create Station</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Like</ContextMenuItem>
          <ContextMenuItem>Share</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{movie.title}</h3>
        <p className="text-xs text-muted-foreground">Popularity:{movie.popularity}</p>
      </div>
    </div>
  )
}
