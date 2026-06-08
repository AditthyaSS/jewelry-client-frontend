'use client'

import { motion } from 'framer-motion'

export function RotatingBadge() {
  const text = "VRISHVA AURA • ROYAL HERITAGE • "
  
  return (
    <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity duration-500 cursor-pointer">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-gold fill-current">
          <path
            id="textPath"
            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            fill="none"
          />
          <text className="text-[11px] font-sans tracking-[0.2em] uppercase">
            <textPath href="#textPath" startOffset="0%">
              {text}
            </textPath>
          </text>
        </svg>
      </motion.div>
      <div className="absolute w-8 h-8 flex items-center justify-center text-gold">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-full h-full">
          <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
        </svg>
      </div>
    </div>
  )
}
