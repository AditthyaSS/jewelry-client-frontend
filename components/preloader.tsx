'use client'

import { useEffect, useState, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'

interface Particle {
  id: number
  x: number
  y: number
  size: number
}

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const logoRef = useRef<HTMLDivElement>(null)

  // Generate particles only on client to avoid hydration mismatch
  const particles: Particle[] = useMemo(() => {
    if (typeof window === 'undefined') return []
    return Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 2,
    }))
  }, [])

  useEffect(() => {
    setIsMounted(true)

    const progressAnimation = gsap.to({ value: 0 }, {
      value: 100,
      duration: 2.8,
      ease: 'power2.inOut',
      onUpdate: function () {
        setProgress(Math.round(this.targets()[0].value))
      },
      onComplete: () => {
        setIsComplete(true)
        setTimeout(onComplete, 600)
      },
    })

    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' }
      )
    }

    return () => {
      progressAnimation.kill()
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-beige"
        >
          {/* Gold particles — rendered only on client */}
          {isMounted && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {particles.map((p) => (
                <motion.div
                  key={p.id}
                  className="absolute rounded-full bg-gold"
                  style={{
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    width: p.size,
                    height: p.size,
                    boxShadow: '0 0 8px var(--gold)',
                  }}
                  animate={{
                    y: [-10, 10, -10],
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    duration: 3 + p.id * 0.1,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-radial from-gold/5 via-transparent to-transparent" />

          <div className="relative z-10 flex flex-col items-center gap-10">
            <div ref={logoRef} className="flex flex-col items-center gap-5">
              <div className="relative">
                <svg width="70" height="70" viewBox="0 0 80 80" className="text-gold" fill="none">
                  <path d="M40 10 C40 10, 55 25, 55 40 C55 55, 40 70, 40 70 C40 70, 25 55, 25 40 C25 25, 40 10, 40 10" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <path d="M40 15 C50 30, 65 35, 70 40 C65 45, 50 50, 40 65" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />
                  <path d="M40 15 C30 30, 15 35, 10 40 C15 45, 30 50, 40 65" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />
                  <circle cx="40" cy="40" r="4" fill="currentColor" opacity="0.8" />
                </svg>
                <div className="absolute inset-0 blur-2xl bg-gold/15 scale-150" />
              </div>

              <h1 className="font-serif text-3xl md:text-4xl tracking-[0.25em] text-gradient-gold uppercase">
                Vinod Jewellers
              </h1>
              <p className="font-sans text-[10px] tracking-[0.5em] text-onyx/40 uppercase">
                Crafted with Love, Cherished for Generations
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 w-56">
              <div className="w-full h-px bg-gold/20 relative overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-gold-dark via-gold to-gold-light"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="font-sans text-xs tracking-[0.3em] text-gold/70 tabular-nums">
                {progress}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
