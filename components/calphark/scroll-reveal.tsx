"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "scale" | "fade"
  duration?: number
  threshold?: number
  once?: boolean
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 800,
  threshold = 0.15,
  once = true,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!once || !hasAnimated)) {
          setIsVisible(true)
          setHasAnimated(true)
        } else if (!once && !entry.isIntersecting) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold, once, hasAnimated])

  const getInitialStyles = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, transform: "translateY(40px)" }
      case "down":
        return { opacity: 0, transform: "translateY(-40px)" }
      case "left":
        return { opacity: 0, transform: "translateX(40px)" }
      case "right":
        return { opacity: 0, transform: "translateX(-40px)" }
      case "scale":
        return { opacity: 0, transform: "scale(0.95)" }
      case "fade":
      default:
        return { opacity: 0, transform: "none" }
    }
  }

  const getVisibleStyles = () => ({
    opacity: 1,
    transform: "translateY(0) translateX(0) scale(1)",
  })

  const initialStyles = getInitialStyles()
  const visibleStyles = getVisibleStyles()

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...(isVisible ? visibleStyles : initialStyles),
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        transitionDelay: `${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  )
}

interface DepthLayerProps {
  children: ReactNode
  className?: string
  depth?: number // 1-5, where 5 is furthest back
}

export function DepthLayer({ children, className = "", depth = 1 }: DepthLayerProps) {
  const [scrollY, setScrollY] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Deeper layers move slower (parallax effect)
  const parallaxFactor = 0.02 * (6 - depth) // depth 1 = 0.1, depth 5 = 0.02
  const translateY = scrollY * parallaxFactor

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translateY(${-translateY}px)`,
        willChange: "transform",
        zIndex: 6 - depth,
      }}
    >
      {children}
    </div>
  )
}

interface HoverEffectProps {
  children: ReactNode
  className?: string
  intensity?: "subtle" | "medium" | "strong"
}

export function HoverEffect({ children, className = "", intensity = "medium" }: HoverEffectProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }

  const intensityValues = {
    subtle: { rotate: 1, scale: 1.01, glow: 0.1 },
    medium: { rotate: 2, scale: 1.02, glow: 0.2 },
    strong: { rotate: 4, scale: 1.04, glow: 0.35 },
  }

  const { rotate, scale, glow } = intensityValues[intensity]

  const rotateX = isHovered ? (mousePos.y - 0.5) * -rotate * 2 : 0
  const rotateY = isHovered ? (mousePos.x - 0.5) * rotate * 2 : 0
  const scaleValue = isHovered ? scale : 1

  return (
    <div
      ref={ref}
      className={`${className} relative`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scaleValue})`,
        transition: "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
        willChange: "transform",
      }}
    >
      {/* Ambient glow that follows mouse */}
      <div
        className="absolute inset-0 rounded-inherit pointer-events-none transition-opacity duration-500"
        style={{
          opacity: isHovered ? glow : 0,
          background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(139, 75, 158, 0.3) 0%, rgba(233, 30, 140, 0.1) 40%, transparent 70%)`,
          filter: "blur(20px)",
        }}
      />
      {children}
    </div>
  )
}

interface MagneticHoverProps {
  children: ReactNode
  className?: string
  strength?: number
}

export function MagneticHover({ children, className = "", strength = 0.3 }: MagneticHoverProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distX = e.clientX - centerX
    const distY = e.clientY - centerY
    
    setTransform({
      x: distX * strength,
      y: distY * strength,
    })
  }

  const handleMouseLeave = () => {
    setTransform({ x: 0, y: 0 })
  }

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        transition: "transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  )
}
