'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

const featuredPieces = [
  {
    id: 'celestial-tiara',
    name: 'Kundan Maang Tikka',
    collection: 'The Royal Rajwada',
    price: '₹4,85,000',
    video: '/videos/piece-tiara.mp4',
    materials: ['18K Gold', 'Uncut Diamonds', 'Emeralds'],
  },
  {
    id: 'divine-lotus-necklace',
    name: 'Polki Choker Necklace',
    collection: 'The Divine Polki',
    price: '₹2,75,000',
    video: '/videos/piece-necklace.mp4',
    materials: ['22K Gold', 'Polki Diamonds', 'Pearls'],
  },
  {
    id: 'eternal-flame-ring',
    name: 'Jadau Cocktail Ring',
    collection: 'The Jadau Heritage',
    price: '₹1,25,000',
    video: '/videos/piece-ring.mp4',
    materials: ['22K Gold', 'Ruby', 'Polki'],
  },
]

export function FeaturedPieces() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const piecesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const title = titleRef.current
    const pieces = piecesRef.current

    if (!section || !title || !pieces) return

    // Title animation
    gsap.fromTo(
      title.children,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 80%',
        },
      }
    )

    // Pieces animation
    const pieceElements = pieces.querySelectorAll('.piece-card')
    gsap.fromTo(
      pieceElements,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: pieces,
          start: 'top 75%',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 md:py-40 bg-beige">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--gold) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative max-w-screen-2xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-20">
          <span className="inline-block font-sans text-xs tracking-[0.5em] text-gold uppercase mb-6">
            Signature Pieces
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-onyx tracking-wide mb-6">
            Masterpieces of <span className="text-gradient-gold">Desire</span>
          </h2>
          <p className="font-sans text-onyx/50 max-w-xl mx-auto leading-relaxed">
            Each piece is a testament to the divine intersection of artistic
            vision and unparalleled craftsmanship.
          </p>
        </div>

        {/* Featured Pieces Grid */}
        <div ref={piecesRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPieces.map((piece) => (
            <Link
              key={piece.id}
              href={`/piece/${piece.id}`}
              className="piece-card group"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-beige-light mb-6">
                <video
                  src={piece.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-beige/0 group-hover:bg-beige/20 transition-colors duration-500" />

                {/* Quick view button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="font-sans text-xs tracking-[0.3em] text-onyx border border-onyx/50 hover:border-gold hover:text-gold px-6 py-3 uppercase transition-colors duration-300">
                    Quick View
                  </span>
                </div>

                {/* Gold border on hover */}
                <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/30 transition-colors duration-500" />
              </div>

              <div className="text-center">
                <span className="block font-sans text-[10px] tracking-[0.4em] text-gold/60 uppercase mb-2">
                  {piece.collection}
                </span>
                <h3 className="font-serif text-xl md:text-2xl text-onyx mb-2 group-hover:text-gold transition-colors duration-300">
                  {piece.name}
                </h3>
                <p className="font-sans text-sm text-onyx/40 mb-3">
                  {piece.materials.join(' · ')}
                </p>
                <span className="font-sans text-lg text-gold tracking-wide">
                  {piece.price}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-16">
          <Link
            href="/collections"
            className="group inline-flex items-center gap-4 font-sans text-sm tracking-[0.3em] text-onyx bg-gold hover:bg-gold-light px-10 py-4 uppercase transition-all duration-500"
          >
            <span>View All Pieces</span>
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
    </section>
  )
}
