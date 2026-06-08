'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { LuxuryCursor } from '@/components/luxury-cursor'
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FloatingParticles } from '@/components/floating-particles'

gsap.registerPlugin(ScrollTrigger)

const processSteps = [
  {
    title: 'The Vision',
    description: 'Every masterpiece begins as a whisper of inspiration. Our master designers translate the ephemeral beauty of the cosmos into delicate sketches, laying the foundation for immortality.',
    image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=80',
  },
  {
    title: 'The Elements',
    description: 'We scour the earth for the most extraordinary gemstones. Only one in ten thousand stones meets our exacting standards for clarity, color, and divine resonance.',
    image: '/images/collection_nizam.png',
  },
  {
    title: 'The Forge',
    description: 'In the intense heat of our ateliers, precious metals are coaxed into breathtaking forms. Our artisans employ techniques passed down through generations, marrying ancient wisdom with modern precision.',
    image: '/images/collection_rajputana.png',
  },
  {
    title: 'The Awakening',
    description: 'The final polish breathes life into the creation. It is the moment when metal and stone become more than the sum of their parts—they become Vrishva Aura.',
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80',
  },
]

export default function AtelierPage() {
  const heroRef = useRef<HTMLElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    const steps = stepsRef.current
    const cta = ctaRef.current

    if (hero) {
      gsap.fromTo(
        hero.querySelectorAll('.hero-text'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 0.3,
        }
      )
    }

    if (steps) {
      const stepElements = steps.querySelectorAll('.process-step')
      stepElements.forEach((step, index) => {
        const isEven = index % 2 === 0
        gsap.fromTo(
          step,
          { x: isEven ? -50 : 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 75%',
            },
          }
        )
      })
    }

    if (cta) {
      gsap.fromTo(
        cta.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cta,
            start: 'top 80%',
          },
        }
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <>
      <LuxuryCursor />
      <SmoothScrollProvider>
        <Header />

        <main className="bg-beige">
          {/* Hero Section */}
          <section
            ref={heroRef}
            className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-24"
          >
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=1600&q=80"
                alt="Vrishva Aura Atelier"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-beige-light/90 via-beige-light/70 to-beige-light" />
              <div className="absolute inset-0 bg-gradient-to-r from-beige-light/80 via-transparent to-beige-light/80" />
            </div>

            <FloatingParticles count={30} className="z-10 opacity-50" />

            <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
              <span className="hero-text inline-block font-sans text-xs tracking-[0.5em] text-gold uppercase mb-6">
                Where Magic Happens
              </span>
              <h1 className="hero-text font-serif text-5xl md:text-6xl lg:text-7xl text-onyx tracking-wide mb-6">
                The <span className="text-gradient-gold">Atelier</span>
              </h1>
              <p className="hero-text font-sans text-lg text-onyx/60 max-w-2xl mx-auto leading-relaxed">
                Step into the sanctum of creation. Here, master artisans transform the earth's rarest treasures into eternal masterpieces through centuries-old techniques.
              </p>
            </div>

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-gold/50 to-transparent" />
          </section>

          {/* Process Section */}
          <section className="py-24 md:py-32 bg-beige-light">
            <div className="max-w-screen-xl mx-auto px-6 md:px-12">
              <div className="text-center mb-20">
                <span className="inline-block font-sans text-xs tracking-[0.5em] text-gold uppercase mb-6">
                  The Art of Creation
                </span>
                <h2 className="font-serif text-4xl md:text-5xl text-onyx tracking-wide">
                  From Stone to <span className="text-gradient-gold">Soul</span>
                </h2>
              </div>

              <div ref={stepsRef} className="space-y-32">
                {processSteps.map((step, index) => (
                  <div
                    key={step.title}
                    className={`process-step grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center ${
                      index % 2 === 0 ? '' : 'lg:flex-row-reverse'
                    }`}
                  >
                    <div className={`${index % 2 === 0 ? 'order-2 lg:order-1' : 'order-2 lg:order-2'}`}>
                      <span className="font-serif text-6xl text-gold/20 block mb-4">
                        0{index + 1}
                      </span>
                      <h3 className="font-serif text-3xl md:text-4xl text-onyx mb-6">
                        {step.title}
                      </h3>
                      <p className="font-sans text-onyx/60 leading-relaxed text-lg">
                        {step.description}
                      </p>
                    </div>

                    <div className={`relative aspect-[4/5] overflow-hidden border border-gold/10 p-2 ${index % 2 === 0 ? 'order-1 lg:order-2' : 'order-1 lg:order-1'}`}>
                      <div className="relative w-full h-full bg-beige overflow-hidden">
                        <img
                          src={step.image}
                          alt={step.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gold/5" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section ref={ctaRef} className="py-24 md:py-32 text-center bg-beige">
            <div className="max-w-3xl mx-auto px-6">
              <span className="inline-block font-sans text-xs tracking-[0.5em] text-gold uppercase mb-6">
                Your Legacy Awaits
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-onyx tracking-wide mb-8">
                Commission a <span className="text-gradient-gold">Masterpiece</span>
              </h2>
              <p className="font-sans text-onyx/60 leading-relaxed mb-10">
                Work directly with our master artisans to create a bespoke piece that tells your unique story. From sourcing the perfect stone to finalizing the design, your journey begins here.
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-4 font-sans text-sm tracking-[0.3em] text-beige-light bg-onyx hover:bg-gold px-10 py-4 uppercase transition-all duration-500"
              >
                <span>Book a Consultation</span>
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
