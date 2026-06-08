'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { LuxuryCursor } from '@/components/luxury-cursor'
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FloatingParticles } from '@/components/floating-particles'

gsap.registerPlugin(ScrollTrigger)

const collections = [
  {
    id: 'celestial-sovereignty',
    name: 'The Royal Rajwada',
    tagline: 'Crown jewels for the modern goddess',
    description: 'A collection inspired by the celestial crowns of ancient goddesses, featuring rare diamonds and sapphires set in platinum and white gold.',
    image: '/images/collection-celestial.jpg',
    pieces: 24,
    priceRange: '₹45,000 - ₹4,85,000',
    categories: ['Necklaces', 'Bridal Sets', 'Earrings'],
  },
  {
    id: 'divine-lotus',
    name: 'The Divine Polki',
    tagline: 'Sacred blooms in precious metals',
    description: 'The lotus flower symbolizes purity and enlightenment. Each piece captures the sacred geometry of this divine bloom.',
    image: '/images/collection-lotus.jpg',
    pieces: 18,
    priceRange: '₹28,000 - ₹2,75,000',
    categories: ['Necklaces', 'Earrings', 'Rings'],
  },
  {
    id: 'eternal-flame',
    name: 'The Jadau Heritage',
    tagline: 'Passion captured in gemstones',
    description: 'Fiery rubies and warm rose gold create pieces that embody the eternal flame of passion and desire.',
    image: '/images/collection-flame.jpg',
    pieces: 16,
    priceRange: '₹35,000 - ₹1,95,000',
    categories: ['Rings', 'Bangles', 'Necklaces'],
  },
  {
    id: 'moonlit-garden',
    name: 'The Navratna Elegance',
    tagline: 'Night blooms kissed by silver light',
    description: 'Inspired by gardens bathed in moonlight, featuring pearls, moonstones, and white diamonds.',
    image: '/images/collection-moonlit.jpg',
    pieces: 22,
    priceRange: '₹22,000 - ₹1,65,000',
    categories: ['Earrings', 'Bangles', 'Bridal Sets'],
  },
  {
    id: 'golden-hour',
    name: 'The Temple Gold',
    tagline: 'The magic of twilight captured in gold',
    description: 'A celebration of the golden hour, when light transforms the world. Yellow diamonds and warm gold tones.',
    image: '/images/collection-golden.png',
    pieces: 14,
    priceRange: '₹40,000 - ₹3,20,000',
    categories: ['Bangles', 'Necklaces', 'Rings'],
  },
  {
    id: 'ocean-depths',
    name: 'The Pearl Symphony',
    tagline: 'Treasures from the deep blue',
    description: 'Aquamarines, sapphires, and pearls evoke the mysterious beauty of the ocean depths.',
    image: '/images/collection-ocean.png',
    pieces: 20,
    priceRange: '₹32,000 - ₹2,45,000',
    categories: ['Earrings', 'Necklaces', 'Bridal Sets'],
  },
  {
    id: 'the-temple-legacy',
    name: 'The Temple Legacy',
    tagline: 'Divine motifs in pure gold',
    description: 'Inspired by South Indian temple architecture, featuring intricate carvings of deities in solid gold.',
    image: '/images/collection_temple.png',
    pieces: 28,
    priceRange: '₹55,000 - ₹5,00,000',
    categories: ['Necklaces', 'Earrings', 'Bridal Sets'],
  },
  {
    id: 'meenakari-marvel',
    name: 'The Meenakari Marvel',
    tagline: 'Vibrant enamel artistry',
    description: 'A celebration of colors through the ancient art of Meenakari, blending gold with brilliant enamels.',
    image: '/images/collection_meenakari.png',
    pieces: 15,
    priceRange: '₹30,000 - ₹2,50,000',
    categories: ['Earrings', 'Bangles', 'Necklaces'],
  },
  {
    id: 'nizams-pride',
    name: 'The Nizam\'s Pride',
    tagline: 'Hyderabadi pearls and emeralds',
    description: 'Reflecting the opulence of the Nizams, adorned with luminous Basra pearls and deep green emeralds.',
    image: '/images/collection_nizam.png',
    pieces: 20,
    priceRange: '₹80,000 - ₹10,00,000',
    categories: ['Necklaces', 'Bridal Sets', 'Rings'],
  },
  {
    id: 'rajputana-grandeur',
    name: 'The Rajputana Grandeur',
    tagline: 'Heavy Polki and Kundan',
    description: 'Massive, breathtaking Kundan and Polki sets fit for royalty, capturing the essence of Rajasthan.',
    image: '/images/collection_rajputana.png',
    pieces: 32,
    priceRange: '₹1,50,000 - ₹15,00,000',
    categories: ['Bridal Sets', 'Necklaces', 'Earrings'],
  },
  {
    id: 'mughal-opulence',
    name: 'The Mughal Opulence',
    tagline: 'Jadau craft and rubies',
    description: 'Intricate Jadau techniques showcasing pigeon-blood rubies set in 22K gold.',
    image: '/images/collection_mughal.jpg',
    pieces: 12,
    priceRange: '₹60,000 - ₹4,20,000',
    categories: ['Rings', 'Earrings', 'Necklaces'],
  },
  {
    id: 'filigree-fantasy',
    name: 'The Filigree Fantasy',
    tagline: 'Delicate Tarakasi weaves',
    description: 'Masterful silver and gold filigree work that looks like spun lace, from the heart of Odisha.',
    image: '/images/collection_filigree.jpg',
    pieces: 18,
    priceRange: '₹15,000 - ₹1,20,000',
    categories: ['Earrings', 'Bangles'],
  },
  {
    id: 'antique-heirloom',
    name: 'The Antique Heirloom',
    tagline: 'Oxidized gold vintage charm',
    description: 'Pieces that carry the weight of history, featuring darkened gold finishes and traditional motifs.',
    image: '/images/collection_antique.jpg',
    pieces: 25,
    priceRange: '₹45,000 - ₹3,50,000',
    categories: ['Necklaces', 'Bangles', 'Rings'],
  },
  {
    id: 'kundan-classic',
    name: 'The Kundan Classic',
    tagline: 'Timeless glass stone settings',
    description: 'The quintessential Indian jewelry experience, with perfectly cut glass stones foiled in gold.',
    image: '/images/collection_kundan.jpg',
    pieces: 22,
    priceRange: '₹25,000 - ₹2,80,000',
    categories: ['Bridal Sets', 'Earrings'],
  },
  {
    id: 'polki-princess',
    name: 'The Polki Princess',
    tagline: 'Raw, uncut diamond allure',
    description: 'Celebrating the natural beauty of uncut diamonds in their purest, most radiant form.',
    image: '/images/collection_polki.jpg',
    pieces: 14,
    priceRange: '₹1,00,000 - ₹8,50,000',
    categories: ['Necklaces', 'Rings'],
  },
  {
    id: 'pachchikam-charm',
    name: 'The Pachchikam Charm',
    tagline: 'Rustic Gujarati craftsmanship',
    description: 'A delicate and fragile art form using silver and uncut stones for a distinctly vintage feel.',
    image: '/images/collection_pachchikam.png',
    pieces: 10,
    priceRange: '₹20,000 - ₹1,50,000',
    categories: ['Earrings', 'Necklaces'],
  },
  {
    id: 'guttapusalu-grace',
    name: 'The Guttapusalu Grace',
    tagline: 'Andhra pearl fringes',
    description: 'Iconic South Indian necklaces characterized by their lush fringes of small pearls.',
    image: '/images/collection_guttapusalu.png',
    pieces: 16,
    priceRange: '₹50,000 - ₹3,80,000',
    categories: ['Necklaces', 'Bridal Sets'],
  },
  {
    id: 'kempu-brilliance',
    name: 'The Kempu Brilliance',
    tagline: 'Vibrant red and green stones',
    description: 'Traditional dance jewelry reimagined for the modern bride with striking red and green Kemp stones.',
    image: '/images/collection_kempu.png',
    pieces: 20,
    priceRange: '₹18,000 - ₹1,45,000',
    categories: ['Earrings', 'Bangles', 'Necklaces'],
  },
  {
    id: 'lakshmi-collection',
    name: 'The Lakshmi Collection',
    tagline: 'Auspicious coin motifs',
    description: 'Kasumala style chains and bangles embossed with the Goddess of Wealth.',
    image: '/images/collection_lakshmi.png',
    pieces: 18,
    priceRange: '₹40,000 - ₹2,90,000',
    categories: ['Necklaces', 'Bangles'],
  },
  {
    id: 'thewa-treasure',
    name: 'The Thewa Treasure',
    tagline: 'Gold fused on stained glass',
    description: 'A mesmerizing Rajasthani art fusing 23K gold intricately worked onto colored glass.',
    image: '/images/collection_thewa.png',
    pieces: 12,
    priceRange: '₹25,000 - ₹1,80,000',
    categories: ['Earrings', 'Rings'],
  },
  {
    id: 'navratna-splendor',
    name: 'The Navratna Splendor',
    tagline: 'The nine auspicious gems',
    description: 'Harnessing the cosmic energy of the nine planetary gemstones set in perfect harmony.',
    image: '/images/collection_navratna.png',
    pieces: 15,
    priceRange: '₹65,000 - ₹4,50,000',
    categories: ['Rings', 'Necklaces', 'Bridal Sets'],
  }
]

const categories = ['All', 'Necklaces', 'Earrings', 'Bangles', 'Rings', 'Bridal Sets']

export default function CollectionsPage() {
  const heroRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [activeCategory, setActiveCategory] = useState('All')
  const [hoveredCollection, setHoveredCollection] = useState<string | null>(null)

  useEffect(() => {
    const hero = heroRef.current
    const grid = gridRef.current

    if (!hero || !grid) return

    // Hero title animation
    gsap.fromTo(
      hero.querySelectorAll('.hero-text'),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.3,
      }
    )

    // Grid items animation
    gsap.fromTo(
      grid.querySelectorAll('.collection-item'),
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: grid,
          start: 'top 80%',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <>
      <LuxuryCursor />
      <SmoothScrollProvider>
        <Header />
        
        <main>
          {/* Hero Section */}
          <section
            ref={heroRef}
            className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-24"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/collections-hero.jpg"
                alt="Divine goddess with lotus flowers"
                fill
                className="object-cover object-center"
                priority
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-beige-light/80 via-beige-light/50 to-beige-light" />
              <div className="absolute inset-0 bg-gradient-to-r from-beige-light/90 via-beige-light/30 to-beige-light/90" />
            </div>

            <FloatingParticles count={30} className="z-10 opacity-50" />
            
            <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
              <span className="hero-text inline-block font-sans text-xs tracking-[0.5em] text-gold uppercase mb-6">
                Explore Our World
              </span>
              <h1 className="hero-text font-serif text-5xl md:text-6xl lg:text-7xl text-onyx tracking-wide mb-6">
                The <span className="text-gradient-gold">Collections</span>
              </h1>
              <p className="hero-text font-sans text-lg text-onyx/50 max-w-2xl mx-auto leading-relaxed">
                Each collection is a chapter in our story of divine craftsmanship,
                inspired by mythology, nature, and the eternal pursuit of beauty.
              </p>
            </div>

            {/* Decorative line */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-gold/50 to-transparent" />
          </section>

          {/* Category Filter */}
          <section className="py-12 border-b border-gold/10">
            <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`font-sans text-sm tracking-[0.2em] uppercase transition-all duration-300 pb-2 border-b-2 ${
                      activeCategory === category
                        ? 'text-gold border-gold'
                        : 'text-onyx/50 border-transparent hover:text-onyx'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Collections Grid */}
          <section className="py-20 md:py-32">
            <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
              <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {collections
                  .filter((collection) => activeCategory === 'All' || collection.categories.includes(activeCategory))
                  .map((collection, index) => (
                  <Link
                    key={collection.id}
                    href={`/collections/${collection.id}`}
                    className="collection-item group relative"
                    onMouseEnter={() => setHoveredCollection(collection.id)}
                    onMouseLeave={() => setHoveredCollection(null)}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={collection.image}
                        alt={collection.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-beige via-beige/30 to-transparent opacity-80" />
                      
                      {/* Gold border on hover */}
                      <AnimatePresence>
                        {hoveredCollection === collection.id && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 border border-gold/40"
                          />
                        )}
                      </AnimatePresence>

                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col justify-end p-8">
                        <span className="font-sans text-[10px] tracking-[0.4em] text-gold uppercase mb-2">
                          {collection.pieces} Pieces
                        </span>
                        <h3 className="font-serif text-2xl md:text-3xl text-onyx mb-2 tracking-wide">
                          {collection.name}
                        </h3>
                        <p className="font-sans text-sm text-onyx/60 mb-4">
                          {collection.tagline}
                        </p>
                        
                        {/* Hover content */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ 
                            opacity: hoveredCollection === collection.id ? 1 : 0,
                            y: hoveredCollection === collection.id ? 0 : 10 
                          }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="font-sans text-xs text-onyx/40 mb-4 line-clamp-2">
                            {collection.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="font-sans text-xs text-gold/70">
                              {collection.priceRange}
                            </span>
                            <span className="flex items-center gap-2 font-sans text-xs tracking-[0.2em] text-gold uppercase">
                              Explore
                              <svg
                                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                              >
                                <path d="M5 12h14M12 5l7 7-7 7" />
                              </svg>
                            </span>
                          </div>
                        </motion.div>
                      </div>

                      {/* Corner accents */}
                      <div className="absolute top-0 left-0 w-12 h-px bg-gradient-to-r from-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute top-0 left-0 w-px h-12 bg-gradient-to-b from-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-0 right-0 w-12 h-px bg-gradient-to-l from-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-0 right-0 w-px h-12 bg-gradient-to-t from-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Private Appointment CTA */}
          <section className="py-20 md:py-32 bg-beige-light">
            <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
              <span className="inline-block font-sans text-xs tracking-[0.5em] text-gold uppercase mb-6">
                Exclusive Service
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-onyx tracking-wide mb-6">
                Private <span className="text-gradient-gold">Appointments</span>
              </h2>
              <p className="font-sans text-onyx/50 leading-relaxed mb-10 max-w-2xl mx-auto">
                Experience our collections in the intimate setting of our private
                salons. Our specialists will guide you through our finest pieces
                and help you discover your perfect treasure.
              </p>
              <Link
                href="/appointments"
                className="group inline-flex items-center gap-4 font-sans text-sm tracking-[0.3em] text-onyx bg-gold hover:bg-gold-light px-10 py-4 uppercase transition-all duration-500"
              >
                <span>Book an Appointment</span>
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
          </section>
        </main>

        <Footer />
      </SmoothScrollProvider>
    </>
  )
}
