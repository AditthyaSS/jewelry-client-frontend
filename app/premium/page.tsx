'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import Image from 'next/image'
import { LuxuryCursor } from '@/components/luxury-cursor'
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

gsap.registerPlugin(ScrollTrigger)

const premiumCollections = [
  { name: 'Necklaces', image: '/images/collection_temple.png', pieces: 24 },
  { name: 'Earrings', image: '/images/collection_kundan.jpg', pieces: 18 },
  { name: 'Bangles', image: '/images/collection_rajputana.png', pieces: 16 },
  { name: 'Rings', image: '/images/collection_nizam.png', pieces: 20 },
  { name: 'Temple Collection', image: '/images/collection_lakshmi.png', pieces: 32 },
]

const heritageValues = [
  { title: 'Sacred Craft', description: 'Each piece is created following ancient Vedic traditions, blessed at every stage of creation.' },
  { title: 'Temple Fire', description: 'Our gold is purified through sacred fire rituals, ensuring divine purity in every grain.' },
  { title: 'Divine Stones', description: 'Gemstones are selected based on Navaratna traditions, channeling cosmic energy through each jewel.' },
  { title: 'Artisan Lineage', description: 'Our master goldsmiths carry forward a legacy spanning seven generations of temple artistry.' },
]

export default function PremiumPage() {
  const heroRef = useRef<HTMLElement>(null)
  const collectionsRef = useRef<HTMLDivElement>(null)
  const heritageRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    const collections = collectionsRef.current
    const heritage = heritageRef.current
    const cta = ctaRef.current

    if (hero) {
      const tl = gsap.timeline()

      // 1. Initial Divine Sign
      tl.to('#curtain-lotus', { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.inOut' })
        .to('#curtain-glow', { opacity: 0.4, duration: 1, ease: 'power2.out' }, '-=0.5')
        
      // 2. The Reveal
      tl.to('#divine-curtain', { opacity: 0, duration: 1.5, ease: 'power2.inOut' }, '+=0.5')
        .to('#premium-main', { opacity: 1, duration: 2, ease: 'power2.out' }, '-=1.2')
        .to('#divine-curtain', { display: 'none' })

      // 3. Hero Elements (already in your code, but now part of the flow)
      tl.fromTo(
        hero.querySelectorAll('.temple-hero-text'),
        { y: 60, opacity: 0, filter: 'blur(10px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.5, stagger: 0.3, ease: 'power3.out' },
        '-=1.5'
      )
    }

    if (collections) {
      gsap.fromTo(
        collections.querySelectorAll('.temple-card'),
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: collections, start: 'top 80%' },
        }
      )
    }

    if (heritage) {
      gsap.fromTo(
        heritage.querySelectorAll('.heritage-card'),
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: heritage, start: 'top 80%' },
        }
      )
    }

    if (cta) {
      gsap.fromTo(
        cta.children,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: cta, start: 'top 85%' },
        }
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <div className="premium-page relative overflow-hidden">
      {/* Divine Reveal Curtain */}
      <div 
        id="divine-curtain"
        className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
        style={{ background: '#1a0a05' }}
      >
        <div className="relative">
          <img src="/images/premium/lotus.png" id="curtain-lotus" alt="" className="w-24 opacity-0 scale-50" />
          <div id="curtain-glow" className="absolute inset-0 bg-[#8b6914] blur-3xl opacity-0 scale-150 rounded-full" />
        </div>
      </div>

      <LuxuryCursor />
      <SmoothScrollProvider>

        <main id="premium-main" className="opacity-0" style={{ background: '#2a1510' }}>

          {/* ====== HERO FRAME — ONE SCREEN, EXACT DIMENSIONS ====== */}
          <section ref={heroRef} className="relative w-full" style={{ aspectRatio: '16/10' }}>

            {/* Frame background — exact fit, no stretching */}
            <img
              src="/images/premium/framefinal.png"
              alt=""
              className="absolute inset-0 w-full h-full z-0"
              style={{ objectFit: 'fill' }}
            />

            {/* In-frame navigation bar — precisely positioned over the frame's nav slots */}
            <div className="absolute top-[6.8%] left-0 right-0 z-30 h-[6%] pointer-events-none">

              {/* Left Side Links (3 boxes: Collections, About, Atelier) */}
              <div className="absolute left-[11.5%] w-[33%] h-full flex items-center justify-between pointer-events-auto">
                {[
                  { href: '/collections', label: 'Collections' },
                  { href: '/about', label: 'About' },
                  { href: '/atelier', label: 'Atelier' },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex-1 text-center transition-colors duration-300 hover:text-[#8b6914] px-1"
                    style={{
                      fontFamily: 'Vireo, sans-serif',
                      fontSize: 'clamp(0.45rem, 0.8vw, 0.85rem)',
                      fontWeight: 700,
                      color: '#4a321f',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Right Side - Premium Box */}
              <div className="absolute left-[54.5%] w-[11.5%] h-full flex items-center justify-center pointer-events-auto">
                <Link
                  href="/premium"
                  className="text-center transition-colors duration-300 hover:text-[#8b6914]"
                  style={{
                    fontFamily: 'Vireo, sans-serif',
                    fontSize: 'clamp(0.45rem, 0.8vw, 0.85rem)',
                    fontWeight: 700,
                    color: '#4a321f',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}
                >
                  Premium
                </Link>
              </div>

              {/* Right Side - Contact Box (Moved 1cm further left) */}
              <div className="absolute left-[65%] w-[11.5%] h-full flex items-center justify-center pointer-events-auto">
                <Link
                  href="/contact"
                  className="text-center transition-colors duration-300 hover:text-[#8b6914]"
                  style={{
                    fontFamily: 'Vireo, sans-serif',
                    fontSize: 'clamp(0.45rem, 0.8vw, 0.85rem)',
                    fontWeight: 700,
                    color: '#4a321f',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}
                >
                  Contact
                </Link>
              </div>

              {/* Cart Icon Box (Moved 1.5cm further left) */}
              <div className="absolute left-[76.8%] w-[6.5%] h-full flex items-center justify-center pointer-events-auto">
                <Link href="/collections" className="flex items-center justify-center transition-transform hover:scale-110">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#4a321f" strokeWidth="2.5" className="w-4 h-4 md:w-5 md:h-5">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 01-8 0" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Content overlaid inside the frame */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-8" style={{ paddingTop: '10%' }}>

              {/* Goddess Lakshmi */}
              <div className="temple-hero-text mb-4">
                <img
                  src="/images/premium/godessfinal.png"
                  alt="Goddess Lakshmi"
                  className="w-40 md:w-56 lg:w-72 mx-auto"
                  style={{ filter: 'drop-shadow(0 8px 30px rgba(139, 105, 20, 0.5))' }}
                />
              </div>

              {/* Brand Name */}
              <h1 className="temple-hero-text mb-1" style={{ fontFamily: 'Samarkan, sans-serif', fontSize: 'clamp(2rem, 6vw, 6rem)', fontWeight: 400, letterSpacing: '0.05em', color: '#8b6914', textTransform: 'uppercase' }}>
                Vinod Jewellers
              </h1>
              <p className="temple-hero-text" style={{ fontFamily: 'Vireo, sans-serif', fontSize: '0.7rem', letterSpacing: '0.6em', color: '#a0822e', textTransform: 'uppercase', marginTop: '-10px' }}>
                Jewellers
              </p>

              {/* Divider */}
              <div className="temple-hero-text temple-divider my-4">
                <img src="/images/premium/lotus.png" alt="" className="w-5 md:w-6" />
              </div>

              {/* Tagline */}
              <p className="temple-hero-text" style={{ fontFamily: 'Isabella, serif', fontSize: 'clamp(1rem, 2vw, 1.8rem)', color: '#6b3a2a', letterSpacing: '0.05em' }}>
                Timeless Beauty. Divine Legacy.
              </p>
            </div>
          </section>

          {/* ====== COLLECTIONS SHOWCASE ====== */}
          <section className="py-16 md:py-24 px-6 md:px-12 temple-parchment">

            {/* Section Header */}
            <div className="text-center mb-14">
              <div className="temple-divider mb-4">
                <img src="/images/premium/lotus.png" alt="" className="w-8" />
              </div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#8b6914', letterSpacing: '0.15em', fontWeight: 300, textTransform: 'uppercase' }}>
                Explore Our Collection
              </h2>
            </div>

            {/* Collection Grid */}
            <div ref={collectionsRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
              {premiumCollections.map((item) => (
                <Link
                  key={item.name}
                  href="/collections"
                  className="temple-card group"
                >
                  <div className="relative aspect-square overflow-hidden rounded-t-lg">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#f5e6c8]/60 to-transparent" />
                  </div>
                  <div className="p-4 text-center" style={{ borderTop: '1px solid rgba(201, 168, 76, 0.3)' }}>
                    <p style={{ fontFamily: 'Isabella, serif', fontSize: '1.2rem', color: '#3d1c10', letterSpacing: '0.05em', fontWeight: 400 }}>
                      {item.name}
                    </p>
                    <p style={{ fontFamily: 'Vireo, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', color: '#a0822e', marginTop: '4px', textTransform: 'uppercase' }}>
                      {item.pieces} Pieces
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ====== HERITAGE VALUES ====== */}
          <section className="py-16 md:py-24 px-6 md:px-12 temple-parchment" style={{ background: 'linear-gradient(180deg, #efe0c4 0%, #f5e6c8 50%, #efe0c4 100%)' }}>

            {/* Section Header */}
            <div className="text-center mb-14">
              <div className="temple-divider mb-4">
                <img src="/images/premium/lotus.png" alt="" className="w-8" />
              </div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#8b6914', letterSpacing: '0.15em', fontWeight: 300, textTransform: 'uppercase' }}>
                The Sacred Heritage
              </h2>
              <p className="mt-4 max-w-2xl mx-auto" style={{ fontFamily: 'Isabella, serif', fontSize: '1.4rem', color: '#6b3a2a', lineHeight: 1.6 }}>
                Every ornament tells a story of devotion, carrying the blessings of centuries-old temple traditions
              </p>
            </div>

            {/* Heritage Grid */}
            <div ref={heritageRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {heritageValues.map((value) => (
                <div
                  key={value.title}
                  className="heritage-card text-center p-6 relative"
                  style={{ background: 'linear-gradient(135deg, rgba(245, 230, 200, 0.6), rgba(248, 236, 212, 0.9))', border: '2px solid rgba(201, 168, 76, 0.4)', borderRadius: '12px' }}
                >
                  <img src="/images/premium/lotus.png" alt="" className="w-10 mx-auto mb-4 opacity-60" />
                  <h3 style={{ fontFamily: 'Isabella, serif', fontSize: '1.5rem', color: '#8b6914', letterSpacing: '0.05em', marginBottom: '8px' }}>
                    {value.title}
                  </h3>
                  <p style={{ fontFamily: 'Vireo, sans-serif', fontSize: '0.8rem', color: '#6b3a2a', lineHeight: 1.7, opacity: 0.8 }}>
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ====== TEMPLE STORY SECTION ====== */}
          <section className="py-16 md:py-24 px-6 md:px-12 temple-parchment">
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              {/* Image */}
              <div className="relative overflow-hidden rounded-t-[50%] border-2 border-[#c9a84c] aspect-[3/4]">
                <Image
                  src="/images/collection_meenakari.png"
                  alt="Temple Gold Heritage"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#f5e6c8]/30 to-transparent" />
              </div>

              {/* Text */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#c9a84c]" />
                  <img src="/images/premium/lotus.png" alt="" className="w-8" />
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#c9a84c]" />
                </div>
                <h2 style={{ fontFamily: 'Isabella, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#8b6914', letterSpacing: '0.05em', fontWeight: 400, marginBottom: '20px' }}>
                  Forged in Temple Fires
                </h2>
                <p style={{ fontFamily: 'Vireo, sans-serif', fontSize: '1.1rem', color: '#6b3a2a', lineHeight: 1.8, marginBottom: '16px' }}>
                  For centuries, the master artisans of South India have crafted jewelry not merely as adornment, but as offerings to the divine. Each piece from our temple collection carries the weight of this sacred tradition.
                </p>
                <p style={{ fontFamily: 'Vireo, sans-serif', fontSize: '1.1rem', color: '#6b3a2a', lineHeight: 1.8, marginBottom: '24px' }}>
                  From the intricate Kundan settings of Rajasthan to the luminous Polki diamonds of the Mughal courts, our artisans weave together India&apos;s richest jewelry traditions into masterpieces fit for royalty.
                </p>
                <Link
                  href="/atelier"
                  className="inline-flex items-center gap-3 text-xs tracking-[0.3em] uppercase transition-all duration-300 hover:gap-5"
                  style={{ fontFamily: 'Vireo, sans-serif', color: '#8b6914', borderBottom: '1px solid #c9a84c', paddingBottom: '4px' }}
                >
                  Visit Our Atelier
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>

          {/* ====== CTA SECTION ====== */}
          <section ref={ctaRef} className="py-20 md:py-28 px-6 text-center relative overflow-hidden temple-parchment">

            {/* Shimmer overlay */}
            <div className="absolute inset-0 temple-shimmer pointer-events-none" />

            <div className="relative z-10 max-w-5xl mx-auto">
              {/* Ceremonial Ornaments - Even Larger */}
              <div className="flex items-center justify-center gap-10 md:gap-24 mb-12">
                <img src="/images/premium/diya.png" alt="" className="w-32 md:w-52 opacity-90 animate-pulse" style={{ filter: 'drop-shadow(0 0 35px rgba(139, 105, 20, 0.5))' }} />
                <img src="/images/premium/lotus.png" alt="" className="w-24 md:w-32" />
                <img src="/images/premium/diya.png" alt="" className="w-32 md:w-52 opacity-90 animate-pulse" style={{ filter: 'drop-shadow(0 0 35px rgba(139, 105, 20, 0.5))' }} />
              </div>

              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: '#8b6914', letterSpacing: '0.1em', fontWeight: 300, marginBottom: '24px', textTransform: 'uppercase' }}>
                Your Divine Heirloom Awaits
              </h2>
              <p style={{ fontFamily: 'Isabella, serif', fontSize: '1.4rem', color: '#6b3a2a', lineHeight: 1.6, marginBottom: '32px' }}>
                Commission a bespoke temple masterpiece. Work with our sacred artisans to create an heirloom that transcends generations.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-10 py-4 text-xs tracking-[0.3em] uppercase transition-all duration-500 hover:scale-105"
                style={{ fontFamily: 'Vireo, sans-serif', color: '#f5e6c8', background: 'linear-gradient(135deg, #6b3a2a, #8b5a3a, #6b3a2a)', border: '2px solid #c9a84c', boxShadow: '0 4px 30px rgba(139, 105, 20, 0.3), inset 0 1px 0 rgba(201, 168, 76, 0.3)' }}
              >
                Book Sacred Consultation
              </Link>
            </div>
          </section>

        </main>

        <Footer />
      </SmoothScrollProvider>
    </div>
  )
}
