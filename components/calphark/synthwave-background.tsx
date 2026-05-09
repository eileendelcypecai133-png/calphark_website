"use client"

import { useEffect, useRef } from "react"

export function SynthwaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX
      mouseRef.current.targetY = e.clientY
    }
    window.addEventListener("mousemove", handleMouseMove)

    // Brand colors
    const colors = {
      magenta: { r: 233, g: 30, b: 140 },
      purple: { r: 139, g: 75, b: 158 },
      blue: { r: 43, g: 108, b: 176 },
      cyan: { r: 56, g: 189, b: 248 },
    }

    // Fluid wave configuration - organic blobs that morph
    const blobs: Array<{
      x: number
      y: number
      baseRadius: number
      color: { r: number; g: number; b: number }
      phase: number
      speed: number
      noiseOffsetX: number
      noiseOffsetY: number
    }> = [
      // Large ambient blobs
      { x: 0.15, y: 0.2, baseRadius: 400, color: colors.magenta, phase: 0, speed: 0.0003, noiseOffsetX: 0, noiseOffsetY: 100 },
      { x: 0.85, y: 0.3, baseRadius: 350, color: colors.blue, phase: 2, speed: 0.0004, noiseOffsetX: 200, noiseOffsetY: 0 },
      { x: 0.5, y: 0.7, baseRadius: 380, color: colors.purple, phase: 4, speed: 0.00035, noiseOffsetX: 100, noiseOffsetY: 200 },
      { x: 0.2, y: 0.8, baseRadius: 300, color: colors.cyan, phase: 1, speed: 0.00045, noiseOffsetX: 300, noiseOffsetY: 150 },
      { x: 0.75, y: 0.85, baseRadius: 320, color: colors.magenta, phase: 3, speed: 0.0003, noiseOffsetX: 50, noiseOffsetY: 250 },
    ]

    // Simple noise function for organic movement
    const noise = (x: number, y: number, t: number) => {
      return (
        Math.sin(x * 0.01 + t) * 0.5 +
        Math.sin(y * 0.01 + t * 1.3) * 0.3 +
        Math.sin((x + y) * 0.005 + t * 0.7) * 0.2
      )
    }

    let time = 0

    const animate = () => {
      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 1

      // Draw fluid wave blobs
      blobs.forEach((blob, index) => {
        const centerX = blob.x * canvas.width + noise(blob.noiseOffsetX, time * 0.5, time * blob.speed) * 100
        const centerY = blob.y * canvas.height + noise(blob.noiseOffsetY, time * 0.5, time * blob.speed * 1.2) * 80

        // Subtle cursor influence - blobs gently move toward/away from cursor
        const dx = mouseRef.current.x - centerX
        const dy = mouseRef.current.y - centerY
        const dist = Math.sqrt(dx * dx + dy * dy)
        const influence = Math.max(0, 1 - dist / 600) * 30
        const offsetX = (dx / (dist || 1)) * influence * (index % 2 === 0 ? 1 : -0.5)
        const offsetY = (dy / (dist || 1)) * influence * (index % 2 === 0 ? 1 : -0.5)

        const finalX = centerX + offsetX
        const finalY = centerY + offsetY

        // Morphing radius based on time
        const morphFactor = 1 + noise(index * 100, time, time * blob.speed) * 0.15
        const radius = blob.baseRadius * morphFactor

        // Create soft radial gradient
        const gradient = ctx.createRadialGradient(
          finalX, finalY, 0,
          finalX, finalY, radius
        )

        const alpha = 0.06 + Math.sin(time * blob.speed * 10 + blob.phase) * 0.02
        gradient.addColorStop(0, `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, ${alpha})`)
        gradient.addColorStop(0.4, `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, ${alpha * 0.6})`)
        gradient.addColorStop(0.7, `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, ${alpha * 0.3})`)
        gradient.addColorStop(1, `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, 0)`)

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      })

      // Flowing wave lines - horizontal waves that flow slowly
      const waveCount = 5
      for (let w = 0; w < waveCount; w++) {
        const baseY = (canvas.height / (waveCount + 1)) * (w + 1)
        const waveColor = w % 3 === 0 ? colors.magenta : w % 3 === 1 ? colors.purple : colors.blue

        ctx.beginPath()
        ctx.moveTo(0, baseY)

        for (let x = 0; x <= canvas.width; x += 10) {
          const waveY = baseY +
            Math.sin(x * 0.003 + time * 0.002 + w) * 30 +
            Math.sin(x * 0.007 + time * 0.001 + w * 2) * 15 +
            noise(x, w * 50, time * 0.0005) * 20

          // Cursor influence on waves
          const waveDx = mouseRef.current.x - x
          const waveDy = mouseRef.current.y - waveY
          const waveDist = Math.sqrt(waveDx * waveDx + waveDy * waveDy)
          const waveInfluence = Math.max(0, 1 - waveDist / 300) * 25
          const finalWaveY = waveY - waveInfluence

          ctx.lineTo(x, finalWaveY)
        }

        const waveAlpha = 0.03 + Math.sin(time * 0.001 + w) * 0.01
        ctx.strokeStyle = `rgba(${waveColor.r}, ${waveColor.g}, ${waveColor.b}, ${waveAlpha})`
        ctx.lineWidth = 2
        ctx.stroke()

        // Second pass with blur effect
        ctx.strokeStyle = `rgba(${waveColor.r}, ${waveColor.g}, ${waveColor.b}, ${waveAlpha * 0.5})`
        ctx.lineWidth = 8
        ctx.stroke()
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "transparent" }}
    />
  )
}
