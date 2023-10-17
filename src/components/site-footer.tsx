import * as React from 'react'

import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils/utils'
import { Icons } from '@/components/icons'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { footerConfig } from '@/config/footer'

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn('container', className)}>
      {footerConfig.map((item) => (
        <Link
          key={item.title}
          href={item.href}
          className={cn(buttonVariants({ variant: 'link' }))}
        >
          {item.title}
        </Link>
      ))}
      <div className="flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:justify-items-center md:gap-2 md:px-0">
          <Icons.logo />
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{' '}
            <a
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Theodros YIMER
            </a>
            . Hosted on{' '}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Vercel
            </a>
            . Film data from{' '}
            <a
              href="https://developer.themoviedb.org/docs"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              TMDB
            </a>
            . The source code is available on{' '}
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
