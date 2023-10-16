'use client'

import { Icons } from '@/components/icons'
import { cn } from '@/lib/utils/utils'
import type { LucideProps } from 'lucide-react'
import dynamicIconImports from 'lucide-react/dynamicIconImports'
import dynamic from 'next/dynamic'
import { MouseEvent, useEffect, useState } from 'react'

interface IconProps extends LucideProps {}

export default function LikeIcon({
  className,
  size,
}: IconProps & { className?: string; size?: number }) {
  /* { name, ...props }: IconProps */
  const [liked, setLiked] = useState(false)

  // useEffect(() => {
  //   const down = (e: KeyboardEvent) => {
  //     console.log('KEY:', e.key)

  //     if (e.key === 'space' && (e.metaKey || e.ctrlKey)) {
  //       e.preventDefault()
  //       setLiked((likedState) => !likedState)
  //     }
  //   }

  //   document.addEventListener('keydown', down)
  //   return () => document.removeEventListener('keydown', down)
  // }, [])

  function handleLike(e: MouseEvent) {
    e.preventDefault()
    setLiked(!liked)
  }
  return (
    <>
      {liked ? (
        <Icons.like
          onKeyDown={(e) => {
            console.log('KEY:', e.key)

            if (e.key === 'space') {
              e.preventDefault()
              setLiked((likedState) => !likedState)
            }
          }}
          onClick={handleLike}
          size={size}
          className={cn('', className)}
          fill="red"
          stroke="red"
        />
      ) : (
        <Icons.like
          onClick={handleLike}
          size={size}
          className={cn('', className)}
        />
      )}
    </>
  )
}
