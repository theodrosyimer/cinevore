'use client'

import { Icons } from '@/components/icon/icons'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils/utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export interface BackButtonProps extends React.HTMLAttributes<HTMLAnchorElement> {
  className?: string
  children?: React.ReactNode
  href?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

export function BackButton({className, children, href, onClick, ...props}: BackButtonProps) {
  const router = useRouter()
  return (
    <>
      <Link
        href={href ?? "#"}
        className={cn(buttonVariants({ variant: 'link' }), className)}
        onClick={onClick ? (e) => onClick(e) : (e) => {
          e.preventDefault()
          router.back()
        }}
        {...props}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          {children ?? 'Back'}
        </>
      </Link>
    </>
  )
}
