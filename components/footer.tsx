'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

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
    <footer ref={footerRef} className="relative bg-beige border-t border-gold/10">
      {/* Newsletter Section */}
      <div className="border-b border-gold/10">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="footer-col">
              <h3 className="font-serif text-3xl md:text-4xl text-onyx mb-4">
                Join the <span className="text-gradient-gold">Divine</span> Circle
              </h3>
              <p className="font-sans text-onyx/50 max-w-md">
                Be the first to discover new collections, exclusive events, and
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
            <Link href="/" className="inline-block mb-6">
              <span className="font-serif text-2xl tracking-[0.2em] text-gradient-gold uppercase">
                Vrishva Aura
              </span>
            </Link>
            <p className="font-sans text-sm text-onyx/40 leading-relaxed mb-6 max-w-xs">
              Where divinity meets luxury. Crafting ethereal jewellery since 1847.
            </p>
            <div className="flex items-center gap-4">
              {['instagram', 'pinterest', 'facebook', 'linkedin'].map((social) => (
                <a
                  key={social}
                  href={`https://${social}.com/divineaura`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-gold/20 hover:border-gold hover:bg-gold/10 flex items-center justify-center transition-all duration-300"
                  aria-label={`Follow us on ${social}`}
                >
                  <svg className="w-4 h-4 text-onyx/60 hover:text-gold" viewBox="0 0 24 24" fill="currentColor">
                    {social === 'instagram' && (
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    )}
                    {social === 'pinterest' && (
                      <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                    )}
                    {social === 'facebook' && (
                      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                    )}
                    {social === 'linkedin' && (
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667h-3.554v-11.452h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zm-15.11-13.019c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019h-3.564v-11.452h3.564v11.452zm15.106-20.452h-20.454c-.979 0-1.771.774-1.771 1.729v20.542c0 .956.792 1.729 1.771 1.729h20.451c.978 0 1.778-.773 1.778-1.729v-20.542c0-.955-.8-1.729-1.778-1.729z" />
                    )}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Collections */}
          <div className="footer-col">
            <h4 className="font-serif text-lg text-onyx mb-6">Collections</h4>
            <ul className="space-y-3">
              {['The Royal Rajwada', 'The Divine Polki', 'The Jadau Heritage', 'The Navratna Elegance', 'Bridal Sets'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/collections/${item.toLowerCase().replace(/\s/g, '-')}`}
                    className="font-sans text-sm text-onyx/50 hover:text-gold transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* House */}
          <div className="footer-col">
            <h4 className="font-serif text-lg text-onyx mb-6">The House</h4>
            <ul className="space-y-3">
              {['Our Heritage', 'Artisans', 'Sustainability', 'Press', 'Careers'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(/\s/g, '-')}`}
                    className="font-sans text-sm text-onyx/50 hover:text-gold transition-colors duration-300"
                  >
                    {item}
                  </Link>
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
                  Concierge
                </span>
                <a
                  href="mailto:concierge@divineaura.com"
                  className="font-sans text-sm text-onyx/50 hover:text-gold transition-colors duration-300"
                >
                  concierge@divineaura.com
                </a>
              </li>
              <li>
                <span className="block font-sans text-xs tracking-[0.2em] text-gold uppercase mb-1">
                  Flagship
                </span>
                <p className="font-sans text-sm text-onyx/50">
                  Place Vend&ocirc;me, Paris
                </p>
              </li>
              <li>
                <span className="block font-sans text-xs tracking-[0.2em] text-gold uppercase mb-1">
                  Phone
                </span>
                <a
                  href="tel:+33142608080"
                  className="font-sans text-sm text-onyx/50 hover:text-gold transition-colors duration-300"
                >
                  +33 1 42 60 80 80
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
              &copy; {new Date().getFullYear()} Vrishva Aura. All rights reserved.
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
