'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export function LuxuryCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isMobile, setIsMobile] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if device supports hover (desktop)
    const hasHover = window.matchMedia('(hover: hover)').matches
    setIsMobile(!hasHover)
    
    if (!hasHover) return

    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    if (!cursor || !cursorDot) return

    // Mouse position tracking with smoothing
    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      setIsVisible(true)
    }

    // Smooth cursor animation
    const animateCursor = () => {
      const dx = mouseX - cursorX
      const dy = mouseY - cursorY
      
      cursorX += dx * 0.15
      cursorY += dy * 0.15

      if (cursor) {
        cursor.style.transform = `translate(${cursorX - 20}px, ${cursorY - 20}px)`
      }
      if (cursorDot) {
        cursorDot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
      }

      requestAnimationFrame(animateCursor)
    }

    // Hover detection for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.dataset.cursor === 'pointer'
      ) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = () => {
      setIsHovering(false)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    animateCursor()

    // Hide default cursor
    document.body.style.cursor = 'none'

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'auto'
    }
  }, [])

  // Animate cursor state changes
  useEffect(() => {
    if (!cursorRef.current) return
    
    gsap.to(cursorRef.current, {
      scale: isHovering ? 1.5 : isClicking ? 0.8 : 1,
      borderColor: isHovering ? 'var(--gold)' : 'var(--gold-dark)',
      opacity: isVisible ? 1 : 0,
      duration: 0.3,
      ease: 'power2.out',
    })
    
    if (cursorDotRef.current) {
      gsap.to(cursorDotRef.current, {
        opacity: isVisible ? 1 : 0,
        duration: 0.3,
      })
    }
  }, [isHovering, isClicking, isVisible])

  if (isMobile) return null

  return (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-[9999] mix-blend-difference"
        style={{ willChange: 'transform', opacity: 0 }}
      >
        <div 
          className="w-full h-full rounded-full border border-gold/60 transition-colors duration-300"
          style={{
            boxShadow: isHovering ? '0 0 20px var(--gold), inset 0 0 10px var(--gold)' : 'none',
          }}
        />
      </div>
      
      {/* Center dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-[9999]"
        style={{ willChange: 'transform', opacity: 0 }}
      >
        <div className="w-full h-full rounded-full bg-gold" />
      </div>
    </>
  )
}
