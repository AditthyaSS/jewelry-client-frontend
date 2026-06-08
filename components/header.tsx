'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/collections', label: 'Collections' },
  { href: '/about', label: 'About' },
  { href: '/atelier', label: 'Atelier' },
  { href: '/premium', label: 'Premium' },
  { href: '/contact', label: 'Contact' },
]

// Dummy Data
const cartItems = [
  { id: 1, name: 'Polki Choker Necklace', price: '₹2,75,000', image: '/images/piece-necklace.jpg' },
]
const wishlistItems = [
  { id: 1, name: 'Kundan Maang Tikka', price: '₹4,85,000', image: '/images/piece-tiara.jpg' },
  { id: 2, name: 'Jadau Cocktail Ring', price: '₹1,25,000', image: '/images/piece-ring.jpg' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when any modal is open
  useEffect(() => {
    if (isMobileMenuOpen || isSearchOpen || isWishlistOpen || isCartOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen, isSearchOpen, isWishlistOpen, isCartOpen])

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
            <Link href="/" className="relative z-10">
              <div className="flex flex-col items-start">
                <span className="font-serif text-2xl md:text-3xl tracking-[0.2em] text-gradient-gold uppercase">
                  Vrishva Aura
                </span>
                <span className="font-sans text-[8px] md:text-[10px] tracking-[0.4em] text-onyx/40 uppercase mt-0.5">
                  Luxury Jewellery
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-12">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative font-sans text-sm tracking-[0.2em] text-onyx/70 hover:text-onyx uppercase transition-colors duration-300"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
                </Link>
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

              {/* Cart icon */}
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative text-onyx/70 hover:text-gold transition-colors duration-300"
                aria-label="Shopping bag"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold text-onyx text-[10px] rounded-full flex items-center justify-center font-sans">
                  {cartItems.length}
                </span>
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
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block font-serif text-3xl tracking-[0.15em] text-onyx hover:text-gold transition-colors duration-300 uppercase"
                    >
                      {link.label}
                    </Link>
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
                <a href="mailto:concierge@divineaura.com" className="font-sans text-sm text-onyx/70 hover:text-gold transition-colors">
                  concierge@divineaura.com
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
                  {['Kundan Maang Tikka', 'Bridal Sets', 'Polki Choker'].map((term) => (
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
                        <button className="font-sans text-[10px] tracking-[0.2em] uppercase text-onyx border-b border-onyx hover:text-gold hover:border-gold transition-colors">
                          Add to Cart
                        </button>
                        <button className="font-sans text-[10px] tracking-[0.2em] uppercase text-onyx/40 hover:text-red-500 transition-colors">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Cart Drawer */}
        {isCartOpen && (
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
              onClick={() => setIsCartOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-md bg-beige h-full flex flex-col shadow-2xl border-l border-gold/20"
            >
              <div className="flex items-center justify-between p-8 border-b border-gold/10">
                <h2 className="font-serif text-2xl text-onyx">Shopping Bag</h2>
                <button onClick={() => setIsCartOpen(false)} className="text-onyx hover:text-gold transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-6 group">
                    <div className="relative w-24 h-32 bg-beige-light border border-gold/10 overflow-hidden">
                      <Image src={item.image} alt={item.name} fill className="object-cover transition-transform group-hover:scale-105" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="font-serif text-lg text-onyx mb-2">{item.name}</h3>
                      <p className="font-sans text-gold text-sm tracking-widest mb-4">{item.price}</p>
                      <div className="flex items-center gap-4">
                        <select className="bg-transparent border border-gold/20 text-onyx text-xs p-1 focus:outline-none">
                          <option>1</option>
                          <option>2</option>
                        </select>
                        <button className="font-sans text-[10px] tracking-[0.2em] uppercase text-onyx/40 hover:text-red-500 transition-colors">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-8 border-t border-gold/10 bg-beige-light">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-sans text-xs tracking-[0.2em] uppercase text-onyx/70">Subtotal</span>
                  <span className="font-serif text-xl text-gold">₹2,75,000</span>
                </div>
                <button className="w-full bg-onyx text-beige hover:bg-gold py-5 font-sans text-xs tracking-[0.3em] uppercase transition-colors duration-300">
                  Proceed to Checkout
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
