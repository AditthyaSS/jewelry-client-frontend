'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

/* ─── SVG Icon Components ─── */
const GoldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3c-2.5 3-4 6-4 9s1.5 6 4 9c2.5-3 4-6 4-9s-1.5-6-4-9z" />
    <path d="M3 12h18" />
  </svg>
)
const SilverIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
  </svg>
)
const DiamondIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M6 3h12l4 6-10 13L2 9l4-6z" /><path d="M2 9h20" /><path d="M10 3l-4 6 6 13 6-13-4-6" />
  </svg>
)
const EarringsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2v4" /><circle cx="12" cy="10" r="4" /><path d="M12 14v2" /><path d="M9 18a3 3 0 006 0" />
  </svg>
)
const RingIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <ellipse cx="12" cy="14" rx="8" ry="6" /><ellipse cx="12" cy="14" rx="4" ry="3" /><circle cx="12" cy="6" r="2" />
  </svg>
)
const DailyWearIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 3v1m0 16v1m-8-9H3m18 0h-1m-2.636-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707" />
    <circle cx="12" cy="12" r="4" />
  </svg>
)
const GemstoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2l3 5h6l-4.5 7L12 22l-4.5-8L3 7h6l3-5z" />
  </svg>
)
const WeddingIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
)
const GiftingIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="8" width="18" height="13" rx="2" /><path d="M12 8v13" /><path d="M3 12h18" />
    <path d="M12 8c-2-3-6-3-6 0s4 3 6 0z" /><path d="M12 8c2-3 6-3 6 0s-4 3-6 0z" />
  </svg>
)

const iconMap: Record<string, React.ReactNode> = {
  gold: <GoldIcon />, silver: <SilverIcon />, diamond: <DiamondIcon />,
  earrings: <EarringsIcon />, rings: <RingIcon />, dailywear: <DailyWearIcon />,
  gemstone: <GemstoneIcon />, wedding: <WeddingIcon />, gifting: <GiftingIcon />,
}

export const categories = [
  { id: 'gold', label: 'Gold', theme: { bg: '#FDF6DC', accent: '#8B6914', text: '#3D2B00', cardBg: '#FFFAED' }, color: '#F5C842' },
  { id: 'silver', label: 'Silver', theme: { bg: '#F0F0F0', accent: '#4A5568', text: '#1a1a2e', cardBg: '#FAFAFA' }, color: '#C0C0C0' },
  { id: 'diamond', label: 'Diamond', theme: { bg: '#EAF4FB', accent: '#1A2744', text: '#0d1b2a', cardBg: '#F5FBFF' }, color: '#E8F4F8' },
  { id: 'earrings', label: 'Earrings', theme: { bg: '#FDF0F6', accent: '#8B3A5C', text: '#3D0020', cardBg: '#FFF5F9' }, color: '#F9E8F0' },
  { id: 'rings', label: 'Rings', theme: { bg: '#FFF7EE', accent: '#8B4513', text: '#3D1800', cardBg: '#FFFAF5' }, color: '#FFF3E0' },
  { id: 'dailywear', label: 'Daily Wear', theme: { bg: '#EFF9F0', accent: '#2D6A4F', text: '#0D2B1A', cardBg: '#F5FFF6' }, color: '#E8F5E9' },
  { id: 'gemstone', label: 'Gemstone', theme: { bg: '#F7F0FD', accent: '#6B21A8', text: '#2D0050', cardBg: '#FDF5FF' }, color: '#F3E5F5' },
  { id: 'wedding', label: 'Wedding', theme: { bg: '#FFF9EC', accent: '#7B0D1E', text: '#2D0008', cardBg: '#FFFCF2' }, color: '#FFF8E1' },
  { id: 'gifting', label: 'Gifting', theme: { bg: '#EBF5FE', accent: '#1565C0', text: '#0a1f44', cardBg: '#F4FAFF' }, color: '#E3F2FD' },
]

/* ─── Preview product data for hover dropdown ─── */
const IMG = {
  goldChain: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=300&h=300&fit=crop',
  necklace: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=300&fit=crop',
  bangles: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=300&fit=crop',
  jhumka: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=300&h=300&fit=crop',
  bracelet: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&h=300&fit=crop',
  chainGold: 'https://images.unsplash.com/photo-1603561596112-0a132b757442?w=300&h=300&fit=crop',
  pendant: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop',
  ring: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=300&h=300&fit=crop',
  studs: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=300&h=300&fit=crop',
  gemstone: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=300&h=300&fit=crop',
}

const previewProducts: Record<string, { name: string; price: string; img: string }[]> = {
  gold: [
    { name: 'Classic Gold Chain', price: '₹45,000', img: IMG.goldChain },
    { name: 'Temple Necklace Set', price: '₹1,85,000', img: IMG.necklace },
    { name: 'Gold Bangles', price: '₹92,000', img: IMG.bangles },
    { name: 'Antique Gold Jhumka', price: '₹28,500', img: IMG.jhumka },
  ],
  silver: [
    { name: 'Silver Anklet Pair', price: '₹3,200', img: IMG.bracelet },
    { name: 'Oxidized Silver Choker', price: '₹5,800', img: IMG.chainGold },
    { name: 'Silver Toe Ring Set', price: '₹1,200', img: IMG.gemstone },
    { name: 'Filigree Silver Bangle', price: '₹7,500', img: IMG.pendant },
  ],
  diamond: [
    { name: 'Solitaire Pendant', price: '₹2,45,000', img: IMG.pendant },
    { name: 'Diamond Bracelet', price: '₹3,80,000', img: IMG.bracelet },
    { name: 'Diamond Stud Earrings', price: '₹1,20,000', img: IMG.studs },
    { name: 'Diamond Eternity Band', price: '₹95,000', img: IMG.ring },
  ],
  earrings: [
    { name: 'Chandbali Earrings', price: '₹48,000', img: IMG.bangles },
    { name: 'Pearl Drop Jhumkas', price: '₹22,000', img: IMG.jhumka },
    { name: 'Kundan Stud Tops', price: '₹15,500', img: IMG.studs },
    { name: 'Hoop Earrings Gold', price: '₹18,000', img: IMG.necklace },
  ],
  rings: [
    { name: 'Cocktail Ring Ruby', price: '₹65,000', img: IMG.ring },
    { name: 'Gold Band Ring', price: '₹18,000', img: IMG.pendant },
    { name: 'Engagement Solitaire', price: '₹1,50,000', img: IMG.goldChain },
    { name: 'Stackable Ring Set', price: '₹24,000', img: IMG.gemstone },
  ],
  dailywear: [
    { name: 'Minimalist Gold Studs', price: '₹8,500', img: IMG.studs },
    { name: 'Delicate Chain Bracelet', price: '₹12,000', img: IMG.bracelet },
    { name: 'Everyday Pendant', price: '₹15,000', img: IMG.necklace },
    { name: 'Slim Gold Bangle', price: '₹22,000', img: IMG.bangles },
  ],
  gemstone: [
    { name: 'Emerald Drop Necklace', price: '₹1,35,000', img: IMG.necklace },
    { name: 'Ruby Stud Earrings', price: '₹78,000', img: IMG.jhumka },
    { name: 'Sapphire Ring', price: '₹95,000', img: IMG.ring },
    { name: 'Multi-Gem Bracelet', price: '₹1,10,000', img: IMG.goldChain },
  ],
  wedding: [
    { name: 'Bridal Kundan Set', price: '₹4,50,000', img: IMG.bangles },
    { name: 'Maang Tikka Gold', price: '₹35,000', img: IMG.jhumka },
    { name: 'Bridal Choker Set', price: '₹3,80,000', img: IMG.necklace },
    { name: 'Wedding Haathphool', price: '₹28,000', img: IMG.studs },
  ],
  gifting: [
    { name: 'Gold Coin (10g)', price: '₹62,000', img: IMG.pendant },
    { name: 'Silver Gift Set', price: '₹8,500', img: IMG.bracelet },
    { name: 'Pearl Pendant Box', price: '₹18,000', img: IMG.gemstone },
    { name: 'Baby Gold Bracelet', price: '₹15,000', img: IMG.chainGold },
  ],
}

export { iconMap, previewProducts }

export function CategoryBrowseStrip() {
  const router = useRouter()
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/shop/${categoryId}`)
  }

  const handleMouseEnter = (categoryId: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current)
    setHoveredCategory(categoryId)
  }

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => setHoveredCategory(null), 120)
  }

  useEffect(() => {
    return () => { if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current) }
  }, [])

  const hoveredData = categories.find((c) => c.id === hoveredCategory)
  const hoveredProducts = hoveredCategory ? previewProducts[hoveredCategory] : null

  return (
    <div className="sticky z-40" style={{ top: '80px' }}>
      <div
        className="relative border-b transition-colors duration-300"
        style={{
          background: 'rgba(250,249,246,0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderColor: 'rgba(139,105,20,0.12)',
        }}
      >
        <div className="max-w-screen-2xl mx-auto px-4 md:px-12">
          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1 py-2.5 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {categories.map((cat) => (
              <div key={cat.id} className="relative" onMouseEnter={() => handleMouseEnter(cat.id)} onMouseLeave={handleMouseLeave}>
                <button
                  onClick={() => handleCategoryClick(cat.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 text-sm font-sans tracking-wide"
                  style={{
                    backgroundColor: hoveredCategory === cat.id ? `${cat.color}50` : 'transparent',
                    color: cat.theme.accent,
                    border: `1.5px solid ${hoveredCategory === cat.id ? cat.theme.accent : `${cat.theme.accent}20`}`,
                  }}
                >
                  <span className="flex-shrink-0">{iconMap[cat.id]}</span>
                  <span>{cat.label}</span>
                </button>
              </div>
            ))}
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-2 py-2.5 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full whitespace-nowrap transition-all duration-200 text-xs font-sans"
                style={{
                  backgroundColor: `${cat.color}25`,
                  color: cat.theme.accent,
                  border: `1px solid ${cat.theme.accent}15`,
                  flexShrink: 0,
                }}
              >
                <span className="flex-shrink-0">{iconMap[cat.id]}</span>
                <span className="font-medium">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hover Preview Dropdown — Desktop only */}
      <AnimatePresence>
        {hoveredCategory && hoveredData && hoveredProducts && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 hidden md:block"
            style={{ top: '100%' }}
            onMouseEnter={() => handleMouseEnter(hoveredCategory)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="max-w-screen-2xl mx-auto px-12">
              <div
                className="rounded-b-xl shadow-xl border border-t-0 p-5"
                style={{ backgroundColor: hoveredData.theme.cardBg, borderColor: `${hoveredData.theme.accent}12` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span style={{ color: hoveredData.theme.accent }}>{iconMap[hoveredData.id]}</span>
                    <h3 className="font-serif text-lg tracking-wide" style={{ color: hoveredData.theme.accent }}>
                      {hoveredData.label}
                    </h3>
                  </div>
                  <button
                    onClick={() => handleCategoryClick(hoveredData.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-sans tracking-wider uppercase hover:opacity-70 transition-opacity"
                    style={{ color: hoveredData.theme.accent }}
                  >
                    <span>View All</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {hoveredProducts.map((product, i) => (
                    <div
                      key={i}
                      onClick={() => handleCategoryClick(hoveredData.id)}
                      className="group cursor-pointer rounded-lg overflow-hidden transition-shadow duration-200 hover:shadow-md"
                      style={{ backgroundColor: '#fff', border: `1px solid ${hoveredData.theme.accent}08` }}
                    >
                      <div className="aspect-square overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={product.img} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                      </div>
                      <div className="p-2.5">
                        <p className="font-sans text-xs truncate" style={{ color: hoveredData.theme.text }}>{product.name}</p>
                        <p className="font-sans text-sm font-semibold mt-0.5" style={{ color: hoveredData.theme.accent }}>{product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
