import '@/styles/globals.css'
import { Inter } from 'next/font/google'

import ReactQueryProvider from '@/providers/react-query'
// import ThemeContextProvider from '@/contexts/theme'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ThemeProvider } from '@/components/theme-provider'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Cinevore',
  description: 'Cinevore your social network for film discovery.',
}

export default function RootLayout({
  children }: {
    children: React.ReactNode
  }) {
  return (
    <html lang="en">
      <body className={cn(
        "min-h-screen grid grid-rows-layout font-sans antialiased",
        inter.className,
        // fontSans.variable,
        // fontHeading.variable
      )}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ReactQueryProvider>
            {/* <Header /> */}
            {children}
            {/* <Footer /> */}
            <TailwindIndicator />

          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
