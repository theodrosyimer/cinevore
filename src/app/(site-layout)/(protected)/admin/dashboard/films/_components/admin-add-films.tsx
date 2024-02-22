'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'

import { cn } from '@/lib/utils/utils'
import { type ButtonProps, buttonVariants } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { Icons } from '@/components/icon/icons'

type AddFilmsButtonProps = ButtonProps

export function AddFilmButton({
  className,
  variant,
  ...props
}: AddFilmsButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onClick() {
    setIsLoading(true)

    const response = await fetch('/api/films', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Untitled Post',
      }),
    })

    setIsLoading(false)

    if (!response?.ok) {
      if (response.status === 402) {
        return toast({
          title: 'Limit of 3 items reached.',
          description: 'Please upgrade to the PRO plan.',
          variant: 'destructive',
        })
      }

      return toast({
        title: 'Something went wrong.',
        description: 'User was not created. Please try again.',
        variant: 'destructive',
      })
    }

    // This forces a cache invalidation.
    router.refresh()
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        buttonVariants({ variant }),
        {
          'cursor-not-allowed opacity-60': isLoading,
        },
        className,
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.add className="mr-2 h-4 w-4" />
      )}
      Add Film
    </button>
  )
}
