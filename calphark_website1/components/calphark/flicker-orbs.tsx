"use client"

import { useEffect, useRef } from "react"

// Fast Multicolored Waves - Living Intelligence
// Brand colors: magenta, purple, blue, cyan
// Water-like waves that flow fast and react to cursor

export function FlickerOrbs() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000, active: false })
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Brand colors - exact palette
    const brandColors = [
      { r: 233, g: 30, b: 140 },   // Magenta #E91E8C
      { r: 139, g: 75, b: 158 },   // Purple #8B4B9E
      { r: 43, g: 108, b: 176 },   // Blue #2B6CB0
      { r: 56, g: 189, b: 248 },   // Cyan #38BDF8
    ]

    let width = 0
    let height = 0

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    resize()
    window.addEventListener("resize", resize)

    // Mouse tracking
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
      time += 0.025 // Fast animation speed
      ctx.clearRect(0, 0, width, height)

      const mouse = mouseRef.current

      // Draw multiple wave layers - each with different brand color
      brandColors.forEach((color, colorIndex) => {
        const layerOffset = colorIndex * 0.8 // Offset each layer
        const baseSpeed = 2.5 + colorIndex * 0.4 // Different speeds per layer
        const amplitude = 60 + colorIndex * 20 // Different amplitudes
        const waveCount = 4 + colorIndex // Different wave frequencies

        ctx.beginPath()

        // Start from bottom left
        ctx.moveTo(0, height)

        // Draw wave across the canvas
        for (let x = 0; x <= width; x += 3) {
          // Multiple sine waves combined for organic water effect
          let y = height * (0.4 + colorIndex * 0.12) // Base position varies per layer

          // Primary wave - fast horizontal movement
          y += Math.sin((x * 0.008 * waveCount) + (time * baseSpeed) + layerOffset) * amplitude

          // Secondary wave - creates complexity
          y += Math.sin((x * 0.004 * waveCount) - (time * baseSpeed * 0.7) + layerOffset * 2) * (amplitude * 0.5)

          // Tertiary wave - fine detail
          y += Math.sin((x * 0.015 * waveCount) + (time * baseSpeed * 1.3)) * (amplitude * 0.25)

          // Mouse interaction - waves bulge toward cursor
          if (mouse.active) {
            const dx = x - mouse.x
            const dy = y - mouse.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            const interactionRadius = 300

            if (dist < interactionRadius) {
              const force = (1 - dist / interactionRadius) * 80
              // Waves rise toward cursor
              y -= force * Math.sin(time * 5 + dist * 0.02)
            }
          }

          // Vertical ripple effect
          y += Math.sin(time * 4 + x * 0.01) * 8

          ctx.lineTo(x, y)
        }

        // Complete the shape
        ctx.lineTo(width, height)
        ctx.lineTo(0, height)
        ctx.closePath()

        // Gradient fill for each wave layer
        const gradient = ctx.createLinearGradient(0, 0, width, height)
        const alpha = 0.35 - colorIndex * 0.06 // Front layers more opaque
        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`)
        gradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 1.2})`)
        gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.8})`)

        ctx.fillStyle = gradient
        ctx.fill()
      })

      // Draw fast-moving horizontal wave lines - like water surface
      for (let i = 0; i < 8; i++) {
        const color = brandColors[i % brandColors.length]
        const yBase = height * (0.25 + i * 0.08)
        const speed = 3 + i * 0.3
        const lineAlpha = 0.4 - i * 0.03

        ctx.beginPath()
        ctx.lineWidth = 2 - i * 0.15

        for (let x = 0; x <= width; x += 4) {
          let y = yBase
          y += Math.sin((x * 0.012) + (time * speed) + i) * (30 + i * 5)
          y += Math.sin((x * 0.006) - (time * speed * 0.8)) * (20 + i * 3)

          // Mouse ripple effect
          if (mouse.active) {
            const dx = x - mouse.x
            const dy = y - mouse.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < 250) {
              y += Math.sin(dist * 0.05 - time * 8) * (1 - dist / 250) * 40
            }
          }

          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }

        const gradient = ctx.createLinearGradient(0, yBase - 50, width, yBase + 50)
        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${lineAlpha})`)
        gradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, ${lineAlpha * 1.5})`)
        gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, ${lineAlpha * 0.5})`)

        ctx.strokeStyle = gradient
        ctx.stroke()
      }

      // Draw flowing particles on wave crests
      for (let i = 0; i < 40; i++) {
        const color = brandColors[i % brandColors.length]
        const xBase = (i * width / 40 + time * 80) % (width + 100) - 50
        const wavePhase = i * 0.5
        const speed = 2 + (i % 4) * 0.3

        let y = height * 0.35
        y += Math.sin((xBase * 0.01) + (time * speed) + wavePhase) * 50
        y += Math.sin((xBase * 0.005) - (time * speed * 0.6)) * 30

        // Particle size pulses
        const size = 3 + Math.sin(time * 4 + i) * 1.5

        // Glow effect
        const glowGradient = ctx.createRadialGradient(xBase, y, 0, xBase, y, size * 4)
        glowGradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0.6)`)
        glowGradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, 0.2)`)
        glowGradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`)

        ctx.fillStyle = glowGradient
        ctx.beginPath()
        ctx.arc(xBase, y, size * 4, 0, Math.PI * 2)
        ctx.fill()

        // Core particle
        ctx.fillStyle = `rgba(255, 255, 255, 0.8)`
        ctx.beginPath()
        ctx.arc(xBase, y, size * 0.5, 0, Math.PI * 2)
        ctx.fill()
      }

      // Top shimmer effect - fast moving highlights
      for (let i = 0; i < 15; i++) {
        const color = brandColors[i % brandColors.length]
        const x = (i * width / 15 + time * 120) % (width + 200) - 100
        const y = 50 + Math.sin(time * 3 + i * 0.7) * 30

        const shimmerGradient = ctx.createRadialGradient(x, y, 0, x, y, 60)
        shimmerGradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0.15)`)
        shimmerGradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, 0.05)`)
        shimmerGradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`)

        ctx.fillStyle = shimmerGradient
        ctx.beginPath()
        ctx.ellipse(x, y, 80, 30, 0, 0, Math.PI * 2)
        ctx.fill()
      }

      // Mouse cursor creates ripple rings
      if (mouse.active) {
        for (let ring = 0; ring < 4; ring++) {
          const ringRadius = 30 + ring * 40 + Math.sin(time * 6) * 10
          const color = brandColors[ring % brandColors.length]
          const alpha = (0.4 - ring * 0.08) * (0.5 + Math.sin(time * 8 + ring) * 0.5)

          ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`
          ctx.lineWidth = 2 - ring * 0.3
          ctx.beginPath()
          ctx.arc(mouse.x, mouse.y, ringRadius, 0, Math.PI * 2)
          ctx.stroke()
        }
      }

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
