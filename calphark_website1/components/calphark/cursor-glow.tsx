"use client"

import { useEffect, useRef, useState } from "react"

// Cursor Glow - Subtle, intentional presence indicator
// The principle: "the system responds to me" not "mouse trail effect"
// - Low latency but smooth inertia
// - Subtle response, no sharp movements
// - Creates ambient awareness, not distraction

export function CursorGlow() {
  const [mounted, setMounted] = useState(false)
  const glowRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const position = useRef({ x: 0, y: 0 })
  const targetPosition = useRef({ x: 0, y: 0 })

  useEffect(() => {
    setMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      targetPosition.current.x = e.clientX
      targetPosition.current.y = e.clientY
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    let animationId: number

    const animate = () => {
      // Smooth interpolation - intentional lag for organic feel
      // Not too slow (feels broken), not too fast (feels twitchy)
      position.current.x += (targetPosition.current.x - position.current.x) * 0.06
      position.current.y += (targetPosition.current.y - position.current.y) * 0.06

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${position.current.x - 150}px, ${position.current.y - 150}px)`
      }

      // Single trailing glow - subtler, creates depth
      if (trailRef.current) {
        const trailX = position.current.x + (targetPosition.current.x - position.current.x) * -0.5
        const trailY = position.current.y + (targetPosition.current.y - position.current.y) * -0.5
        trailRef.current.style.transform = `translate(${trailX - 200}px, ${trailY - 200}px)`
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [])

  if (!mounted) return null

  return (
    <>
      {/* Main cursor glow - very subtle ambient presence */}
      <div
        ref={glowRef}
        className="fixed pointer-events-none z-50 w-[300px] h-[300px] opacity-20 mix-blend-screen"
        style={{
          background: `radial-gradient(circle, 
            rgba(139, 75, 158, 0.4) 0%, 
            rgba(233, 30, 140, 0.15) 30%, 
            transparent 60%
          )`,
          filter: "blur(40px)",
          willChange: "transform",
        }}
      />

      {/* Subtle trailing glow - creates depth without chaos */}
      <div
        ref={trailRef}
        className="fixed pointer-events-none z-40 w-[400px] h-[400px] opacity-10 mix-blend-screen"
        style={{
          background: `radial-gradient(circle, 
            rgba(43, 108, 176, 0.3) 0%, 
            rgba(56, 189, 248, 0.1) 40%, 
            transparent 65%
          )`,
          filter: "blur(60px)",
          willChange: "transform",
        }}
      />
    </>
  )
}
