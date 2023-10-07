import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function NotFound({ params }: { params: { pathname: string } }) {
  return (
    <div className="bg-not-found h-screen w-screen grid items-start justify-center img">
      <Link
        href="/login"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        Back
      </Link>
      <div className="p-20">
        <h2 className='text-center'>{/* {params.pathname} */}Not Found</h2>
        <p>Could not find requested resource</p>
      </div>
    </div>
  )
}
