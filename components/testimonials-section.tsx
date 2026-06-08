'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    id: 1,
    quote:
      "Vrishva Aura has created pieces that transcend mere jewellery. They are heirlooms of the soul, passed down through generations with stories of love and legacy.",
    author: 'Duchess of Beaumont',
    title: 'Private Collector',
    image: '/images/testimonial-1.jpg',
  },
  {
    id: 2,
    quote:
      "Each piece from Vrishva Aura carries an aura of the divine. The craftsmanship is unparalleled, the designs speak to something eternal within us.",
    author: 'Isabella Marchetti',
    title: 'Curator, Museo del Gioiello',
    image: '/images/testimonial-2.jpg',
  },
  {
    id: 3,
    quote:
      "Working with Vrishva Aura on my bridal collection was a transformative experience. They understood my vision and elevated it beyond imagination.",
    author: 'Victoria Chen',
    title: 'Fashion Icon',
    image: '/images/testimonial-3.jpg',
  },
]

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-40 bg-gradient-to-b from-beige-light to-beige overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="relative max-w-screen-xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block font-sans text-xs tracking-[0.5em] text-gold uppercase mb-6">
            Testimonials
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-onyx tracking-wide">
            Words of <span className="text-gradient-gold">Admiration</span>
          </h2>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Quote icon */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-gold/20">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.956.76-3.022.66-1.065 1.515-1.867 2.558-2.403L9.373 5c-.8.396-1.56.898-2.26 1.505-.71.607-1.34 1.305-1.9 2.094s-.98 1.68-1.25 2.69-.346 2.04-.217 3.1c.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l.002.003zm9.124 0c0-.88-.23-1.618-.69-2.217-.326-.42-.77-.692-1.327-.817-.56-.124-1.074-.13-1.54-.022-.16-.94.09-1.95.75-3.02.66-1.06 1.514-1.86 2.557-2.4L18.49 5c-.8.396-1.555.898-2.26 1.505-.708.607-1.34 1.305-1.894 2.094-.556.79-.97 1.68-1.24 2.69-.273 1-.345 2.04-.217 3.1.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l-.007.006z" />
            </svg>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-onyx leading-relaxed mb-10 italic">
                &ldquo;{testimonials[activeIndex].quote}&rdquo;
              </blockquote>

              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gold/30">
                  <Image
                    src={testimonials[activeIndex].image}
                    alt={testimonials[activeIndex].author}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-serif text-lg text-gold">
                    {testimonials[activeIndex].author}
                  </p>
                  <p className="font-sans text-sm text-onyx/40">
                    {testimonials[activeIndex].title}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation dots */}
          <div className="flex items-center justify-center gap-4 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'bg-gold w-8'
                    : 'bg-ivory/30 hover:bg-ivory/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
