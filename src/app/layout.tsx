import '@/styles/globals.css'
import { Providers } from '@/providers/react-query'
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin'
import { Inter as FontSans } from 'next/font/google'
import localFont from 'next/font/local'
import { extractRouterConfig } from 'uploadthing/server'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils/utils'
import { ourFileRouter } from '@/app/api/uploadthing/core'

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
  creator: 'theodros yimer',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
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
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  // manifest: `${siteConfig.url}/site.webmanifest`,
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'grid min-h-screen w-screen grid-rows-layout font-sans antialiased',
          // inter.className,
          fontSans.variable,
          fontHeading.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Providers>
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
            {children}
            <Toaster />
            <TailwindIndicator />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
