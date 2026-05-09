"use client"

import { useEffect, useRef, useState } from "react"

// Multicolored Flicker Orbs - Living Intelligence
// Brand colors: purple, magenta, blue, cyan
// Interactive, bouncing, alive but controlled
// Like Lovable's loading - mesmerizing but intentional

interface Orb {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  baseRadius: number
  color: string
  colorRgb: { r: number; g: number; b: number }
  pulsePhase: number
  pulseSpeed: number
  flickerPhase: number
  glowIntensity: number
}

export function FlickerOrbs() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000, active: false })
  const orbsRef = useRef<Orb[]>([])
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Brand colors - exact palette
    const brandColors = [
      { name: "magenta", r: 233, g: 30, b: 140, hex: "#E91E8C" },
      { name: "purple", r: 139, g: 75, b: 158, hex: "#8B4B9E" },
      { name: "blue", r: 43, g: 108, b: 176, hex: "#2B6CB0" },
      { name: "cyan", r: 56, g: 189, b: 248, hex: "#38BDF8" },
    ]

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      
      // Initialize orbs if not already done
      if (orbsRef.current.length === 0) {
        initOrbs()
      }
    }

    const initOrbs = () => {
      const orbCount = Math.min(Math.floor(window.innerWidth / 80), 18)
      orbsRef.current = []

      for (let i = 0; i < orbCount; i++) {
        const color = brandColors[i % brandColors.length]
        const baseRadius = 25 + Math.random() * 35

        orbsRef.current.push({
          id: i,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1.2, // Slow, intentional movement
          vy: (Math.random() - 0.5) * 1.2,
          radius: baseRadius,
          baseRadius: baseRadius,
          color: color.hex,
          colorRgb: { r: color.r, g: color.g, b: color.b },
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.015 + Math.random() * 0.01, // Slow pulse
          flickerPhase: Math.random() * Math.PI * 2,
          glowIntensity: 0.6 + Math.random() * 0.4,
        })
      }
    }

    resize()
    window.addEventListener("resize", resize)

    // Mouse tracking - smooth, intentional
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
      mouseRef.current.active = true
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    let time = 0

    const animate = () => {
      time += 1
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const orbs = orbsRef.current

      // Update and draw orbs
      orbs.forEach((orb) => {
        // Update pulse
        orb.pulsePhase += orb.pulseSpeed
        orb.flickerPhase += 0.03

        // Pulsing radius - breathing effect
        const pulseFactor = 1 + Math.sin(orb.pulsePhase) * 0.15
        orb.radius = orb.baseRadius * pulseFactor

        // Flicker intensity - subtle brightness variation
        const flickerFactor = 0.85 + Math.sin(orb.flickerPhase * 2.3) * 0.1 + Math.sin(orb.flickerPhase * 3.7) * 0.05
        orb.glowIntensity = Math.max(0.5, Math.min(1, flickerFactor))

        // Mouse interaction - orbs are attracted/repelled gently
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - orb.x
          const dy = mouseRef.current.y - orb.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const interactionRadius = 250

          if (dist < interactionRadius) {
            // Gentle attraction toward cursor - "awareness" not explosion
            const force = (1 - dist / interactionRadius) * 0.15
            orb.vx += (dx / dist) * force
            orb.vy += (dy / dist) * force
          }
        }

        // Apply velocity with damping - smooth, controlled movement
        orb.x += orb.vx
        orb.y += orb.vy
        orb.vx *= 0.98 // Friction
        orb.vy *= 0.98

        // Bounce off walls - soft bounce
        const margin = orb.radius
        if (orb.x < margin) {
          orb.x = margin
          orb.vx = Math.abs(orb.vx) * 0.7
        } else if (orb.x > canvas.width - margin) {
          orb.x = canvas.width - margin
          orb.vx = -Math.abs(orb.vx) * 0.7
        }
        if (orb.y < margin) {
          orb.y = margin
          orb.vy = Math.abs(orb.vy) * 0.7
        } else if (orb.y > canvas.height - margin) {
          orb.y = canvas.height - margin
          orb.vy = -Math.abs(orb.vy) * 0.7
        }

        // Add subtle random drift - "alive" movement
        orb.vx += (Math.random() - 0.5) * 0.02
        orb.vy += (Math.random() - 0.5) * 0.02

        // Speed limit - never chaotic
        const maxSpeed = 2
        const speed = Math.sqrt(orb.vx * orb.vx + orb.vy * orb.vy)
        if (speed > maxSpeed) {
          orb.vx = (orb.vx / speed) * maxSpeed
          orb.vy = (orb.vy / speed) * maxSpeed
        }
      })

      // Draw connection lines between nearby orbs - neural network feel
      ctx.lineWidth = 1
      for (let i = 0; i < orbs.length; i++) {
        for (let j = i + 1; j < orbs.length; j++) {
          const dx = orbs[i].x - orbs[j].x
          const dy = orbs[i].y - orbs[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const connectionDist = 180

          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.15 * orbs[i].glowIntensity * orbs[j].glowIntensity
            
            // Gradient line
            const gradient = ctx.createLinearGradient(orbs[i].x, orbs[i].y, orbs[j].x, orbs[j].y)
            gradient.addColorStop(0, `rgba(${orbs[i].colorRgb.r}, ${orbs[i].colorRgb.g}, ${orbs[i].colorRgb.b}, ${alpha})`)
            gradient.addColorStop(1, `rgba(${orbs[j].colorRgb.r}, ${orbs[j].colorRgb.g}, ${orbs[j].colorRgb.b}, ${alpha})`)
            
            ctx.strokeStyle = gradient
            ctx.beginPath()
            ctx.moveTo(orbs[i].x, orbs[i].y)
            ctx.lineTo(orbs[j].x, orbs[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw orbs with multi-layer glow
      orbs.forEach((orb) => {
        const { x, y, radius, colorRgb, glowIntensity } = orb

        // Outer glow (largest, softest)
        const outerGlow = ctx.createRadialGradient(x, y, 0, x, y, radius * 3)
        outerGlow.addColorStop(0, `rgba(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b}, ${0.08 * glowIntensity})`)
        outerGlow.addColorStop(0.5, `rgba(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b}, ${0.03 * glowIntensity})`)
        outerGlow.addColorStop(1, `rgba(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b}, 0)`)
        ctx.fillStyle = outerGlow
        ctx.beginPath()
        ctx.arc(x, y, radius * 3, 0, Math.PI * 2)
        ctx.fill()

        // Middle glow
        const midGlow = ctx.createRadialGradient(x, y, 0, x, y, radius * 2)
        midGlow.addColorStop(0, `rgba(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b}, ${0.2 * glowIntensity})`)
        midGlow.addColorStop(0.6, `rgba(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b}, ${0.08 * glowIntensity})`)
        midGlow.addColorStop(1, `rgba(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b}, 0)`)
        ctx.fillStyle = midGlow
        ctx.beginPath()
        ctx.arc(x, y, radius * 2, 0, Math.PI * 2)
        ctx.fill()

        // Core orb (brightest)
        const coreGlow = ctx.createRadialGradient(x, y, 0, x, y, radius)
        coreGlow.addColorStop(0, `rgba(255, 255, 255, ${0.6 * glowIntensity})`)
        coreGlow.addColorStop(0.2, `rgba(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b}, ${0.8 * glowIntensity})`)
        coreGlow.addColorStop(0.6, `rgba(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b}, ${0.4 * glowIntensity})`)
        coreGlow.addColorStop(1, `rgba(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b}, 0)`)
        ctx.fillStyle = coreGlow
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill()

        // Inner bright spot
        const innerSpot = ctx.createRadialGradient(x - radius * 0.2, y - radius * 0.2, 0, x, y, radius * 0.6)
        innerSpot.addColorStop(0, `rgba(255, 255, 255, ${0.5 * glowIntensity})`)
        innerSpot.addColorStop(1, `rgba(255, 255, 255, 0)`)
        ctx.fillStyle = innerSpot
        ctx.beginPath()
        ctx.arc(x, y, radius * 0.6, 0, Math.PI * 2)
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-auto z-0"
      style={{
        background: "transparent",
      }}
    />
  )
}
