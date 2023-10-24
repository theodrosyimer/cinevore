'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import * as React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Icons } from '@/components/icons'
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils/utils'
import { insertListSchema } from '@/lib/validations/list'
import { Textarea } from '@/components/ui/textarea'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { User } from 'next-auth'
import { handleSlug } from '@/lib/utils/slugify'
import { useState } from 'react'
import { SelectList, SelectMovie, SelectUser } from '@/types/db'
import {
  AlertDialogHeader,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog'
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from '@radix-ui/react-alert-dialog'

interface NewListFormProps extends React.HTMLAttributes<HTMLDivElement> {
  user: User
  list?: SelectList & {
    movies: {
      movieId: number
      listId: number
      addedAt: Date
      movie: SelectMovie
    }[]
    user?: Omit<SelectUser, 'password'>
  }
}

type FormData = z.infer<typeof insertListSchema>

const defaultValues: FormData = {
  title: '',
  description: '',
  isPrivate: false,
}

async function deleteUser(userId: string) {
  const response = await fetch(`/api/users/${userId}`, {
    method: 'DELETE',
    credentials: 'include',
  })

  if (!response?.ok) {
    toast({
      title: 'Something went wrong.',
      description: 'Your post was not deleted. Please try again.',
      variant: 'destructive',
    })
  }

  return true
}
export function NewListForm({
  user,
  list,
  className,
  ...props
}: NewListFormProps) {
  const {
    watch,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(insertListSchema),
    defaultValues: {
      title: list?.title || '',
      description: list?.description || '',
      isPrivate: list?.isPrivate || false,
    },
  })
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false)
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const isPrivate = watch('isPrivate')

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    const response = await fetch(
      list ? `/api/lists/${list.id}` : '/api/lists',
      {
        method: list ? 'PATCH' : 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          // need to convert string to boolean by coercing it to a number with the + operator and then interpreting the result as a boolean (0 = false, 1 = true)
          isPrivate: isPrivate && +isPrivate,
        }),
      },
    ).catch((error) => {
      toast({
        title: 'Server error. Please try later.',
        description: `${error.message}`,
        variant: 'destructive',
      })
      return
    })
    console.log('response:', response)

    setIsLoading(false)

    if (!response?.ok) {
      toast({
        title: 'Something went wrong.',
        description: 'Your list was not created. Please try again.',
        variant: 'destructive',
      })
      return router.refresh()
    }

    toast({
      title: `Your list was successfully ${list ? 'updated' : 'created'}.`,
    })

    return router.push('/me/lists')
  }

  return (
    <div className={cn('', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
        <div className="mb-4 grid gap-2 md:grid-cols-2">
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
                  disabled={isLoading}
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
                  Privacy
                </Label>
                <Controller
                  control={control}
                  name="isPrivate"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Privacy settings"
                          className="placeholder-muted-foreground"
                        />
                        {errors?.isPrivate && (
                          <p className="px-1 text-xs text-red-600">
                            {errors.isPrivate.message}
                          </p>
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Privacy</SelectLabel>
                          <SelectItem value="0">Public</SelectItem>
                          <SelectItem value="1">Private</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="description">
              Description
            </Label>
            <Textarea
              placeholder="Describe what makes this list unique."
              id="description"
              disabled={isLoading}
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
          {list ? (
            <button
              onClick={() => setShowDeleteAlert(true)}
              className={cn(buttonVariants({ variant: 'destructive' }))}
              disabled={isLoading}
            >
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Delete
            </button>
          ) : null}
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save
          </button>
        </div>
      </form>
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete this post?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={async (event) => {
                  event.preventDefault()
                  setIsDeleteLoading(true)

                  const deleted = await deleteUser(user.id.toString())

                  if (deleted) {
                    setIsDeleteLoading(false)
                    setShowDeleteAlert(false)
                    router.refresh()
                  }
                }}
                className="bg-red-600 focus:ring-red-600"
              >
                {isDeleteLoading ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Icons.trash className="mr-2 h-4 w-4" />
                )}
                <span>Delete</span>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  )
}
