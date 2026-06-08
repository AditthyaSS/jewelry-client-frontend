'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { LuxuryCursor } from '@/components/luxury-cursor'
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FloatingParticles } from '@/components/floating-particles'

gsap.registerPlugin(ScrollTrigger)

export default function ContactPage() {
  const heroRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle')

  useEffect(() => {
    const hero = heroRef.current
    const contact = contactRef.current
    const form = formRef.current

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

    if (contact) {
      gsap.fromTo(
        contact.children,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contact,
            start: 'top 80%',
          },
        }
      )
    }

    if (form) {
      gsap.fromTo(
        form.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: form,
            start: 'top 85%',
          },
        }
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('submitting')
    // Simulate form submission
    setTimeout(() => {
      setFormState('success')
      // Reset form after 3 seconds
      setTimeout(() => setFormState('idle'), 3000)
    }, 1500)
  }

  return (
    <>
      <LuxuryCursor />
      <SmoothScrollProvider>
        <Header />

        <main className="bg-beige">
          {/* Hero Section */}
          <section
            ref={heroRef}
            className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-24"
          >
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/testimonial-1.jpg"
                alt="Vrishva Aura boutique"
                fill
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-beige-light/90 via-beige-light/70 to-beige-light" />
              <div className="absolute inset-0 bg-gradient-to-r from-beige-light/80 via-transparent to-beige-light/80" />
            </div>

            <FloatingParticles count={20} className="z-10 opacity-50" />

            <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
              <span className="hero-text inline-block font-sans text-xs tracking-[0.5em] text-gold uppercase mb-6">
                Connect With Us
              </span>
              <h1 className="hero-text font-serif text-5xl md:text-6xl lg:text-7xl text-onyx tracking-wide mb-6">
                Get in <span className="text-gradient-gold">Touch</span>
              </h1>
              <p className="hero-text font-sans text-lg text-onyx/60 max-w-2xl mx-auto leading-relaxed">
                Whether you wish to commission a bespoke piece or schedule a private viewing, our dedicated concierge team is at your service.
              </p>
            </div>

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-gold/50 to-transparent" />
          </section>

          {/* Contact Layout */}
          <section className="py-24 md:py-32 bg-beige">
            <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                
                {/* Contact Info */}
                <div ref={contactRef} className="space-y-16">
                  <div>
                    <h2 className="font-serif text-3xl md:text-4xl text-onyx mb-8">
                      The Concierge
                    </h2>
                    <p className="font-sans text-onyx/60 leading-relaxed mb-8">
                      Our specialists are available Monday through Saturday to assist you with inquiries regarding our collections, bespoke services, and private appointments.
                    </p>
                    <div className="space-y-6">
                      <div>
                        <span className="block font-sans text-xs tracking-[0.3em] text-gold uppercase mb-2">Email</span>
                        <a href="mailto:concierge@divineaura.com" className="font-serif text-xl text-onyx hover:text-gold transition-colors duration-300">
                          concierge@divineaura.com
                        </a>
                      </div>
                      <div>
                        <span className="block font-sans text-xs tracking-[0.3em] text-gold uppercase mb-2">Phone</span>
                        <a href="tel:+33142608080" className="font-serif text-xl text-onyx hover:text-gold transition-colors duration-300">
                          +33 1 42 60 80 80
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gold/10 pt-16">
                    <h2 className="font-serif text-3xl md:text-4xl text-onyx mb-8">
                      Flagship Salon
                    </h2>
                    <address className="font-sans text-onyx/60 leading-relaxed not-italic space-y-2">
                      <p className="font-serif text-xl text-onyx mb-4">Vrishva Aura Paris</p>
                      <p>15 Place Vendôme</p>
                      <p>75001 Paris, France</p>
                      <p className="pt-4">Monday - Saturday: 10:30 AM - 7:00 PM</p>
                      <p>Sunday: Closed</p>
                    </address>
                  </div>

                  <div className="border-t border-gold/10 pt-16">
                    <h2 className="font-serif text-3xl md:text-4xl text-onyx mb-8">
                      Global Ateliers
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <p className="font-serif text-xl text-onyx mb-2">New York</p>
                        <p className="font-sans text-onyx/60">Fifth Avenue</p>
                      </div>
                      <div>
                        <p className="font-serif text-xl text-onyx mb-2">London</p>
                        <p className="font-sans text-onyx/60">New Bond Street</p>
                      </div>
                      <div>
                        <p className="font-serif text-xl text-onyx mb-2">Tokyo</p>
                        <p className="font-sans text-onyx/60">Ginza District</p>
                      </div>
                      <div>
                        <p className="font-serif text-xl text-onyx mb-2">Dubai</p>
                        <p className="font-sans text-onyx/60">The Dubai Mall</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div>
                  <div className="bg-beige-light border border-gold/10 p-8 md:p-12 sticky top-32">
                    <h3 className="font-serif text-2xl md:text-3xl text-onyx mb-8">Send an Inquiry</h3>
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block font-sans text-xs tracking-[0.2em] text-onyx/60 uppercase mb-3">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          className="w-full bg-transparent border-b border-gold/20 py-3 font-sans text-onyx placeholder:text-onyx/30 focus:outline-none focus:border-gold transition-colors duration-300"
                          placeholder="Your Name"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block font-sans text-xs tracking-[0.2em] text-onyx/60 uppercase mb-3">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          className="w-full bg-transparent border-b border-gold/20 py-3 font-sans text-onyx placeholder:text-onyx/30 focus:outline-none focus:border-gold transition-colors duration-300"
                          placeholder="your.email@example.com"
                        />
                      </div>

                      <div>
                        <label htmlFor="inquiry" className="block font-sans text-xs tracking-[0.2em] text-onyx/60 uppercase mb-3">
                          Nature of Inquiry
                        </label>
                        <select
                          id="inquiry"
                          className="w-full bg-transparent border-b border-gold/20 py-3 font-sans text-onyx focus:outline-none focus:border-gold transition-colors duration-300 appearance-none rounded-none"
                        >
                          <option value="bespoke">Bespoke Creation</option>
                          <option value="appointment">Private Appointment</option>
                          <option value="collection">Collection Information</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="message" className="block font-sans text-xs tracking-[0.2em] text-onyx/60 uppercase mb-3">
                          Message *
                        </label>
                        <textarea
                          id="message"
                          required
                          rows={4}
                          className="w-full bg-transparent border-b border-gold/20 py-3 font-sans text-onyx placeholder:text-onyx/30 focus:outline-none focus:border-gold transition-colors duration-300 resize-none"
                          placeholder="How may we assist you?"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        disabled={formState !== 'idle'}
                        className="w-full group relative inline-flex items-center justify-center gap-4 font-sans text-sm tracking-[0.3em] text-beige bg-onyx hover:bg-gold px-10 py-5 uppercase transition-all duration-500 disabled:opacity-70 disabled:hover:bg-onyx mt-8"
                      >
                        <span>
                          {formState === 'idle' && 'Submit Inquiry'}
                          {formState === 'submitting' && 'Sending...'}
                          {formState === 'success' && 'Sent Successfully'}
                        </span>
                      </button>
                    </form>
                  </div>
                </div>

              </div>
            </div>
          </section>
        </main>

        <Footer />
      </SmoothScrollProvider>
    </>
  )
}
