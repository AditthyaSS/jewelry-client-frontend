import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter, Playfair_Display, Montserrat } from 'next/font/google'
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

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Vinod Jewellers | Crafted with Love, Cherished for Generations',
  description: 'Where Art Meets Emotion. Discover the heart of Vinod Jewellers — for over three decades, a beacon of trust and craftsmanship in fine jewellery. Bengaluru.',
  keywords: ['luxury jewellery', 'Vinod Jewellers', 'heritage jewellery', 'indian jewellery', 'gold jewellery', 'diamond jewellery', 'Bengaluru jewellery'],
  authors: [{ name: 'Vinod Jewellers' }],
  openGraph: {
    title: 'Vinod Jewellers | Crafted with Love, Cherished for Generations',
    description: 'Where Art Meets Emotion. Discover the heart of Vinod Jewellers — for over three decades, a beacon of trust and craftsmanship.',
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
    <html lang="en" className={`${cormorant.variable} ${inter.variable} ${playfair.variable} ${montserrat.variable} bg-background`}>
      <body className="font-sans antialiased overflow-x-hidden">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
