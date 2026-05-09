"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

// Intelligent Card - Behaves like it has awareness
// Soft magnetic attraction, dynamic light reflection, responsive border glow, depth reaction to cursor angle
interface IntelligentCardProps {
  children: ReactNode
  className?: string
}

export function IntelligentCard({ children, className = "" }: IntelligentCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [mouseState, setMouseState] = useState({
    x: 0.5,
    y: 0.5,
    isNear: false,
    isHovering: false,
    distance: 1000,
  })

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleGlobalMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const dx = e.clientX - centerX
      const dy = e.clientY - centerY
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      // Check if mouse is near (within 200px radius)
      const isNear = distance < 200

      if (isNear || mouseState.isHovering) {
        setMouseState(prev => ({
          ...prev,
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
          isNear,
          distance,
        }))
      } else if (mouseState.isNear) {
        setMouseState(prev => ({ ...prev, isNear: false, distance }))
      }
    }

    window.addEventListener("mousemove", handleGlobalMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove)
  }, [mouseState.isNear, mouseState.isHovering])

  const handleMouseEnter = () => {
    setMouseState(prev => ({ ...prev, isHovering: true }))
  }

  const handleMouseLeave = () => {
    setMouseState(prev => ({ ...prev, isHovering: false, x: 0.5, y: 0.5 }))
  }

  // Calculate transforms based on cursor position
  const { x, y, isHovering, isNear, distance } = mouseState
  
  // Subtle 3D rotation based on cursor angle
  const rotateX = isHovering ? (y - 0.5) * -6 : 0
  const rotateY = isHovering ? (x - 0.5) * 6 : 0
  
  // Soft magnetic attraction when near
  const magneticPull = isNear && !isHovering ? Math.max(0, 1 - distance / 200) * 3 : 0
  const translateX = isNear && !isHovering ? (x - 0.5) * magneticPull * 2 : 0
  const translateY = isNear && !isHovering ? (y - 0.5) * magneticPull * 2 : 0
  
  // Scale response
  const scale = isHovering ? 1.02 : isNear ? 1 + magneticPull * 0.003 : 1

  // Light reflection position (follows cursor with smooth lag)
  const lightX = x * 100
  const lightY = y * 100

  // Border glow intensity based on proximity
  const glowIntensity = isHovering ? 0.4 : isNear ? magneticPull * 0.15 : 0

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${className} relative group cursor-pointer`}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate(${translateX}px, ${translateY}px) scale(${scale})`,
        transition: "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
        willChange: "transform",
      }}
    >
      {/* Dynamic light reflection layer */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
        style={{
          opacity: isHovering ? 0.6 : isNear ? 0.2 : 0,
          transition: "opacity 0.6s ease-out",
        }}
      >
        <div
          className="absolute w-64 h-64 rounded-full"
          style={{
            left: `${lightX}%`,
            top: `${lightY}%`,
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, rgba(139, 75, 158, 0.15) 0%, rgba(233, 30, 140, 0.08) 40%, transparent 70%)`,
            filter: "blur(30px)",
            transition: "left 0.15s ease-out, top 0.15s ease-out",
          }}
        />
      </div>

      {/* Responsive border glow */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          boxShadow: `0 0 ${20 + glowIntensity * 30}px ${glowIntensity * 15}px rgba(139, 75, 158, ${glowIntensity * 0.3})`,
          transition: "box-shadow 0.5s ease-out",
        }}
      />

      {/* Gradient border on hover */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
        style={{
          opacity: isHovering ? 1 : 0,
          transition: "opacity 0.4s ease-out",
        }}
      >
        <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br from-brand-magenta/40 via-brand-purple/30 to-brand-blue/40" />
      </div>

      {children}
    </div>
  )
}

// Interactive Typography - Keywords react on hover, gradient flows through active terms
interface InteractiveTextProps {
  children: string
  className?: string
  highlightWords?: string[]
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span"
}

export function InteractiveText({ 
  children, 
  className = "", 
  highlightWords = [],
  as: Component = "span" 
}: InteractiveTextProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const words = children.split(" ")

  const shouldHighlight = (word: string) => {
    const cleanWord = word.replace(/[.,!?]/g, "").toLowerCase()
    return highlightWords.some(hw => hw.toLowerCase() === cleanWord)
  }

  return (
    <Component className={className}>
      {words.map((word, index) => {
        const isHighlighted = shouldHighlight(word)
        const isHovered = hoveredIndex === index
        const isNearHovered = hoveredIndex !== null && Math.abs(hoveredIndex - index) <= 1

        return (
          <span
            key={index}
            onMouseEnter={() => isHighlighted && setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`inline-block transition-all duration-500 ${
              isHighlighted ? "cursor-pointer" : ""
            }`}
            style={{
              transform: isHovered ? "translateY(-2px) scale(1.02)" : "translateY(0) scale(1)",
              color: isHighlighted 
                ? isHovered 
                  ? "transparent" 
                  : isNearHovered 
                    ? "rgba(139, 75, 158, 0.9)"
                    : undefined
                : undefined,
              backgroundImage: isHighlighted && isHovered
                ? "linear-gradient(90deg, #E91E8C, #8B4B9E, #2B6CB0)"
                : undefined,
              backgroundClip: isHighlighted && isHovered ? "text" : undefined,
              WebkitBackgroundClip: isHighlighted && isHovered ? "text" : undefined,
            }}
          >
            {word}
            {index < words.length - 1 ? " " : ""}
          </span>
        )
      })}
    </Component>
  )
}

// Kinetic Underline - Animated underline that responds to hover and scroll
interface KineticUnderlineProps {
  children: ReactNode
  className?: string
}

export function KineticUnderline({ children, className = "" }: KineticUnderlineProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mouseX, setMouseX] = useState(0.5)
  const ref = useRef<HTMLSpanElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setMouseX((e.clientX - rect.left) / rect.width)
  }

  return (
    <span
      ref={ref}
      className={`${className} relative inline-block cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {children}
      
      {/* Base underline */}
      <span
        className="absolute bottom-0 left-0 h-[2px] rounded-full"
        style={{
          width: isHovered ? "100%" : "0%",
          background: "linear-gradient(90deg, #E91E8C, #8B4B9E, #2B6CB0)",
          transition: "width 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      />
      
      {/* Kinetic glow dot that follows cursor */}
      <span
        className="absolute bottom-[-2px] w-2 h-2 rounded-full pointer-events-none"
        style={{
          left: `${mouseX * 100}%`,
          transform: "translateX(-50%)",
          background: "linear-gradient(135deg, #E91E8C, #8B4B9E)",
          opacity: isHovered ? 0.8 : 0,
          boxShadow: "0 0 8px 2px rgba(233, 30, 140, 0.4)",
          transition: "opacity 0.3s ease, left 0.1s ease-out",
        }}
      />
    </span>
  )
}

// Section Transition - Environmental transition between sections
interface SectionTransitionProps {
  children: ReactNode
  className?: string
  variant?: "gradient-flow" | "depth-shift" | "wave-reveal"
}

export function SectionTransition({ 
  children, 
  className = "",
  variant = "gradient-flow"
}: SectionTransitionProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      
      // Calculate how far into the viewport the element is
      const progress = Math.max(0, Math.min(1, 
        1 - (rect.top / viewportHeight)
      ))
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const getTransitionStyles = () => {
    switch (variant) {
      case "gradient-flow":
        return {
          opacity: Math.min(1, scrollProgress * 1.5),
          transform: `translateY(${(1 - scrollProgress) * 30}px)`,
          filter: `blur(${(1 - scrollProgress) * 3}px)`,
        }
      case "depth-shift":
        return {
          opacity: scrollProgress,
          transform: `perspective(1000px) translateZ(${(1 - scrollProgress) * -50}px)`,
        }
      case "wave-reveal":
        return {
          clipPath: `inset(${(1 - scrollProgress) * 100}% 0 0 0)`,
        }
      default:
        return {}
    }
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...getTransitionStyles(),
        transition: "opacity 0.3s ease-out, transform 0.3s ease-out, filter 0.3s ease-out",
        willChange: "opacity, transform, filter",
      }}
    >
      {children}
    </div>
  )
}

// Scroll Velocity Text - Text reveals synchronized with scroll velocity
interface ScrollVelocityTextProps {
  children: string
  className?: string
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span"
}

export function ScrollVelocityText({ 
  children, 
  className = "",
  as: Component = "span"
}: ScrollVelocityTextProps) {
  const [revealProgress, setRevealProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const lastScrollY = useRef(0)
  const velocityRef = useRef(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const velocity = Math.abs(currentScrollY - lastScrollY.current)
      velocityRef.current = velocity
      lastScrollY.current = currentScrollY

      // Reveal progress based on cumulative scroll
      setRevealProgress(prev => Math.min(1, prev + velocity * 0.003))
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    
    // Auto-reveal after visibility
    const autoReveal = setInterval(() => {
      setRevealProgress(prev => {
        if (prev >= 1) {
          clearInterval(autoReveal)
          return 1
        }
        return Math.min(1, prev + 0.02)
      })
    }, 30)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearInterval(autoReveal)
    }
  }, [isVisible])

  const characters = children.split("")
  
  return (
    <Component ref={ref as any} className={className}>
      {characters.map((char, index) => {
        const charProgress = revealProgress * characters.length
        const isRevealed = index < charProgress
        const isRevealing = index >= charProgress - 3 && index < charProgress

        return (
          <span
            key={index}
            style={{
              opacity: isRevealed ? 1 : 0,
              transform: isRevealed 
                ? "translateY(0)" 
                : "translateY(10px)",
              color: isRevealing 
                ? "rgba(139, 75, 158, 1)" 
                : undefined,
              transition: "opacity 0.2s ease-out, transform 0.2s ease-out, color 0.3s ease-out",
              display: "inline-block",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        )
      })}
    </Component>
  )
}
