/* eslint-disable @next/next/no-img-element */

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { cn } from '@/lib/utils/utils'

export function MovieBackdrop({
  url,
  altText,
  className,
  aspectRatio = 16 / 9,
  children,
}: {
  className?: string
  url: string
  altText: string
  children?: React.ReactNode
  aspectRatio?: number
}) {
  return (
    <>
      <AspectRatio
        ratio={aspectRatio}
        className="relative grid overflow-hidden bg-cover bg-[0%] bg-no-repeat"
      >
        <img
          src={url}
          alt={altText}
          // width={width}
          // height="200"
          lang="en"
          className={cn(' max-w-full object-cover ', className)}
        />
        <div className="absolute bottom-0 left-0 top-0 h-full overflow-hidden bg-gradient-to-r from-background from-[2rem] opacity-100 sm:w-16 md:w-36 lg:w-72"></div>
        <div className="absolute bottom-0 right-0 top-0 h-full overflow-hidden bg-gradient-to-l from-background from-[2rem] opacity-100 sm:w-16 md:w-36  lg:w-72"></div>
        <div className="absolute bottom-0 h-16 w-full overflow-hidden bg-gradient-to-t from-background from-[2rem] opacity-100 md:h-36 lg:h-72"></div>
      </AspectRatio>
      {children}
    </>
  )
}
