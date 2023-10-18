'use client'

import { Icons } from '@/components/icons'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils/utils'
import Link from 'next/link'
import router from 'next/router'

export type BackButtonProps = {}

export function BackButton(props: BackButtonProps) {
  return (
    <>
      <Link
        href="#"
        className={cn(buttonVariants({ variant: 'link' }), '')}
        onClick={(e) => {
          e.preventDefault()
          router.back()
        }}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>
    </>
  )
}
