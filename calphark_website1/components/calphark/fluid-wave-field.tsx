"use client"

import { useEffect, useRef } from "react"

export function FluidWaveField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })
  const scrollRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 3 // Extended for scroll
    }
    resize()
    window.addEventListener("resize", resize)

    // Track mouse position with smooth interpolation
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX
      mouseRef.current.targetY = e.clientY + scrollRef.current
    }
    window.addEventListener("mousemove", handleMouseMove)

    // Track scroll
    const handleScroll = () => {
      scrollRef.current = window.scrollY
    }
    window.addEventListener("scroll", handleScroll)

    // Brand colors - purple, magenta, blue, cyan
    const colors = {
      purple: { r: 139, g: 75, b: 158 },
      magenta: { r: 233, g: 30, b: 140 },
      blue: { r: 43, g: 108, b: 176 },
      cyan: { r: 56, g: 189, b: 248 },
    }

    // Metaball-style fluid blobs that merge and flow
    interface FluidBlob {
      x: number
      y: number
      baseX: number
      baseY: number
      radius: number
      color: { r: number; g: number; b: number }
      phase: number
      speed: number
      amplitude: number
    }

    const blobs: FluidBlob[] = [
      // Section 1 - Hero area
      { x: 0, y: 0, baseX: 0.12, baseY: 0.08, radius: 280, color: colors.purple, phase: 0, speed: 0.0004, amplitude: 80 },
      { x: 0, y: 0, baseX: 0.88, baseY: 0.12, radius: 320, color: colors.magenta, phase: 1.5, speed: 0.0003, amplitude: 100 },
      { x: 0, y: 0, baseX: 0.5, baseY: 0.25, radius: 250, color: colors.blue, phase: 3, speed: 0.00035, amplitude: 70 },
      { x: 0, y: 0, baseX: 0.2, baseY: 0.35, radius: 200, color: colors.cyan, phase: 4.5, speed: 0.00045, amplitude: 60 },
      
      // Section 2 - Industries
      { x: 0, y: 0, baseX: 0.75, baseY: 0.4, radius: 300, color: colors.purple, phase: 2, speed: 0.0003, amplitude: 90 },
      { x: 0, y: 0, baseX: 0.1, baseY: 0.5, radius: 260, color: colors.magenta, phase: 0.5, speed: 0.0004, amplitude: 75 },
      { x: 0, y: 0, baseX: 0.6, baseY: 0.55, radius: 220, color: colors.blue, phase: 4, speed: 0.00038, amplitude: 65 },
      
      // Section 3 - Capabilities
      { x: 0, y: 0, baseX: 0.3, baseY: 0.65, radius: 280, color: colors.cyan, phase: 1, speed: 0.00032, amplitude: 85 },
      { x: 0, y: 0, baseX: 0.85, baseY: 0.7, radius: 240, color: colors.purple, phase: 3.5, speed: 0.00042, amplitude: 70 },
      { x: 0, y: 0, baseX: 0.15, baseY: 0.75, radius: 200, color: colors.magenta, phase: 5, speed: 0.00036, amplitude: 55 },
      
      // Section 4 - Trust & CTA
      { x: 0, y: 0, baseX: 0.5, baseY: 0.85, radius: 350, color: colors.blue, phase: 2.5, speed: 0.00028, amplitude: 100 },
      { x: 0, y: 0, baseX: 0.9, baseY: 0.9, radius: 260, color: colors.cyan, phase: 0, speed: 0.0004, amplitude: 80 },
      { x: 0, y: 0, baseX: 0.08, baseY: 0.95, radius: 220, color: colors.purple, phase: 4, speed: 0.00034, amplitude: 60 },
    ]

    // Organic noise function using multiple sine waves
    const organicNoise = (x: number, y: number, t: number, seed: number) => {
      const n1 = Math.sin(x * 0.008 + t + seed) * Math.cos(y * 0.006 + t * 0.7)
      const n2 = Math.sin(x * 0.012 + y * 0.01 + t * 0.5 + seed * 2) * 0.5
      const n3 = Math.cos(x * 0.005 - t * 0.3 + seed) * Math.sin(y * 0.008 + t * 0.8) * 0.3
      return (n1 + n2 + n3) / 1.8
    }

    let time = 0

    const animate = () => {
      // Smooth mouse interpolation - slow, intentional
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.02
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.02

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 1

      // Update blob positions with organic movement
      blobs.forEach((blob, index) => {
        const baseX = blob.baseX * canvas.width
        const baseY = blob.baseY * canvas.height

        // Organic flowing movement
        const noiseX = organicNoise(baseX, time * 0.3, time * blob.speed, index * 100)
        const noiseY = organicNoise(time * 0.3, baseY, time * blob.speed * 1.2, index * 200)
        
        blob.x = baseX + noiseX * blob.amplitude
        blob.y = baseY + noiseY * blob.amplitude * 0.8

        // Subtle cursor influence - blobs gently respond
        const dx = mouseRef.current.x - blob.x
        const dy = mouseRef.current.y - blob.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const maxInfluence = 400
        
        if (dist < maxInfluence) {
          const influence = (1 - dist / maxInfluence) * 0.15
          // Some blobs attract, some repel based on index
          const direction = index % 3 === 0 ? 1 : -0.5
          blob.x += dx * influence * direction * 0.3
          blob.y += dy * influence * direction * 0.3
        }
      })

      // Draw fluid blobs with soft edges
      blobs.forEach((blob) => {
        // Morphing radius for organic feel
        const morphFactor = 1 + organicNoise(blob.x * 0.01, blob.y * 0.01, time * 0.001, blob.phase * 50) * 0.2
        const radius = blob.radius * morphFactor

        // Multi-layer gradient for depth
        const gradient = ctx.createRadialGradient(
          blob.x, blob.y, 0,
          blob.x, blob.y, radius
        )

        // Very subtle, ambient opacity - slow pulsing
        const baseAlpha = 0.045 + Math.sin(time * blob.speed * 8 + blob.phase) * 0.015
        
        gradient.addColorStop(0, `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, ${baseAlpha * 1.2})`)
        gradient.addColorStop(0.3, `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, ${baseAlpha * 0.8})`)
        gradient.addColorStop(0.6, `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, ${baseAlpha * 0.4})`)
        gradient.addColorStop(0.85, `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, ${baseAlpha * 0.15})`)
        gradient.addColorStop(1, `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, 0)`)

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      })

      // Flowing energy streams - very subtle
      const streamCount = 7
      for (let s = 0; s < streamCount; s++) {
        const baseY = (canvas.height / (streamCount + 1)) * (s + 1)
        const streamColor = s % 4 === 0 ? colors.purple : s % 4 === 1 ? colors.magenta : s % 4 === 2 ? colors.blue : colors.cyan

        ctx.beginPath()

        for (let x = 0; x <= canvas.width; x += 8) {
          const waveY = baseY +
            Math.sin(x * 0.002 + time * 0.0008 + s * 0.5) * 40 +
            Math.sin(x * 0.004 + time * 0.0005 + s * 1.2) * 25 +
            organicNoise(x, s * 100, time * 0.0003, s) * 35

          // Subtle cursor influence on streams
          const streamDx = mouseRef.current.x - x
          const streamDy = mouseRef.current.y - waveY
          const streamDist = Math.sqrt(streamDx * streamDx + streamDy * streamDy)
          const streamInfluence = Math.max(0, 1 - streamDist / 350) * 20
          const finalWaveY = waveY - streamInfluence * Math.sign(streamDy)

          if (x === 0) {
            ctx.moveTo(x, finalWaveY)
          } else {
            ctx.lineTo(x, finalWaveY)
          }
        }

        // Very subtle stream opacity
        const streamAlpha = 0.015 + Math.sin(time * 0.0006 + s * 0.8) * 0.008
        
        // Soft glow layer
        ctx.strokeStyle = `rgba(${streamColor.r}, ${streamColor.g}, ${streamColor.b}, ${streamAlpha * 0.3})`
        ctx.lineWidth = 12
        ctx.stroke()

        // Core line
        ctx.strokeStyle = `rgba(${streamColor.r}, ${streamColor.g}, ${streamColor.b}, ${streamAlpha})`
        ctx.lineWidth = 2
        ctx.stroke()
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        background: "transparent",
        willChange: "transform"
      }}
    />
  )
}
