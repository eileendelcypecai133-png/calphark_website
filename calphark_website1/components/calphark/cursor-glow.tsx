"use client"

import { useEffect, useRef, useState } from "react"

export function CursorGlow() {
  const [mounted, setMounted] = useState(false)
  const glowRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const secondaryTrailRef = useRef<HTMLDivElement>(null)
  const position = useRef({ x: 0, y: 0 })
  const targetPosition = useRef({ x: 0, y: 0 })

  useEffect(() => {
    setMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      targetPosition.current.x = e.clientX
      targetPosition.current.y = e.clientY
    }

    window.addEventListener("mousemove", handleMouseMove)

    let animationId: number

    const animate = () => {
      // Very smooth, slow interpolation for organic feel
      position.current.x += (targetPosition.current.x - position.current.x) * 0.08
      position.current.y += (targetPosition.current.y - position.current.y) * 0.08

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${position.current.x - 175}px, ${position.current.y - 175}px)`
      }

      // First trail - slower, larger
      if (trailRef.current) {
        const trailX = position.current.x + (targetPosition.current.x - position.current.x) * -0.4
        const trailY = position.current.y + (targetPosition.current.y - position.current.y) * -0.4
        trailRef.current.style.transform = `translate(${trailX - 250}px, ${trailY - 250}px)`
      }

      // Second trail - even slower, creates depth
      if (secondaryTrailRef.current) {
        const trail2X = position.current.x + (targetPosition.current.x - position.current.x) * -0.7
        const trail2Y = position.current.y + (targetPosition.current.y - position.current.y) * -0.7
        secondaryTrailRef.current.style.transform = `translate(${trail2X - 200}px, ${trail2Y - 200}px)`
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
      {/* Main cursor glow - purple/magenta dominant */}
      <div
        ref={glowRef}
        className="fixed pointer-events-none z-50 w-[350px] h-[350px] opacity-25 mix-blend-screen"
        style={{
          background: `radial-gradient(circle, 
            rgba(139, 75, 158, 0.5) 0%, 
            rgba(233, 30, 140, 0.25) 25%, 
            rgba(43, 108, 176, 0.1) 50%, 
            transparent 70%
          )`,
          filter: "blur(50px)",
          willChange: "transform",
        }}
      />

      {/* Primary trailing glow - blue/cyan */}
      <div
        ref={trailRef}
        className="fixed pointer-events-none z-40 w-[500px] h-[500px] opacity-15 mix-blend-screen"
        style={{
          background: `radial-gradient(circle, 
            rgba(43, 108, 176, 0.4) 0%, 
            rgba(56, 189, 248, 0.2) 30%, 
            rgba(139, 75, 158, 0.1) 50%, 
            transparent 70%
          )`,
          filter: "blur(80px)",
          willChange: "transform",
        }}
      />

      {/* Secondary trailing glow - magenta accent */}
      <div
        ref={secondaryTrailRef}
        className="fixed pointer-events-none z-30 w-[400px] h-[400px] opacity-10 mix-blend-screen"
        style={{
          background: `radial-gradient(circle, 
            rgba(233, 30, 140, 0.3) 0%, 
            rgba(139, 75, 158, 0.15) 40%, 
            transparent 70%
          )`,
          filter: "blur(100px)",
          willChange: "transform",
        }}
      />
    </>
  )
}
