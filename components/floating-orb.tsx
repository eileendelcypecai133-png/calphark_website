"use client"

import { useEffect, useState } from "react"

interface FloatingOrbProps {
  size: number
  color: string
  initialPosition: { x: number; y: number }
  delay?: number
}

export function FloatingOrb({
  size,
  color,
  initialPosition,
  delay = 0,
}: FloatingOrbProps) {
  const [position, setPosition] = useState(initialPosition)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const animate = () => {
      const time = Date.now() / 1000 + delay
      const newX = initialPosition.x + Math.sin(time * 0.5) * 50 + Math.cos(time * 0.3) * 30
      const newY = initialPosition.y + Math.cos(time * 0.4) * 40 + Math.sin(time * 0.6) * 20
      setPosition({ x: newX, y: newY })
    }

    const interval = setInterval(animate, 50)
    return () => clearInterval(interval)
  }, [initialPosition, delay])

  if (!mounted) return null

  return (
    <div
      className={`absolute rounded-full bg-gradient-to-br ${color} blur-3xl transition-transform duration-[100ms] ease-linear`}
      style={{
        width: size,
        height: size,
        left: `calc(50% + ${position.x}px)`,
        top: `calc(30% + ${position.y}px)`,
        transform: "translate(-50%, -50%)",
      }}
    />
  )
}
