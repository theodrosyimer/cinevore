'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Icons } from '@/components/icon/icons'
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils/utils'
import { insertListSchema } from '@/lib/validations/routes/list'
import { Textarea } from '@/components/ui/textarea'

interface NewListFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof insertListSchema>

export function NewReviewForm({ className, ...props }: NewListFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(insertListSchema),
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/lists`,
      {
        method: 'POST',
      },
    ).catch((error) => {
      toast({
        title: 'Server error. Please try later.',
        description: `${error.message}`,
        variant: 'destructive',
      })
      return
    })

    setIsLoading(false)

    if (!response?.ok) {
      toast({
        title: 'Something went wrong.',
        description: 'Your list was not created. Please try again.',
        variant: 'destructive',
      })
      return router.push('/list/new')
    }

    toast({
      title: `List "${data.title}" created.`,
      description: 'Your account has been created.',
    })
    return router.push(response?.url ?? '/me')
  }

  return (
    <div className={cn('', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
        <div className="grid gap-2 md:grid-cols-2">
          <div className="grid items-start gap-2">
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="title">
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="Title"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="text"
                  autoCorrect="off"
                  autoFocus
                  disabled={isLoading || isGitHubLoading}
                  {...register('title')}
                />
                {errors?.title && (
                  <p className="px-1 text-xs text-red-600">
                    {errors.title.message}
                  </p>
                )}
              </div>
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="privacy">
                  Tags
                </Label>
                <Input
                  id="privacy"
                  placeholder="privacy"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="text"
                  autoCorrect="off"
                  autoFocus
                  disabled={isLoading || isGitHubLoading}
                  {...register('isPrivate')}
                />
                {errors?.isPrivate && (
                  <p className="px-1 text-xs text-red-600">
                    {errors.isPrivate.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="description">
              Description
            </Label>
            <Textarea
              placeholder="Type your description here."
              id="description"
              disabled={isLoading || isGitHubLoading}
              className="h-64"
              {...register('description')}
            />
            {errors?.description && (
              <p className="px-1 text-xs text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button
            className={cn(buttonVariants({ variant: 'secondary' }))}
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Cancel
          </button>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save
          </button>
        </div>
      </form>
      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or
          </span>
        </div>
      </div> */}
      {/* <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={() => {
          setIsGitHubLoading(true)
        }}
        disabled={isLoading || isGitHubLoading}
      >
        {isGitHubLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </button> */}
    </div>
  )
}
