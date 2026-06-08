'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import Image from 'next/image'
import { FloatingParticles } from './floating-particles'
import { RotatingBadge } from './rotating-badge'

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subheadingRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const heading = headingRef.current
    const subheading = subheadingRef.current
    const cta = ctaRef.current
    const image = imageRef.current

    if (!section || !heading || !subheading || !cta || !image) return

    // Initial animations
    const tl = gsap.timeline({ delay: 0.5 })

    tl.fromTo(
      image,
      { scale: 1.2, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: 'power3.out' }
    )
      .fromTo(
        heading.querySelectorAll('.word'),
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.1 },
        '-=1'
      )
      .fromTo(
        subheading,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo(
        cta,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      )

    // Parallax on scroll
    gsap.to(image, {
      y: 100,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div ref={imageRef} className="absolute inset-0 z-0">
        <Image
          src="/images/hero-statues.jpg"
          alt="Golden divine statues"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-beige/60 via-beige/40 to-beige" />
        <div className="absolute inset-0 bg-gradient-to-r from-beige/80 via-transparent to-beige/80" />
      </div>

      {/* Floating particles */}
      <FloatingParticles count={40} className="z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-screen-xl mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-8"
        >
          <span className="inline-block font-sans text-xs tracking-[0.5em] text-gold uppercase border border-gold/30 px-6 py-2">
            Est. 1847
          </span>
        </motion.div>

        <h1
          ref={headingRef}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.9] tracking-[0.05em] text-onyx mb-8"
        >
          <span className="word inline-block">Where</span>{' '}
          <span className="word inline-block text-gradient-gold">Divinity</span>
          <br />
          <span className="word inline-block">Meets</span>{' '}
          <span className="word inline-block text-gradient-gold">Luxury</span>
        </h1>

        <p
          ref={subheadingRef}
          className="font-sans text-lg md:text-xl text-onyx/60 max-w-2xl mx-auto leading-relaxed mb-12"
        >
          Ethereal jewellery collections inspired by Indian royal heritage, 
          handcrafted with rare gemstones and precious metals for those who 
          seek the extraordinary.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            href="/collections"
            className="group relative inline-flex items-center gap-4 font-sans text-sm tracking-[0.3em] text-onyx bg-gold hover:bg-gold-light px-10 py-4 uppercase transition-all duration-500 overflow-hidden"
          >
            <span className="relative z-10">Explore Collections</span>
            <svg 
              className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            <div className="absolute inset-0 bg-gold-light scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
          </Link>

          <Link
            href="/about"
            className="group inline-flex items-center gap-4 font-sans text-sm tracking-[0.3em] text-onyx border border-onyx/30 hover:border-gold hover:text-gold px-10 py-4 uppercase transition-all duration-500"
          >
            <span>Our Heritage</span>
            <svg 
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
      >
        <span className="font-sans text-[10px] tracking-[0.4em] text-onyx/40 uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-12 bg-gradient-to-b from-gold to-transparent"
        />
      </motion.div>

      {/* Rotating Theme Badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-12 right-12 z-20 hidden md:block"
      >
        <RotatingBadge />
      </motion.div>
    </section>
  )
}
