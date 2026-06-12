'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#collections', label: 'Collections' },
  { href: '#about', label: 'About' },
  { href: '#signature', label: 'Atelier' },
  { href: '#lookbook', label: 'Lookbook' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
]

// Dummy Data
const wishlistItems = [
  { id: 1, name: 'Kundan Maang Tikka', price: '₹4,85,000', image: '/images/piece-tiara.jpg' },
  { id: 2, name: 'Jadau Cocktail Ring', price: '₹1,25,000', image: '/images/piece-ring.jpg' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('#home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // IntersectionObserver for active link highlighting
  useEffect(() => {
    const sectionIds = navLinks.map(l => l.href.replace('#', ''))
    const sections = sectionIds
      .map(id => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`)
          }
        })
      },
      { threshold: 0.3, rootMargin: '-96px 0px 0px 0px' }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  // Prevent body scroll when any modal is open
  useEffect(() => {
    if (isMobileMenuOpen || isSearchOpen || isWishlistOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen, isSearchOpen, isWishlistOpen])

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const targetEl = document.getElementById(targetId)
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-beige/90 backdrop-blur-md border-b border-gold/10' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo */}
            <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="relative z-10">
              <div className="flex flex-col items-start">
                <Image 
                  src="/images/vinod-logo.svg" 
                  alt="Vinod Jewellers" 
                  width={160} 
                  height={47} 
                  className="h-10 md:h-12 w-auto"
                  style={{ filter: isScrolled ? 'brightness(0.2)' : 'brightness(0.2)' }}
                  priority
                />
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-12">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`group relative font-sans text-sm tracking-[0.2em] uppercase transition-colors duration-300 ${
                    activeSection === link.href
                      ? 'text-gold'
                      : 'text-onyx/70 hover:text-onyx'
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${
                    activeSection === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </a>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-6 relative z-10">
              {/* Search icon */}
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="hidden md:block text-onyx/70 hover:text-gold transition-colors duration-300"
                aria-label="Search"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </button>

              {/* Wishlist icon */}
              <button 
                onClick={() => setIsWishlistOpen(true)}
                className="hidden md:block text-onyx/70 hover:text-gold transition-colors duration-300"
                aria-label="Wishlist"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>

              {/* Mobile menu button */}
              <button
                className="lg:hidden flex flex-col gap-1.5 p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: 45, y: 6, backgroundColor: '#1A1A1A' } : { rotate: 0, y: 0, backgroundColor: '#1A1A1A' }}
                  className="w-6 h-px block transition-colors"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-6 h-px block bg-onyx transition-colors"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: -45, y: -6, backgroundColor: '#1A1A1A' } : { rotate: 0, y: 0, backgroundColor: '#1A1A1A' }}
                  className="w-6 h-px block transition-colors"
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-beige/95 backdrop-blur-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-beige-light border-l border-gold/10 flex flex-col justify-center px-12 shadow-2xl"
            >
              <div className="flex flex-col gap-8">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`block font-serif text-3xl tracking-[0.15em] uppercase transition-colors duration-300 ${
                        activeSection === link.href ? 'text-gold' : 'text-onyx hover:text-gold'
                      }`}
                    >
                      {link.label}
                    </a>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-16 pt-8 border-t border-gold/10"
              >
                <p className="font-sans text-xs tracking-[0.3em] text-onyx/40 uppercase mb-4">Contact</p>
                <a href="tel:+919980700622" className="font-sans text-sm text-onyx/70 hover:text-gold transition-colors">
                  +91 9980700622
                </a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}

        {/* Search Overlay */}
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-beige/95 backdrop-blur-md"
          >
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-8 right-8 md:top-12 md:right-12 text-onyx hover:text-gold transition-colors p-4"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <div className="w-full max-w-3xl px-6">
              <span className="block font-sans text-xs tracking-[0.3em] text-gold uppercase mb-6 text-center">
                What are you looking for?
              </span>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search collections, pieces..." 
                  className="w-full bg-transparent border-b-2 border-onyx/20 py-4 font-serif text-3xl md:text-5xl text-onyx placeholder:text-onyx/30 focus:outline-none focus:border-gold transition-colors text-center"
                  autoFocus
                />
              </div>
              <div className="mt-12 text-center">
                <p className="font-sans text-xs tracking-[0.2em] text-onyx/40 uppercase mb-4">Popular Searches</p>
                <div className="flex flex-wrap justify-center gap-6">
                  {['Nityam Daily Wear', 'Bridal Sets', 'Diamond Rings'].map((term) => (
                    <button key={term} className="font-serif text-lg text-onyx hover:text-gold transition-colors">
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Wishlist Drawer */}
        {isWishlistOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex justify-end"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-onyx/20 backdrop-blur-sm"
              onClick={() => setIsWishlistOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-md bg-beige h-full flex flex-col shadow-2xl border-l border-gold/20"
            >
              <div className="flex items-center justify-between p-8 border-b border-gold/10">
                <h2 className="font-serif text-2xl text-onyx">Your Wishlist</h2>
                <button onClick={() => setIsWishlistOpen(false)} className="text-onyx hover:text-gold transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="flex gap-6 group">
                    <div className="relative w-24 h-32 bg-beige-light border border-gold/10 overflow-hidden">
                      <Image src={item.image} alt={item.name} fill className="object-cover transition-transform group-hover:scale-105" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="font-serif text-lg text-onyx mb-2">{item.name}</h3>
                      <p className="font-sans text-gold text-sm tracking-widest mb-4">{item.price}</p>
                      <div className="flex items-center gap-4">
                        <a
                          href={`https://wa.me/919980700622?text=Hi, I'm interested in ${item.name} (${item.price})`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-sans text-[10px] tracking-[0.2em] uppercase text-onyx border-b border-onyx hover:text-gold hover:border-gold transition-colors"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-green-600"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                          Enquire
                        </a>
                        <a href="tel:+919980700622" className="font-sans text-[10px] tracking-[0.2em] uppercase text-onyx/40 hover:text-gold transition-colors">
                          Call
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}


      </AnimatePresence>
    </>
  )
}
