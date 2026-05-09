"use client"

import { useEffect, useRef, useState } from "react"

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

    window.addEventListener("mousemove", handleMouseMove)

    let animationId: number

    const animate = () => {
      // Smooth interpolation for main glow
      position.current.x += (targetPosition.current.x - position.current.x) * 0.15
      position.current.y += (targetPosition.current.y - position.current.y) * 0.15

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${position.current.x - 150}px, ${position.current.y - 150}px)`
      }

      // Slower trail follows behind
      if (trailRef.current) {
        const trailX = position.current.x + (targetPosition.current.x - position.current.x) * -0.3
        const trailY = position.current.y + (targetPosition.current.y - position.current.y) * -0.3
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
      {/* Main cursor glow - magenta to purple gradient */}
      <div
        ref={glowRef}
        className="fixed pointer-events-none z-50 w-[300px] h-[300px] opacity-30 mix-blend-screen"
        style={{
          background: `radial-gradient(circle, 
            rgba(233, 30, 140, 0.4) 0%, 
            rgba(139, 75, 158, 0.2) 30%, 
            rgba(43, 108, 176, 0.1) 50%, 
            transparent 70%
          )`,
          filter: "blur(40px)",
          willChange: "transform",
        }}
      />

      {/* Trailing glow - blue to cyan */}
      <div
        ref={trailRef}
        className="fixed pointer-events-none z-40 w-[400px] h-[400px] opacity-20 mix-blend-screen"
        style={{
          background: `radial-gradient(circle, 
            rgba(43, 108, 176, 0.3) 0%, 
            rgba(56, 189, 248, 0.15) 30%, 
            rgba(139, 75, 158, 0.08) 50%, 
            transparent 70%
          )`,
          filter: "blur(60px)",
          willChange: "transform",
        }}
      />
    </>
  )
}
