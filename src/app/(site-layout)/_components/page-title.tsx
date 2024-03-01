import { cn } from '@/lib/utils/utils'

export type PageTitleProps = {
  children: React.ReactNode
  className?: string
}

export function PageTitle(props: PageTitleProps) {
  return (
    <h1
      className={cn(
        'text-left font-bold sm:text-xl md:text-3xl lg:text-4xl',
        props?.className,
      )}
    >
      {props.children}
    </h1>
  )
}
