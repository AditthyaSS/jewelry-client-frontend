'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const footer = footerRef.current
    if (!footer) return

    gsap.fromTo(
      footer.querySelectorAll('.footer-col'),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 90%',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <footer id="contact" ref={footerRef} className="relative bg-beige border-t border-gold/10">
      {/* Newsletter Section */}
      <div className="border-b border-gold/10">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="footer-col">
              <h3 className="font-serif text-3xl md:text-4xl text-onyx mb-4">
                Join the <span className="text-gradient-gold">Vinod Jewellers</span> Family
              </h3>
              <p className="font-sans text-onyx/50 max-w-md">
                Be the first to discover new collections, exclusive offers, and
                the stories behind our creations.
              </p>
            </div>
            <div className="footer-col">
              <form className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-beige-light border border-gold/20 px-6 py-4 font-sans text-onyx placeholder:text-onyx/30 focus:outline-none focus:border-gold transition-colors duration-300"
                />
                <button
                  type="submit"
                  className="font-sans text-sm tracking-[0.2em] text-onyx bg-gold hover:bg-gold-light px-8 py-4 uppercase transition-colors duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 footer-col">
            <a href="#home" className="inline-block mb-6">
              <Image 
                src="/images/vinod-logo.svg" 
                alt="Vinod Jewellers" 
                width={140} 
                height={41} 
                className="h-8 w-auto"
                style={{ filter: 'brightness(0.2)' }}
              />
            </a>
            <p className="font-sans text-sm text-onyx/40 leading-relaxed mb-2 max-w-xs">
              Crafted with love, Cherished for generations.
            </p>
            <p className="font-sans text-sm text-onyx/40 leading-relaxed mb-6 max-w-xs">
              For over three decades, a beacon of trust and craftsmanship.
            </p>
            <div className="flex items-center gap-4">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/vinodjewellers.in"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-gold/20 hover:border-gold hover:bg-gold/10 flex items-center justify-center transition-all duration-300"
                aria-label="Follow us on Instagram"
              >
                <svg className="w-4 h-4 text-onyx/60 hover:text-gold" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="https://www.facebook.com/share/1L5Q9tVCTp/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-gold/20 hover:border-gold hover:bg-gold/10 flex items-center justify-center transition-all duration-300"
                aria-label="Follow us on Facebook"
              >
                <svg className="w-4 h-4 text-onyx/60 hover:text-gold" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>
              {/* WhatsApp */}
              <a
                href="https://wa.me/919980700622"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-gold/20 hover:border-gold hover:bg-gold/10 flex items-center justify-center transition-all duration-300"
                aria-label="Chat on WhatsApp"
              >
                <svg className="w-4 h-4 text-onyx/60 hover:text-gold" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Collections */}
          <div className="footer-col">
            <h4 className="font-serif text-lg text-onyx mb-6">Collections</h4>
            <ul className="space-y-3">
              {['Nityam', 'Pavitra', 'Shringar', 'Silver Wear', 'Hira'].map((item) => (
                <li key={item}>
                  <a
                    href="#collections"
                    onClick={(e) => { e.preventDefault(); document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' }) }}
                    className="font-sans text-sm text-onyx/50 hover:text-gold transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* The House */}
          <div className="footer-col">
            <h4 className="font-serif text-lg text-onyx mb-6">The House</h4>
            <ul className="space-y-3">
              {['Our Heritage', 'Artisans', 'Sustainability', 'Press', 'Careers'].map((item) => (
                <li key={item}>
                  <a
                    href="#about"
                    onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) }}
                    className="font-sans text-sm text-onyx/50 hover:text-gold transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h4 className="font-serif text-lg text-onyx mb-6">Services</h4>
            <ul className="space-y-3">
              {['Private Appointments', 'Bespoke Creations', 'Care & Repair', 'Gift Services', 'FAQs'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/services/${item.toLowerCase().replace(/\s/g, '-')}`}
                    className="font-sans text-sm text-onyx/50 hover:text-gold transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4 className="font-serif text-lg text-onyx mb-6">Contact</h4>
            <ul className="space-y-4">
              <li>
                <span className="block font-sans text-xs tracking-[0.2em] text-gold uppercase mb-1">
                  Store
                </span>
                <p className="font-sans text-sm text-onyx/50 leading-relaxed">
                  VVJS Tower, Sanjay Nagar,<br />
                  Near Bharath Petrol Pump,<br />
                  Bengaluru, Karnataka – 560094
                </p>
              </li>
              <li>
                <span className="block font-sans text-xs tracking-[0.2em] text-gold uppercase mb-1">
                  Phone
                </span>
                <a
                  href="tel:+919980700622"
                  className="font-sans text-sm text-onyx/50 hover:text-gold transition-colors duration-300"
                >
                  +91 9980700622
                </a>
              </li>
              <li>
                <span className="block font-sans text-xs tracking-[0.2em] text-gold uppercase mb-1">
                  WhatsApp
                </span>
                <a
                  href="https://wa.me/919980700622"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-onyx/50 hover:text-gold transition-colors duration-300"
                >
                  Chat with us →
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gold/10">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-sans text-xs text-onyx/30">
              &copy; {new Date().getFullYear()} Vinod Jewellers. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Settings'].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(/\s/g, '-')}`}
                  className="font-sans text-xs text-onyx/30 hover:text-gold transition-colors duration-300"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
