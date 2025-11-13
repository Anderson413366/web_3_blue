import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import { ThemeProvider } from '@/lib/ThemeProvider'
import CookieBanner from '@/components/CookieBanner'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Anderson Cleaning | Commercial & Janitorial Services | West Springfield, MA',
  description: 'B2B commercial cleaning with small-business care and big-business systems. Full-time salaried staff, 24/7 support, ≤30-minute response. Serving businesses within 100 miles of West Springfield, MA.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <ThemeProvider>
          {children}
          <CookieBanner />
        </ThemeProvider>
      </body>
    </html>
  )
}
