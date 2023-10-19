/* eslint-disable @next/next/no-img-element */

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { cn } from '@/lib/utils/utils'

export function MovieBackdrop({
  url,
  altText,
  className,
  children,
}: {
  className?: string
  url: string
  altText: string
  children?: React.ReactNode
}) {
  return (
    <>
      <AspectRatio
        ratio={16 / 9}
        className="relative grid w-full overflow-hidden bg-cover bg-[0%] bg-no-repeat"
      >
        <img
          src={url}
          alt={altText}
          // width={width}
          // height="200"
          lang="en"
          className={cn('w-full max-w-full object-cover ', className)}
        />
        <div className="absolute bottom-0 left-0 top-0 h-full w-72 overflow-hidden bg-gradient-to-r from-background from-[2rem]  opacity-100"></div>
        <div className="absolute bottom-0 right-0 top-0 h-full w-72 overflow-hidden bg-gradient-to-l from-background from-[2rem]  opacity-100"></div>
        <div className="absolute bottom-0  h-72 w-full overflow-hidden bg-gradient-to-t from-background from-[2rem]  opacity-100"></div>
      </AspectRatio>
      {children}
    </>
  )
}
