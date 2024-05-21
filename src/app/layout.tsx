import { Toaster } from '@/components/ui/toaster'
import NextAuthProvider from '@/providers/next-auth-provider'
import '@/styles/globals.css'

import { GeistSans } from 'geist/font/sans'

export const metadata = {
  title: 'Next App Title',
  description: 'Next App Description',
  icons: [{ rel: 'icon', url: '/favicon.ico' }]
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <Toaster />
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  )
}
