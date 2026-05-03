import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'World Clock — clock.harshz.com',
  description: 'Live time across 120+ cities. Pin your timezones, compare times, find meeting overlaps.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[#080808] text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
