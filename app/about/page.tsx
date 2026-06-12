'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import Link from 'next/link'
import { LuxuryCursor } from '@/components/luxury-cursor'
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FloatingParticles } from '@/components/floating-particles'

gsap.registerPlugin(ScrollTrigger)

const timeline = [
  {
    year: '1847',
    title: 'The Beginning',
    description: 'Vinod Jewellers is established in Bengaluru, starting a legacy of trust and fine craftsmanship.',
  },
  {
    year: '1892',
    title: 'Royal Appointment',
    description: 'Vinod Jewellers earns its reputation as a trusted name, serving generations of families.',
  },
  {
    year: '1925',
    title: 'Art Deco Era',
    description: 'The house pioneers Art Deco jewellery design, introducing geometric patterns with precious stones.',
  },
  {
    year: '1967',
    title: 'Global Expansion',
    description: 'Opening of flagship stores in New York, London, and Tokyo marks global recognition.',
  },
  {
    year: '2010',
    title: 'Sustainability Commitment',
    description: 'Vinod Jewellers commits to ethical sourcing and transparent pricing for every customer.',
  },
  {
    year: 'Today',
    title: 'Digital Renaissance',
    description: 'While honoring tradition, we embrace innovation to serve collectors worldwide.',
  },
]

const values = [
  {
    title: 'Heritage',
    description: 'Nearly two centuries of unbroken tradition guide every creation.',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: 'Craftsmanship',
    description: 'Master artisans dedicate years to perfecting each piece by hand.',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    title: 'Sustainability',
    description: 'Ethical sourcing and environmental stewardship define our practice.',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: 'Innovation',
    description: 'Pushing the boundaries of design while honoring timeless techniques.',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z" />
        <circle cx="12" cy="9" r="3" />
      </svg>
    ),
  },
]

export default function AboutPage() {
  const heroRef = useRef<HTMLElement>(null)
  const storyRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLElement>(null)
  const valuesRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    const story = storyRef.current
    const timeline = timelineRef.current
    const values = valuesRef.current

    if (!hero) return

    // Hero animation
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

    // Story section parallax
    if (story) {
      const storyImage = story.querySelector('.story-image')
      if (storyImage) {
        gsap.to(storyImage, {
          y: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: story,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    }

    // Timeline items animation
    if (timeline) {
      gsap.fromTo(
        timeline.querySelectorAll('.timeline-item'),
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: timeline,
            start: 'top 70%',
          },
        }
      )
    }

    // Values animation
    if (values) {
      gsap.fromTo(
        values.querySelectorAll('.value-card'),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: values,
            start: 'top 75%',
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

        <main>
          {/* Hero Section */}
          <section
            ref={heroRef}
            className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-24"
          >
            <FloatingParticles count={25} className="opacity-40" />

            <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
              <span className="hero-text inline-block font-sans text-xs tracking-[0.5em] text-gold uppercase mb-6">
                Since 1847
              </span>
              <h1 className="hero-text font-serif text-5xl md:text-6xl lg:text-7xl text-onyx tracking-wide mb-6">
                Our <span className="text-gradient-gold">Heritage</span>
              </h1>
              <p className="hero-text font-sans text-lg text-onyx/50 max-w-2xl mx-auto leading-relaxed">
                For over three decades, Vinod Jewellers has been the guardian of an
                ancient art form, transforming nature&apos;s treasures into wearable
                poetry for those who seek the extraordinary.
              </p>
            </div>

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-gold/50 to-transparent" />
          </section>

          {/* Story Section */}
          <section ref={storyRef} className="py-20 md:py-32 overflow-hidden">
            <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                {/* Image */}
                <div className="relative order-2 lg:order-1">
                  <div className="story-image relative aspect-[4/5] overflow-hidden">
                    <video
                      src="/videos/about-founder.mp4"
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-beige via-transparent to-transparent opacity-40" />
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-full h-full border border-gold/20 -z-10" />
                </div>

                {/* Content */}
                <div className="order-1 lg:order-2">
                  <span className="inline-block font-sans text-xs tracking-[0.5em] text-gold uppercase mb-6">
                    The Story
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-onyx tracking-wide mb-8 leading-tight">
                    A Vision Born in{' '}
                    <span className="text-gradient-gold">Paris</span>
                  </h2>
                  <div className="space-y-6 font-sans text-onyx/60 leading-relaxed">
                    <p>
                      In 1847, a young goldsmith named Auguste Beaumont opened a
                      modest atelier on the banks of the Seine. His vision was
                      radical: to create jewellery that captured not just beauty,
                      but the divine essence of the materials themselves.
                    </p>
                    <p>
                      Word of his extraordinary craftsmanship spread through
                      Parisian salons. Soon, aristocrats from across Europe sought
                      his work. Each piece was a meditation on light and form, a
                      conversation between ancient techniques and bold innovation.
                    </p>
                    <p>
                      Today, seven generations later, we remain true to Auguste&apos;s
                      founding philosophy: that the finest jewellery should not
                      merely adorn—it should transform.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Timeline Section */}
          <section ref={timelineRef} className="py-20 md:py-32 bg-beige-light">
            <div className="max-w-screen-xl mx-auto px-6 md:px-12">
              <div className="text-center mb-16">
                <span className="inline-block font-sans text-xs tracking-[0.5em] text-gold uppercase mb-6">
                  Our Journey
                </span>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-onyx tracking-wide">
                  Moments in <span className="text-gradient-gold">Time</span>
                </h2>
              </div>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gold/20 -translate-x-1/2" />

                <div className="space-y-12">
                  {timeline.map((item, index) => (
                    <div
                      key={item.year}
                      className={`timeline-item relative grid grid-cols-1 md:grid-cols-2 gap-8 ${
                        index % 2 === 0 ? '' : 'md:text-right'
                      }`}
                    >
                      {/* Content */}
                      <div
                        className={`${
                          index % 2 === 0
                            ? 'md:pr-16 md:text-right'
                            : 'md:pl-16 md:order-2'
                        }`}
                      >
                        <span className="font-serif text-4xl md:text-5xl text-gradient-gold">
                          {item.year}
                        </span>
                        <h3 className="font-serif text-xl text-onyx mt-2 mb-3">
                          {item.title}
                        </h3>
                        <p className="font-sans text-sm text-onyx/50 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Empty space for alternating layout */}
                      <div className={index % 2 === 0 ? 'hidden md:block' : 'hidden md:block md:order-1'} />

                      {/* Dot */}
                      <div className="absolute left-0 md:left-1/2 top-2 w-4 h-4 bg-gold rounded-full -translate-x-1/2 border-4 border-onyx-light" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section ref={valuesRef} className="py-20 md:py-32">
            <div className="max-w-screen-xl mx-auto px-6 md:px-12">
              <div className="text-center mb-16">
                <span className="inline-block font-sans text-xs tracking-[0.5em] text-gold uppercase mb-6">
                  What Guides Us
                </span>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-onyx tracking-wide">
                  Our <span className="text-gradient-gold">Values</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value) => (
                  <div
                    key={value.title}
                    className="value-card group p-8 border border-gold/10 hover:border-gold/30 transition-colors duration-500"
                  >
                    <div className="text-gold mb-6 transition-transform duration-500 group-hover:scale-110">
                      {value.icon}
                    </div>
                    <h3 className="font-serif text-xl text-onyx mb-3">
                      {value.title}
                    </h3>
                    <p className="font-sans text-sm text-onyx/50 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Atelier CTA */}
          <section className="relative py-32 md:py-40 overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src="/images/about-atelier.jpg"
                alt="Vinod Jewellers Atelier"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-beige/80" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
              <span className="inline-block font-sans text-xs tracking-[0.5em] text-gold uppercase mb-6">
                Visit Our Workshop
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-onyx tracking-wide mb-6">
                The <span className="text-gradient-gold">Atelier</span>
              </h2>
              <p className="font-sans text-onyx/50 leading-relaxed mb-10 max-w-2xl mx-auto">
                Step behind the scenes and witness the magic of creation. Our
                master artisans welcome visitors to experience the art of
                haute joaillerie firsthand.
              </p>
              <Link
                href="/atelier"
                className="group inline-flex items-center gap-4 font-sans text-sm tracking-[0.3em] text-onyx bg-gold hover:bg-gold-light px-10 py-4 uppercase transition-all duration-500"
              >
                <span>Discover the Atelier</span>
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
