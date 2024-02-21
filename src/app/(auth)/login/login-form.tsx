'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { redirect, useSearchParams } from 'next/navigation'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { type z } from 'zod'

import { Icons } from '@/components/icon/icons'
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils/utils'
import { insertLoginUserSchema } from '@/lib/validations/auth'

// interface UserAuthFormProps extends React.ComponentPropsWithoutRef<'div'> {}
type FormData = z.infer<typeof insertLoginUserSchema>

export function UserLoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(insertLoginUserSchema),
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false)
  const searchParams = useSearchParams()
  // const pathname = usePathname()

  // const isRegisterPage = pathname === '/register'

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    const signInResult = await signIn('credentials', {
      email: data.email.toLowerCase(),
      password: data.password,
      name: data.name,
      redirect: false,
      callbackUrl: searchParams?.get('from') ?? '/me',
    })

    // console.log('signInResult', signInResult)

    setIsLoading(false)

    if (!signInResult?.ok) {
      toast({
        title: 'Something went wrong.',
        description: 'Your sign in request failed. Please try again.',
        variant: 'destructive',
      })
      // return router.push('/login')
      redirect(/* authOptions?.pages?.signIn ??  */ '/login')
    }

    toast({
      title: 'Logged in.',
      // description: 'Your account has been created.',
    })
    // return router.push(/* signInResult?.url ??  */ '/me')
    redirect(/* authOptions?.pages?.signIn ??  */ '/me')
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              autoFocus
              disabled={isLoading || isGitHubLoading}
              {...register('email')}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          {
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="name">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Enter your username..."
                type="text"
                autoCapitalize="none"
                autoComplete="text"
                autoCorrect="off"
                disabled={isLoading || isGitHubLoading}
                {...register('name')}
              />
              {errors?.name && (
                <p className="px-1 text-xs text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>
          }
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="password"
              type="password"
              disabled={isLoading || isGitHubLoading}
              {...register('password')}
            />
            {errors?.password && (
              <p className="px-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
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
      </div>
      <div className="grid gap-2">
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isLoading || isGitHubLoading}
            {...register("email")}
          />
          {errors?.email && (
            <p className="px-1 text-xs text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>
        <button className={cn(buttonVariants({ variant: "outline" }))} disabled={isLoading}>
          {isLoading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Sign In with Email
        </button>
      </div> */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or {/*{continue with} */}
          </span>
        </div>
      </div>
      <button
        type="button"
        className={cn(buttonVariants({ variant: 'outline' }))}
        onClick={async () => {
          setIsGitHubLoading(true)
          await signIn('github', {
            callbackUrl: searchParams?.get('from') ?? '/me',
          })
        }}
        disabled={isLoading || isGitHubLoading}
      >
        {isGitHubLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{' '}
        Github
      </button>
    </div>
  )
}
