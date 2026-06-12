'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const pillars = [
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: 'Purity',
    description: 'Hallmarked jewellery for guaranteed authenticity. Every piece certified for your peace of mind.',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: 'Transparency',
    description: 'Transparent making charges for unbeatable value. No hidden costs, ever.',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" strokeWidth="2" />
      </svg>
    ),
    title: 'Affordable',
    description: 'Quality you can trust at prices you\u0027ll love. Luxury that\u0027s accessible to all.',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
    title: 'Trustworthy',
    description: 'A legacy of reliability built over decades. Generations of families trust Vinod Jewellers.',
  },
]

export function TrustPillars() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const cards = cardsRef.current

    if (!section || !cards) return

    const cardElements = cards.querySelectorAll('.trust-card')
    gsap.fromTo(
      cardElements,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cards,
          start: 'top 80%',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 bg-beige overflow-hidden">
      {/* Decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />

      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block font-sans text-xs tracking-[0.5em] text-gold uppercase mb-6">
            Why Choose Us
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-onyx tracking-wide mb-4">
            Our <span className="text-gradient-gold">Promise</span>
          </h2>
          <p className="font-sans text-onyx/50 max-w-xl mx-auto leading-relaxed">
            Four pillars that define every piece we create and every relationship we build.
          </p>
        </div>

        {/* Trust Pillars Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="trust-card group relative text-center p-8 md:p-10 border border-gold/10 hover:border-gold/30 transition-all duration-500 hover:-translate-y-1"
              style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.6), rgba(246,242,233,0.8))' }}
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border border-gold/20 mb-6 text-gold group-hover:bg-gold/10 transition-all duration-500">
                {pillar.icon}
              </div>

              {/* Title */}
              <h3 className="font-serif text-2xl text-onyx mb-3 tracking-wide">
                {pillar.title}
              </h3>

              {/* Description */}
              <p className="font-sans text-sm text-onyx/50 leading-relaxed">
                {pillar.description}
              </p>

              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-8 h-px bg-gradient-to-l from-gold/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 right-0 w-px h-8 bg-gradient-to-b from-gold/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 w-8 h-px bg-gradient-to-r from-gold/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 w-px h-8 bg-gradient-to-t from-gold/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
