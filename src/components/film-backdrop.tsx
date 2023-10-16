/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { cn } from '@/lib/utils/utils'
import { FilmCardList } from '@/components/film-card-list'

export function MovieBackdrop({
  url,
  altText,
  className,
}: {
  className?: string
  url: string
  altText: string
}) {
  return (
    <AspectRatio ratio={16 / 9} className="w-full">
      <img
        src={url}
        alt={altText}
        // width={width}
        // height="200"
        lang="en"
        className={cn('w-full max-w-full object-cover', className)}
      />
    </AspectRatio>
  )
}
