'use client'

import { useState } from 'react'
import { Preloader } from '@/components/preloader'
import { LuxuryCursor } from '@/components/luxury-cursor'
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider'
import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { CollectionsShowcase } from '@/components/collections-showcase'
import { HeritageSection } from '@/components/heritage-section'
import { FeaturedPieces } from '@/components/featured-pieces'
import { TestimonialsSection } from '@/components/testimonials-section'
import { Footer } from '@/components/footer'

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {/* Preloader */}
      <Preloader onComplete={() => setIsLoading(false)} />

      {/* Custom cursor */}
      <LuxuryCursor />

      {/* Main content */}
      {!isLoading && (
        <SmoothScrollProvider>
          <Header />
          <main>
            <HeroSection />
            <CollectionsShowcase />
            <HeritageSection />
            <FeaturedPieces />
            <TestimonialsSection />
          </main>
          <Footer />
        </SmoothScrollProvider>
      )}
    </>
  )
}
