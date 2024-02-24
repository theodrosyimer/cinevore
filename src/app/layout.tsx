import { ourFileRouter } from '@/app/api/uploadthing/core'
import { TailwindIndicator } from '@/app/_components/tailwind-indicator'
import { ThemeProvider } from '@/app/_providers/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils/utils'
import { ReactQueryProvider } from '@/providers/react-query'
import '@/styles/globals.css'
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin'
import { Inter as FontSans } from 'next/font/google'
import localFont from 'next/font/local'
import { extractRouterConfig } from 'uploadthing/server'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { env } from '@/env'

// const inter = Inter({ subsets: ['latin'] })
const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

// Font files can be colocated inside of `pages`
const fontHeading = localFont({
  src: '../assets/fonts/CalSans-SemiBold.woff2',
  variable: '--font-heading',
})

interface RootLayoutProps {
  children: React.ReactNode
}

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Cinema',
    'Films',
    'Movies',
    'Social Network',
    'Reviews',
    'TheMovieDB API',
    'Next.js',
    'React',
    'Tailwind CSS',
    'Server Components',
    'Radix UI',
    'React-Query',
  ],
  authors: [
    {
      name: 'theodros yimer',
      url: 'https://github.com/theodrosyimer',
    },
  ],
  creator: 'Theodros Yimer',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: '@thyi',
  },
  icons: {
    icon: [
      {
        rel: 'icon',
        url:
          env.NODE_ENV === 'production' ? '/favicon.ico' : '/favicon-dev.ico',
      },
      // { url: '/icon-dark.png', media: '(prefers-color-scheme: dark)' },
    ],
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={cn(
          'grid min-h-svh w-screen grid-rows-layout font-sans antialiased',
          // inter.className,
          fontSans.variable,
          fontHeading.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ReactQueryProvider>
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
            {children}
            <Toaster />
            <TailwindIndicator />
          </ReactQueryProvider>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}
