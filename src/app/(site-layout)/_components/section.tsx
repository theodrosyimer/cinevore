import { type ComponentPropsWithoutRef, isValidElement } from 'react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils/utils'
import Link from 'next/link'

export type SectionProps = {
  className?: string
  children?: React.ReactNode
}

export function Section(props: SectionProps) {
  return <section className={cn(props.className)}>{props.children}</section>
}

export type SectionContentProps = {
  path: string
  title: string | JSX.Element
  children?: React.ReactNode
  className?: string
}

export function SectionContent(props: SectionContentProps) {
  return (
    <>
      <div
        className={cn(
          'flex items-end justify-between justify-items-center',
          props.className,
        )}
      >
        {typeof props.title === 'string' ? (
          <SectionTitle className="text-md mb-2 uppercase text-muted-foreground">
            {props.title}
          </SectionTitle>
        ) : (
          isValidElement(props.title) && props.title
        )}
        <Link
          href={`${process.env.NEXT_PUBLIC_APP_URL}${props.path}`}
          className={cn(
            'text-sm uppercase',
            buttonVariants({
              variant: 'link',
              className: 'pr-0 text-muted-foreground/50',
            }),
          )}
        >
          More
        </Link>
      </div>
      <div className="mb-4 divide-y divide-border rounded-md border "></div>
      {props.children}
    </>
  )
}

export interface SectionTitleProps extends ComponentPropsWithoutRef<'h2'> {
  className?: string
  children: React.ReactNode
}

export function SectionTitle(props: SectionTitleProps) {
  return (
    <h2 {...props} className={props?.className}>
      {props.children}
    </h2>
  )
}
