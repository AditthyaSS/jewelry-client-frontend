'use client'

import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { categories, iconMap } from '@/components/category-browse-strip'

/* ─── Verified working Unsplash jewellery image pool ─── */
const IMG = {
  goldChain: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=400&h=400&fit=crop',
  necklace: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
  bangles: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop',
  jhumka: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&h=400&fit=crop',
  bracelet: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop',
  chainGold: 'https://images.unsplash.com/photo-1603561596112-0a132b757442?w=400&h=400&fit=crop',
  pendant: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop',
  ring: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&h=400&fit=crop',
  studs: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=400&h=400&fit=crop',
  gemstone: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop',
  luxury1: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&h=400&fit=crop',
  luxury2: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=400&h=400&fit=crop',
  luxury3: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=400&h=400&fit=crop',
  luxury4: 'https://images.unsplash.com/photo-1609042890394-851f9de28e9a?w=400&h=400&fit=crop',
  luxury5: 'https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?w=400&h=400&fit=crop',
  luxury6: 'https://images.unsplash.com/photo-1608042314453-ae338d80c427?w=400&h=400&fit=crop',
}

const fullProducts: Record<string, { name: string; price: string; img: string; badge?: string }[]> = {
  gold: [
    { name: 'Classic Gold Chain 22K', price: '₹45,000', img: IMG.goldChain },
    { name: 'Temple Necklace Set', price: '₹1,85,000', img: IMG.necklace, badge: 'Bestseller' },
    { name: 'Gold Bangles (Set of 4)', price: '₹92,000', img: IMG.bangles },
    { name: 'Antique Gold Jhumka', price: '₹28,500', img: IMG.jhumka },
    { name: 'Gold Cuff Bracelet', price: '₹68,000', img: IMG.bracelet, badge: 'New' },
    { name: 'Mango Mala Necklace', price: '₹2,40,000', img: IMG.chainGold },
    { name: 'Gold Nose Pin', price: '₹4,200', img: IMG.gemstone },
    { name: 'Lakshmi Pendant', price: '₹15,800', img: IMG.pendant },
  ],
  silver: [
    { name: 'Silver Anklet Pair', price: '₹3,200', img: IMG.bracelet },
    { name: 'Oxidized Silver Choker', price: '₹5,800', img: IMG.chainGold, badge: 'Trending' },
    { name: 'Silver Toe Ring Set', price: '₹1,200', img: IMG.gemstone },
    { name: 'Filigree Silver Bangle', price: '₹7,500', img: IMG.pendant },
    { name: 'Silver Jhumka Earrings', price: '₹2,800', img: IMG.jhumka, badge: 'New' },
    { name: 'Sterling Silver Ring', price: '₹1,800', img: IMG.ring },
    { name: 'Silver Payal (Pair)', price: '₹4,500', img: IMG.bangles },
    { name: 'Oxidized Cuff Bracelet', price: '₹3,600', img: IMG.luxury1 },
  ],
  diamond: [
    { name: 'Solitaire Pendant 0.5ct', price: '₹2,45,000', img: IMG.pendant, badge: 'Premium' },
    { name: 'Diamond Tennis Bracelet', price: '₹3,80,000', img: IMG.luxury2 },
    { name: 'Diamond Stud Earrings', price: '₹1,20,000', img: IMG.studs },
    { name: 'Diamond Eternity Band', price: '₹95,000', img: IMG.ring },
    { name: 'Diamond Cluster Ring', price: '₹1,85,000', img: IMG.necklace, badge: 'Bestseller' },
    { name: 'Halo Diamond Pendant', price: '₹1,60,000', img: IMG.jhumka },
    { name: 'Diamond Mangalsutra', price: '₹78,000', img: IMG.bangles },
    { name: 'Princess Cut Solitaire', price: '₹4,20,000', img: IMG.bracelet },
  ],
  earrings: [
    { name: 'Chandbali Earrings', price: '₹48,000', img: IMG.bangles, badge: 'Bestseller' },
    { name: 'Pearl Drop Jhumkas', price: '₹22,000', img: IMG.jhumka },
    { name: 'Kundan Stud Tops', price: '₹15,500', img: IMG.studs },
    { name: 'Hoop Earrings Gold', price: '₹18,000', img: IMG.necklace },
    { name: 'Diamond Ear Cuff', price: '₹35,000', img: IMG.gemstone, badge: 'New' },
    { name: 'Polki Drop Earrings', price: '₹62,000', img: IMG.pendant },
    { name: 'Threader Earrings', price: '₹8,500', img: IMG.chainGold },
    { name: 'Meenakari Jhumka', price: '₹28,000', img: IMG.luxury3 },
  ],
  rings: [
    { name: 'Cocktail Ring Ruby', price: '₹65,000', img: IMG.ring },
    { name: 'Gold Band Ring', price: '₹18,000', img: IMG.pendant },
    { name: 'Engagement Solitaire', price: '₹1,50,000', img: IMG.luxury4, badge: 'Bestseller' },
    { name: 'Stackable Ring Set', price: '₹24,000', img: IMG.gemstone },
    { name: 'Navratna Ring', price: '₹42,000', img: IMG.jhumka },
    { name: 'Platinum Band', price: '₹38,000', img: IMG.necklace },
    { name: 'Emerald Cocktail Ring', price: '₹88,000', img: IMG.bangles, badge: 'New' },
    { name: 'Minimal Everyday Ring', price: '₹9,500', img: IMG.bracelet },
  ],
  dailywear: [
    { name: 'Minimalist Gold Studs', price: '₹8,500', img: IMG.studs },
    { name: 'Delicate Chain Bracelet', price: '₹12,000', img: IMG.bracelet },
    { name: 'Everyday Pendant', price: '₹15,000', img: IMG.necklace, badge: 'Bestseller' },
    { name: 'Slim Gold Bangle', price: '₹22,000', img: IMG.bangles },
    { name: 'Tiny Hoop Earrings', price: '₹6,200', img: IMG.jhumka },
    { name: 'Layering Necklace', price: '₹14,000', img: IMG.chainGold },
    { name: 'Dainty Charm Anklet', price: '₹5,800', img: IMG.gemstone, badge: 'New' },
    { name: 'Simple Gold Chain', price: '₹18,000', img: IMG.pendant },
  ],
  gemstone: [
    { name: 'Emerald Drop Necklace', price: '₹1,35,000', img: IMG.necklace, badge: 'Premium' },
    { name: 'Ruby Stud Earrings', price: '₹78,000', img: IMG.jhumka },
    { name: 'Sapphire Ring', price: '₹95,000', img: IMG.ring },
    { name: 'Multi-Gem Bracelet', price: '₹1,10,000', img: IMG.luxury5 },
    { name: 'Tanzanite Pendant', price: '₹85,000', img: IMG.gemstone, badge: 'Rare' },
    { name: 'Garnet Drop Earrings', price: '₹42,000', img: IMG.pendant },
    { name: 'Amethyst Cocktail Ring', price: '₹56,000', img: IMG.bangles },
    { name: 'Tourmaline Necklace', price: '₹1,20,000', img: IMG.studs },
  ],
  wedding: [
    { name: 'Bridal Kundan Set', price: '₹4,50,000', img: IMG.bangles, badge: 'Bestseller' },
    { name: 'Maang Tikka Gold', price: '₹35,000', img: IMG.jhumka },
    { name: 'Bridal Choker Set', price: '₹3,80,000', img: IMG.necklace },
    { name: 'Wedding Haathphool', price: '₹28,000', img: IMG.studs },
    { name: 'Bridal Nath (Nose Ring)', price: '₹18,000', img: IMG.gemstone, badge: 'New' },
    { name: 'Temple Jewellery Set', price: '₹5,20,000', img: IMG.luxury6 },
    { name: 'Polki Bridal Earrings', price: '₹1,85,000', img: IMG.pendant },
    { name: 'Kamarband Gold', price: '₹2,40,000', img: IMG.bracelet },
  ],
  gifting: [
    { name: 'Gold Coin (10g)', price: '₹62,000', img: IMG.pendant },
    { name: 'Silver Gift Set', price: '₹8,500', img: IMG.bracelet },
    { name: 'Pearl Pendant Box', price: '₹18,000', img: IMG.gemstone, badge: 'Gift Box' },
    { name: 'Baby Gold Bracelet', price: '₹15,000', img: IMG.chainGold },
    { name: 'Gold Lakshmi Coin', price: '₹32,000', img: IMG.goldChain },
    { name: 'Silver Pooja Thali', price: '₹12,000', img: IMG.bangles },
    { name: 'Gift Voucher ₹5,000', price: '₹5,000', img: IMG.necklace, badge: 'Popular' },
    { name: 'Engraved Pendant', price: '₹22,000', img: IMG.jhumka },
  ],
}

export default function ShopCategoryPage() {
  const params = useParams()
  const router = useRouter()
  const categoryId = params.category as string
  const cat = categories.find(c => c.id === categoryId)
  const products = fullProducts[categoryId] || []

  if (!cat) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-beige">
        <div className="text-center">
          <h1 className="font-serif text-4xl text-onyx mb-4">Category Not Found</h1>
          <button onClick={() => router.push('/')} className="font-sans text-sm text-gold underline">← Back to Home</button>
        </div>
      </div>
    )
  }

  const whatsappBase = 'https://wa.me/919980700622?text='

  return (
    <div className="min-h-screen" style={{ backgroundColor: cat.theme.bg }}>
      {/* Sticky Header */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{ backgroundColor: `${cat.theme.cardBg}f0`, backdropFilter: 'blur(12px)', borderColor: `${cat.theme.accent}15` }}
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.push('/')} className="flex items-center gap-2 transition-opacity hover:opacity-70" style={{ color: cat.theme.accent }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              <span className="font-sans text-sm font-semibold tracking-wide hidden md:inline">Back</span>
            </button>
            <div className="w-px h-6 bg-current opacity-20" style={{ color: cat.theme.accent }} />
            <Image src="/images/vinod-logo.svg" alt="Vinod Jewellers" width={120} height={35} className="h-8 w-auto" style={{ filter: 'brightness(0.2)' }} />
          </div>

          <div className="flex items-center gap-3">
            <span style={{ color: cat.theme.accent }}>{iconMap[cat.id]}</span>
            <h1 className="font-serif text-xl md:text-2xl font-bold tracking-wide" style={{ color: cat.theme.accent }}>{cat.label}</h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-sans text-sm font-semibold hidden md:block" style={{ color: `${cat.theme.text}80` }}>{products.length} items</span>
            <a href={`${whatsappBase}Hi, I'm interested in your ${cat.label} collection`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-sans font-bold tracking-wider uppercase transition-all hover:shadow-md" style={{ backgroundColor: cat.theme.accent, color: '#fff' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              <span className="hidden md:inline">Enquire</span>
            </a>
          </div>
        </div>

        {/* Category tabs */}
        <div className="max-w-screen-2xl mx-auto px-4 md:px-12">
          <div className="flex items-center gap-1 py-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => router.push(`/shop/${c.id}`)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap transition-all duration-200 text-xs font-sans font-semibold"
                style={{
                  backgroundColor: c.id === categoryId ? cat.theme.accent : 'transparent',
                  color: c.id === categoryId ? '#fff' : `${cat.theme.text}60`,
                  border: `1px solid ${c.id === categoryId ? cat.theme.accent : `${cat.theme.accent}15`}`,
                }}
              >
                <span className="flex-shrink-0">{iconMap[c.id]}</span>
                <span>{c.label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 pt-6 pb-2">
        <div className="flex items-center gap-2 font-sans text-xs font-medium" style={{ color: `${cat.theme.text}50` }}>
          <button onClick={() => router.push('/')} className="hover:underline">Home</button>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
          <span className="font-bold" style={{ color: cat.theme.accent }}>{cat.label}</span>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-6">
        <div className="relative rounded-2xl overflow-hidden" style={{ backgroundColor: `${cat.theme.accent}08`, border: `1px solid ${cat.theme.accent}10` }}>
          <div className="px-8 md:px-16 py-10 md:py-14">
            <p className="font-sans text-[10px] tracking-[0.5em] uppercase mb-3 font-bold" style={{ color: cat.theme.accent }}>Vinod Jewellers</p>
            <h2 className="font-serif text-4xl md:text-6xl font-bold mb-3" style={{ color: cat.theme.text }}>{cat.label}</h2>
            <p className="font-sans text-sm max-w-lg leading-relaxed font-medium" style={{ color: `${cat.theme.text}70` }}>
              Discover our exquisite {cat.label.toLowerCase()} collection. Each piece is crafted with precision and love, reflecting decades of heritage.
            </p>
            <p className="font-serif text-xl font-bold mt-4" style={{ color: cat.theme.accent }}>{products.length} results</p>
          </div>
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-5" style={{ backgroundColor: cat.theme.accent }} />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full opacity-5" style={{ backgroundColor: cat.theme.accent }} />
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-8 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl"
              style={{ backgroundColor: cat.theme.cardBg, border: `1px solid ${cat.theme.accent}08` }}
            >
              <div className="aspect-square overflow-hidden bg-white relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.img} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                {product.badge && (
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-sans font-bold tracking-wider uppercase" style={{ backgroundColor: cat.theme.accent, color: '#fff' }}>
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="p-4">
                <p className="font-sans text-sm font-bold" style={{ color: cat.theme.text }}>{product.name}</p>
                <p className="font-serif text-xl font-bold mt-1" style={{ color: cat.theme.accent }}>{product.price}</p>
                <div className="flex gap-2 mt-3">
                  <a
                    href={`${whatsappBase}Hi, I'm interested in ${product.name} (${product.price}) from your ${cat.label} collection.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 text-[10px] font-sans font-bold tracking-wider uppercase rounded-lg transition-all duration-300 hover:shadow-md"
                    style={{ backgroundColor: cat.theme.accent, color: '#fff' }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    <span>Enquire</span>
                  </a>
                  <a
                    href={`tel:+919980700622`}
                    className="px-3 py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center hover:shadow-md"
                    style={{ border: `1.5px solid ${cat.theme.accent}30`, color: cat.theme.accent }}
                    title="Call to enquire"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
