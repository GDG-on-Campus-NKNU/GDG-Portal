import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

export function ScrollEffects({ children }) {
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)

  // 視差效果
  const y1 = useTransform(scrollY, [0, 300], [0, 100])
  const y2 = useTransform(scrollY, [0, 300], [0, -50])
  const opacity = useTransform(scrollY, [0, 200], [1, 0.8])

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setIsScrolled(latest > 50)
    })

    return () => unsubscribe()
  }, [scrollY])

  return (
    <div className="relative">
      {/* 滾動指示器 */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 z-50 origin-left"
        style={{
          scaleX: useTransform(scrollY, [0, 2000], [0, 1])
        }}
      />

      {/* 返回頂部按鈕 */}
      <motion.button
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl z-50 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: isScrolled ? 1 : 0,
          scale: isScrolled ? 1 : 0
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>

      {/* 視差背景元素 */}
      <motion.div
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
        style={{ y: y1, opacity }}
      >
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-2xl" />
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-xl" />
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
        style={{ y: y2 }}
      >
        <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full blur-xl" />
        <div className="absolute bottom-1/4 left-1/4 w-16 h-16 bg-gradient-to-r from-yellow-400/5 to-red-400/5 rounded-full blur-lg" />
      </motion.div>

      {children}
    </div>
  )
}

// 光標跟隨效果 - 優化版
export function CursorEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    let rafId = null
    let currentX = 0
    let currentY = 0

    const handleMouseMove = (e) => {
      if (rafId) cancelAnimationFrame(rafId)
      
      rafId = requestAnimationFrame(() => {
        currentX = e.clientX
        currentY = e.clientY
        setMousePosition({ x: currentX, y: currentY })
      })
    }

    const handleMouseEnter = (e) => {
      if (e.target.closest('a, button, [role="button"], .cursor-pointer')) {
        setIsHovering(true)
      }
    }

    const handleMouseLeave = (e) => {
      if (!e.relatedTarget || !e.relatedTarget.closest('a, button, [role="button"], .cursor-pointer')) {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseenter', handleMouseEnter, true)
    document.addEventListener('mouseleave', handleMouseLeave, true)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter, true)
      document.removeEventListener('mouseleave', handleMouseLeave, true)
    }
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 pointer-events-none z-[60] hidden md:block"
      style={{
        x: mousePosition.x - 8,
        y: mousePosition.y - 8,
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      <motion.div 
        className="w-full h-full rounded-full border-2 border-blue-500/60 bg-blue-500/20"
        animate={{
          scale: isHovering ? 2.5 : 1,
          borderColor: isHovering ? "#8b5cf6" : "#3b82f6"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </motion.div>
  )
}

// 頁面轉場效果
export function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 1
      }}
    >
      {children}
    </motion.div>
  )
}
