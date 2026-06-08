'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
}

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const particlesRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  
  // Generate particles for the preloader
  const particles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2,
  }))

  useEffect(() => {
    // Animate progress
    const progressAnimation = gsap.to({ value: 0 }, {
      value: 100,
      duration: 3,
      ease: 'power2.inOut',
      onUpdate: function() {
        setProgress(Math.round(this.targets()[0].value))
      },
      onComplete: () => {
        setIsComplete(true)
        setTimeout(onComplete, 800)
      }
    })

    // Animate logo entrance
    if (logoRef.current) {
      gsap.fromTo(logoRef.current, 
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out' }
      )
    }

    // Animate particles floating
    if (particlesRef.current) {
      const particleElements = particlesRef.current.querySelectorAll('.particle')
      particleElements.forEach((particle, i) => {
        gsap.to(particle, {
          y: -20 + Math.random() * 40,
          x: -10 + Math.random() * 20,
          opacity: 0.3 + Math.random() * 0.5,
          duration: 2 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.1,
        })
      })
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
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-beige"
        >
          {/* Gold particles background */}
          <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
              <div
                key={particle.id}
                className="particle absolute rounded-full bg-gold opacity-30"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: particle.size,
                  height: particle.size,
                  boxShadow: '0 0 10px var(--gold)',
                }}
              />
            ))}
          </div>

          {/* Radial glow effect */}
          <div className="absolute inset-0 bg-gradient-radial from-gold/5 via-transparent to-transparent" />

          {/* Logo and progress */}
          <div className="relative z-10 flex flex-col items-center gap-12">
            <div ref={logoRef} className="flex flex-col items-center gap-6">
              {/* Vrishva Aura Logo */}
              <div className="relative">
                <svg 
                  width="80" 
                  height="80" 
                  viewBox="0 0 80 80" 
                  className="text-gold"
                  fill="none"
                >
                  {/* Lotus flower symbol */}
                  <path
                    d="M40 10 C40 10, 55 25, 55 40 C55 55, 40 70, 40 70 C40 70, 25 55, 25 40 C25 25, 40 10, 40 10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                    className="animate-pulse"
                  />
                  <path
                    d="M40 15 C50 30, 65 35, 70 40 C65 45, 50 50, 40 65"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                    opacity="0.6"
                  />
                  <path
                    d="M40 15 C30 30, 15 35, 10 40 C15 45, 30 50, 40 65"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                    opacity="0.6"
                  />
                  <circle cx="40" cy="40" r="5" fill="currentColor" opacity="0.8" />
                </svg>
                
                {/* Glow effect behind logo */}
                <div className="absolute inset-0 blur-2xl bg-gold/20 scale-150" />
              </div>

              {/* Brand name */}
              <h1 className="font-serif text-4xl md:text-5xl tracking-[0.3em] text-gradient-gold uppercase">
                Vrishva Aura
              </h1>
              
              <p className="font-sans text-xs tracking-[0.5em] text-onyx/50 uppercase">
                Where Divinity Meets Luxury
              </p>
            </div>

            {/* Progress bar */}
            <div className="flex flex-col items-center gap-4 w-64">
              <div className="w-full h-px bg-gold/20 relative overflow-hidden">
                <motion.div
                  ref={progressRef}
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-gold-dark via-gold to-gold-light"
                  style={{ width: `${progress}%` }}
                />
              </div>
              
              <span className="font-sans text-sm tracking-[0.3em] text-gold/80 tabular-nums">
                {progress}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
