import Link from 'next/link'

import { cn } from '@/lib/utils/utils'
import { buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/icon/icons'
import { UserRegisterForm } from '@/app/(auth)/register/register-form'

export const metadata = {
  title: 'Create an account',
  description: 'Create an account to get started.'
}

export default function RegisterPage() {
  return (
    <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/login"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 md:right-8 md:top-8',
        )}
      >
        Login
      </Link>
      {/* <MovieBackdrop
        url={`${globalConfig.IMAGE_BASE_URI}/w780/jxjkQcaDsedyX0EubnZ1lW9Tfp.jpg`}
        altText="training day poster image"
        className="rounded-b-md opacity-40"
        aspectRatio={0.667}
      ></MovieBackdrop> */}
      <div className="relative hidden h-full bg-muted lg:block">
        {/* <div className="absolute bottom-0 right-0 top-0 h-full w-60 overflow-hidden bg-gradient-to-l from-background from-[2rem]  opacity-100"></div> */}
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Icons.logo className="mx-auto h-6 w-6" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your credentials below to create your account
            </p>
          </div>
          <UserRegisterForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{' '}
            <Link
              href="/terms"
              className="hover:text-brand underline underline-offset-4"
            >
              Terms of Use
            </Link>{' '}
            and{' '}
            <Link
              href="/privacy"
              className="hover:text-brand underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
