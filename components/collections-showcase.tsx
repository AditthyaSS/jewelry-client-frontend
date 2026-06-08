'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const collections = [
  {
    id: 'celestial-sovereignty',
    name: 'The Royal Rajwada',
    description: 'Crown jewels for the modern goddess',
    image: '/images/collection-celestial.jpg',
    featured: true,
  },
  {
    id: 'divine-lotus',
    name: 'The Divine Polki',
    description: 'Sacred blooms in precious metals',
    image: '/images/collection-lotus.jpg',
    featured: false,
  },
  {
    id: 'eternal-flame',
    name: 'The Jadau Heritage',
    description: 'Passion captured in gemstones',
    image: '/images/collection-flame.jpg',
    featured: false,
  },
  {
    id: 'moonlit-garden',
    name: 'The Navratna Elegance',
    description: 'Night blooms kissed by silver light',
    image: '/images/collection-moonlit.jpg',
    featured: false,
  },
]

export function CollectionsShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const title = titleRef.current
    const cards = cardsRef.current

    if (!section || !title || !cards) return

    // Title animation
    gsap.fromTo(
      title.children,
      { y: 50, opacity: 0 },
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

    // Cards animation with stagger
    const cardElements = cards.querySelectorAll('.collection-card')
    gsap.fromTo(
      cardElements,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cards,
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
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-20">
          <span className="inline-block font-sans text-xs tracking-[0.5em] text-gold uppercase mb-6">
            Our Collections
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-onyx tracking-wide mb-6">
            Crafted for the{' '}
            <span className="text-gradient-gold">Extraordinary</span>
          </h2>
          <p className="font-sans text-onyx/50 max-w-xl mx-auto leading-relaxed">
            Each collection tells a story of divine inspiration, where ancient
            mythology meets contemporary elegance.
          </p>
        </div>

        {/* Collections Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {collections.map((collection, index) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.id}`}
              className={`collection-card group relative overflow-hidden ${
                collection.featured ? 'md:row-span-2' : ''
              }`}
            >
              <div
                className={`relative ${
                  collection.featured ? 'aspect-[3/4]' : 'aspect-[4/3]'
                } overflow-hidden`}
              >
                {/* Image */}
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-beige via-beige/20 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Gold border on hover */}
                <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/30 transition-colors duration-500" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                  <span className="font-sans text-[10px] tracking-[0.4em] text-gold uppercase mb-3">
                    Collection {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-onyx mb-3 tracking-wide">
                    {collection.name}
                  </h3>
                  <p className="font-sans text-sm text-onyx/60 mb-6">
                    {collection.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-3 text-gold">
                    <span className="font-sans text-xs tracking-[0.3em] uppercase">
                      Discover
                    </span>
                    <svg
                      className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-16 h-px bg-gradient-to-r from-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 left-0 w-px h-16 bg-gradient-to-b from-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 right-0 w-16 h-px bg-gradient-to-l from-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 right-0 w-px h-16 bg-gradient-to-t from-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </Link>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-16">
          <Link
            href="/collections"
            className="group inline-flex items-center gap-4 font-sans text-sm tracking-[0.3em] text-onyx border border-onyx/30 hover:border-gold hover:text-gold px-10 py-4 uppercase transition-all duration-500"
          >
            <span>View All Collections</span>
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
