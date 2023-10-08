/* eslint-disable @next/next/no-img-element */
import Image from "next/image"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { cn } from "@/lib/utils"

export function MovieBackdrop({ url, altText, ...className }: { className?: string, url: string, altText: string }) {
  return (
    <AspectRatio ratio={16 / 9} className={cn("bg-muted", className)}>
      {/* <Image
        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
        alt="Photo by Drew Beamer"
        fill
        className="rounded-md object-cover"
      /> */}
      <img
        src={url}
        alt={altText}
        // width={width}
        // height="200"
        lang="en"
        className={cn(
          "object-cover rounded-md",
        )}
      />
    </AspectRatio>
  )
}
