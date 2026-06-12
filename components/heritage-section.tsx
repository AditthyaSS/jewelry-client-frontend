'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export function HeritageSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    const image = imageRef.current

    if (!section || !content || !image) return

    // Content fade in
    gsap.fromTo(
      content.children,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
        },
      }
    )

    // Image parallax and reveal
    gsap.fromTo(
      image,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
        },
      }
    )

    // Parallax on scroll
    gsap.to(image.querySelector('video'), {
      y: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section id="about" ref={sectionRef} className="relative py-32 md:py-40 bg-beige-light overflow-hidden">
      {/* Decorative element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />

      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content */}
          <div ref={contentRef}>
            <span className="inline-block font-sans text-xs tracking-[0.5em] text-gold uppercase mb-6">
              Our Heritage
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-onyx tracking-wide mb-8 leading-tight">
              A Legacy of{' '}
              <span className="text-gradient-gold">Trust</span>
            </h2>
            <p className="font-sans text-onyx/60 leading-relaxed mb-6">
              For over three decades, Vinod Jewellers has been a beacon of trust 
              and craftsmanship in the world of fine jewellery. Founded with a 
              vision to blend tradition with modernity, we create pieces that 
              celebrate life&apos;s most precious moments. From heirloom gold designs 
              to contemporary diamond creations, our collections are crafted to 
              resonate with modern women with strong values.
            </p>
            <p className="font-sans text-onyx/60 leading-relaxed mb-10">
              At Vinod Jewellers, we believe jewellery is more than adornment — 
              it&apos;s an expression of love, heritage, and individuality. Our artisans 
              pour honesty and care into every piece, preserving the artistry of 
              traditional craftsmanship while embracing modern aesthetics.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mb-10 border-t border-gold/10 pt-10">
              <div>
                <span className="block font-serif text-4xl md:text-5xl text-gradient-gold mb-2">
                  30+
                </span>
                <span className="font-sans text-xs tracking-[0.2em] text-onyx/40 uppercase">
                  Years of Legacy
                </span>
              </div>
              <div>
                <span className="block font-serif text-4xl md:text-5xl text-gradient-gold mb-2">
                  5
                </span>
                <span className="font-sans text-xs tracking-[0.2em] text-onyx/40 uppercase">
                  Collections
                </span>
              </div>
              <div>
                <span className="block font-serif text-4xl md:text-5xl text-gradient-gold mb-2">
                  1
                </span>
                <span className="font-sans text-xs tracking-[0.2em] text-onyx/40 uppercase">
                  Flagship Store
                </span>
              </div>
            </div>

            <a
              href="#collections"
              onClick={(e) => { e.preventDefault(); document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="group inline-flex items-center gap-4 font-sans text-sm tracking-[0.3em] text-gold hover:text-gold-light transition-colors duration-300 uppercase"
            >
              <span>Discover Our Story</span>
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Image */}
          <div ref={imageRef} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden">
              <video
                src="/videos/heritage-atelier.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-beige-light via-transparent to-transparent opacity-50" />
            </div>

            {/* Decorative frame */}
            <div className="absolute -top-4 -right-4 w-full h-full border border-gold/20 -z-10" />
            <div className="absolute -bottom-4 -left-4 w-full h-full border border-gold/10 -z-10" />

            {/* Badge */}
            <div className="absolute -bottom-6 -left-6 md:-left-12 bg-beige p-6 md:p-8 border border-gold/20">
              <span className="block font-serif text-5xl md:text-6xl text-gradient-gold">
                30+
              </span>
              <span className="font-sans text-[10px] tracking-[0.3em] text-onyx/40 uppercase">
                Years of Trust
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
