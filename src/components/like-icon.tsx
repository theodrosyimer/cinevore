'use client'

import { Icons } from '@/components/icons'
import type { LucideProps } from 'lucide-react'
import dynamicIconImports from 'lucide-react/dynamicIconImports'
import dynamic from 'next/dynamic'
import { useState } from 'react'

interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports
}

export default function LikeIcon(
  /* { name, ...props }: IconProps */
) {
  const [liked, setLiked] = useState(false)
  // const LucideIcon = dynamic(dynamicIconImports[name])


  // return <LucideIcon {...props} />
  return (
    <>
      {liked
        ? <Icons.like onClick={e => {
          e.preventDefault()
          setLiked(!liked)
        }} fill="red" stroke="red" />
        : < Icons.like onClick={e => {
          e.preventDefault()
          setLiked(!liked)
        }} />}
    </>
  )
}
