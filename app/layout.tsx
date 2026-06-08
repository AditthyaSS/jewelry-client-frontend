import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Vrishva Aura | Ultra Premium Luxury Jewellery',
  description: 'Where divinity meets luxury. Discover ethereal jewellery collections inspired by Indian royal heritage, handcrafted with rare gemstones and precious metals.',
  keywords: ['luxury jewellery', 'divine jewellery', 'premium jewellery', 'heritage collection', 'indian jewellery', 'kundan polki'],
  authors: [{ name: 'Vrishva Aura' }],
  openGraph: {
    title: 'Vrishva Aura | Ultra Premium Luxury Jewellery',
    description: 'Where divinity meets luxury. Discover ethereal jewellery collections inspired by Indian royal heritage.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#faf9f6',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} bg-background`}>
      <body className="font-sans antialiased overflow-x-hidden">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
