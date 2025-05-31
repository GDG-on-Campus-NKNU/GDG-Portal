import { motion } from 'framer-motion'
import { useEffect, useState, useCallback, useMemo } from 'react'

export function BackgroundEffects() {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })

  const handleMouseMove = useCallback((e) => {
    // 節流處理，降低更新頻率
    setMousePosition({
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight
    })
  }, [])

  useEffect(() => {
    let rafId = null
    let lastUpdate = 0

    const throttledMouseMove = (e) => {
      const now = Date.now()
      if (now - lastUpdate > 50) { // 限制更新頻率為 20fps
        if (rafId) cancelAnimationFrame(rafId)
        rafId = requestAnimationFrame(() => handleMouseMove(e))
        lastUpdate = now
      }
    }

    window.addEventListener('mousemove', throttledMouseMove, { passive: true })
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', throttledMouseMove)
    }
  }, [handleMouseMove])

  // 記憶化背景樣式
  const backgroundStyle = useMemo(() => ({
    background: `
      radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
        rgba(59, 130, 246, 0.12) 0%, 
        rgba(147, 51, 234, 0.08) 25%, 
        rgba(34, 197, 94, 0.06) 50%, 
        transparent 70%
      ),
      linear-gradient(135deg, 
        rgba(59, 130, 246, 0.08) 0%, 
        rgba(147, 51, 234, 0.06) 25%, 
        rgba(34, 197, 94, 0.04) 50%, 
        rgba(239, 68, 68, 0.03) 75%, 
        rgba(245, 158, 11, 0.02) 100%
      )
    `
  }), [mousePosition.x, mousePosition.y])

  // 記憶化粒子數據
  const particles = useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      color: i % 4 === 0 ? 'bg-blue-400/15' :
             i % 4 === 1 ? 'bg-purple-400/15' :
             i % 4 === 2 ? 'bg-green-400/15' : 'bg-yellow-400/15',
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 3
    })), []
  )

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* 動態漸變背景 - 降低不透明度 */}
      <motion.div
        className="absolute inset-0"
        style={backgroundStyle}
        animate={{
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* 減少大型幾何圖形數量並降低不透明度 */}
      <motion.div 
        className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-blue-400/8 to-purple-400/6 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          x: [-150, -100, -150],
          y: [-150, -100, -150],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-br from-green-400/8 to-blue-400/6 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [150, 100, 150],
          y: [150, 100, 150],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* 優化的粒子效果 */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute w-1.5 h-1.5 rounded-full ${particle.color}`}
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, -80, 0],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* 簡化的網格圖案 */}
      <div className="absolute inset-0 opacity-20">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="grid"
              width="12"
              height="12"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="6" cy="6" r="0.4" fill="currentColor" className="text-slate-400/30" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* 簡化的光暈效果 */}
      <motion.div
        className="absolute top-1/3 left-1/3 w-24 h-24 bg-gradient-radial from-blue-400/15 via-purple-400/8 to-transparent rounded-full blur-xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  )
}
