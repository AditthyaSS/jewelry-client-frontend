'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const lookbookImages = [
  { src: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=600&h=800&fit=crop', title: 'Bridal Elegance', category: 'Wedding' },
  { src: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop', title: 'Temple Gold', category: 'Traditional' },
  { src: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=750&fit=crop', title: 'Diamond Pendant', category: 'Diamond' },
  { src: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop', title: 'Silver Grace', category: 'Silver' },
  { src: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=800&fit=crop', title: 'Classic Heritage', category: 'Gold' },
  { src: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600&h=700&fit=crop', title: 'Modern Minimalist', category: 'Daily Wear' },
  { src: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&h=600&fit=crop', title: 'Golden Bangles', category: 'Traditional' },
  { src: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&h=800&fit=crop', title: 'Gemstone Ring', category: 'Gemstone' },
  { src: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=700&fit=crop', title: 'Antique Jhumkas', category: 'Earrings' },
]

export function LookbookSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [activeFilter, setActiveFilter] = useState('All')
  const animatedRef = useRef(false)

  const filters = ['All', ...Array.from(new Set(lookbookImages.map(i => i.category)))]
  
  const filteredImages = activeFilter === 'All' 
    ? lookbookImages 
    : lookbookImages.filter(i => i.category === activeFilter)

  useEffect(() => {
    const section = sectionRef.current
    if (!section || animatedRef.current) return

    animatedRef.current = true
    gsap.fromTo(
      section.querySelectorAll('.lookbook-item'),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <>
      <section id="lookbook" ref={sectionRef} className="relative py-24 md:py-32 bg-beige-light overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />

        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="inline-block font-sans text-xs tracking-[0.5em] text-gold uppercase mb-6 font-bold">
              Lookbook
            </span>
            <h2 className="font-serif text-4xl md:text-6xl text-onyx tracking-wide mb-4 font-bold">
              Style <span className="text-gradient-gold">Inspiration</span>
            </h2>
            <p className="font-sans text-onyx/50 max-w-xl mx-auto leading-relaxed font-medium">
              Browse our curated lookbook for jewellery inspiration. Discover stunning pieces from every collection.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full font-sans text-sm tracking-wide transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-onyx text-beige'
                    : 'border border-gold/20 text-onyx/60 hover:border-gold hover:text-gold'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="columns-2 md:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.src}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                  className="lookbook-item group relative cursor-pointer break-inside-avoid overflow-hidden rounded-lg"
                  onClick={() => setSelectedImage(index)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-onyx/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col justify-end p-5">
                    <span className="font-sans text-[10px] tracking-[0.3em] text-gold uppercase mb-1">
                      {image.category}
                    </span>
                    <h4 className="font-serif text-lg text-white">
                      {image.title}
                    </h4>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <a
              href="/lookbook.pdf"
              download="Vinod-Jewellers-Lookbook.pdf"
              className="group inline-flex items-center gap-3 font-sans text-sm font-bold tracking-[0.2em] bg-onyx text-beige px-8 py-4 hover:bg-gold transition-colors duration-300 uppercase rounded-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download Lookbook PDF</span>
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-onyx/90 backdrop-blur-md p-6"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative max-w-3xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-4 -right-4 z-10 w-10 h-10 rounded-full bg-beige flex items-center justify-center shadow-lg hover:bg-gold transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={filteredImages[selectedImage]?.src}
                alt={filteredImages[selectedImage]?.title}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />

              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-onyx/80 to-transparent rounded-b-lg">
                <span className="font-sans text-[10px] tracking-[0.3em] text-gold uppercase">
                  {filteredImages[selectedImage]?.category}
                </span>
                <h4 className="font-serif text-xl text-white mt-1">
                  {filteredImages[selectedImage]?.title}
                </h4>
              </div>

              {selectedImage > 0 && (
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedImage(selectedImage - 1) }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                </button>
              )}
              {selectedImage < filteredImages.length - 1 && (
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedImage(selectedImage + 1) }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
