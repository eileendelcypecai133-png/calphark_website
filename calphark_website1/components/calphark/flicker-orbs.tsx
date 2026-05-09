"use client"

import { useEffect, useRef } from "react"

// Photorealistic Fluid Waves - Living Intelligence
// Brand colors: magenta, purple, blue, cyan
// Fast, realistic water-like caustics and light refraction

export function FlickerOrbs() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000, active: false, velocity: { x: 0, y: 0 } })
  const prevMouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    // Brand colors - RGB values
    const brandColors = {
      magenta: { r: 233, g: 30, b: 140 },
      purple: { r: 139, g: 75, b: 158 },
      blue: { r: 43, g: 108, b: 176 },
      cyan: { r: 56, g: 189, b: 248 },
    }

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

    // Mouse tracking with velocity
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const newX = e.clientX - rect.left
      const newY = e.clientY - rect.top
      
      mouseRef.current.velocity.x = (newX - prevMouseRef.current.x) * 0.3
      mouseRef.current.velocity.y = (newY - prevMouseRef.current.y) * 0.3
      
      prevMouseRef.current.x = mouseRef.current.x
      prevMouseRef.current.y = mouseRef.current.y
      
      mouseRef.current.x = newX
      mouseRef.current.y = newY
      mouseRef.current.active = true
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    let time = 0

    // Perlin-like noise function for organic movement
    const noise = (x: number, y: number, t: number): number => {
      const n1 = Math.sin(x * 0.01 + t) * Math.cos(y * 0.01 + t * 0.7)
      const n2 = Math.sin(x * 0.02 - t * 1.3) * Math.cos(y * 0.015 + t * 0.5)
      const n3 = Math.sin(x * 0.005 + y * 0.005 + t * 0.3)
      return (n1 + n2 + n3) / 3
    }

    // Calculate wave height at position
    const getWaveHeight = (x: number, baseY: number, t: number, layer: number): number => {
      const speed = 2.5 + layer * 0.3
      const freq = 0.008 + layer * 0.002
      
      let h = 0
      // Multiple octaves for realistic water
      h += Math.sin(x * freq + t * speed) * (40 - layer * 5)
      h += Math.sin(x * freq * 2.1 - t * speed * 0.7) * (25 - layer * 3)
      h += Math.sin(x * freq * 0.5 + t * speed * 1.5) * (15 - layer * 2)
      h += noise(x, baseY, t) * 20
      
      return baseY + h
    }

    const animate = () => {
      time += 0.035 // Fast animation
      
      // Clear with slight fade for motion blur effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)"
      ctx.fillRect(0, 0, width, height)
      ctx.clearRect(0, 0, width, height)

      const mouse = mouseRef.current

      // === LAYER 1: Deep caustic light patterns ===
      ctx.globalCompositeOperation = "lighter"
      
      // Caustic network - photorealistic light refraction
      const gridSize = 80
      for (let gx = -gridSize; gx < width + gridSize; gx += gridSize) {
        for (let gy = -gridSize; gy < height + gridSize; gy += gridSize) {
          const distortX = noise(gx, gy, time * 2) * 40
          const distortY = noise(gx + 100, gy + 100, time * 2) * 40
          
          const x = gx + distortX
          const y = gy + distortY
          
          // Color based on position
          const colorMix = (Math.sin(gx * 0.005 + time) + 1) / 2
          const colorMix2 = (Math.sin(gy * 0.005 + time * 0.7) + 1) / 2
          
          let r, g, b
          if (colorMix < 0.33) {
            r = brandColors.magenta.r
            g = brandColors.magenta.g
            b = brandColors.magenta.b
          } else if (colorMix < 0.66) {
            r = brandColors.purple.r
            g = brandColors.purple.g
            b = brandColors.purple.b
          } else {
            r = brandColors.blue.r * (1 - colorMix2) + brandColors.cyan.r * colorMix2
            g = brandColors.blue.g * (1 - colorMix2) + brandColors.cyan.g * colorMix2
            b = brandColors.blue.b * (1 - colorMix2) + brandColors.cyan.b * colorMix2
          }
          
          const intensity = (noise(gx, gy, time * 3) + 1) * 0.15
          
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, gridSize * 0.8)
          gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${intensity})`)
          gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${intensity * 0.3})`)
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
          
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(x, y, gridSize * 0.8, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // === LAYER 2: Flowing light beams ===
      for (let beam = 0; beam < 12; beam++) {
        const beamX = ((beam * width / 12) + time * 150) % (width + 400) - 200
        const beamWidth = 100 + Math.sin(time * 2 + beam) * 30
        
        const colors = [brandColors.magenta, brandColors.purple, brandColors.blue, brandColors.cyan]
        const color = colors[beam % 4]
        
        const angle = Math.sin(time * 0.5 + beam * 0.5) * 0.3
        
        ctx.save()
        ctx.translate(beamX, 0)
        ctx.rotate(angle)
        
        const beamGradient = ctx.createLinearGradient(-beamWidth/2, 0, beamWidth/2, 0)
        beamGradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`)
        beamGradient.addColorStop(0.3, `rgba(${color.r}, ${color.g}, ${color.b}, 0.08)`)
        beamGradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, 0.15)`)
        beamGradient.addColorStop(0.7, `rgba(${color.r}, ${color.g}, ${color.b}, 0.08)`)
        beamGradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`)
        
        ctx.fillStyle = beamGradient
        ctx.fillRect(-beamWidth/2, -height * 0.5, beamWidth, height * 2)
        
        ctx.restore()
      }

      // === LAYER 3: Horizontal wave bands with realistic light ===
      ctx.globalCompositeOperation = "source-over"
      
      const waveBands = [
        { y: 0.2, color: brandColors.cyan, alpha: 0.25 },
        { y: 0.35, color: brandColors.blue, alpha: 0.3 },
        { y: 0.5, color: brandColors.purple, alpha: 0.35 },
        { y: 0.65, color: brandColors.magenta, alpha: 0.3 },
        { y: 0.8, color: brandColors.purple, alpha: 0.25 },
      ]
      
      waveBands.forEach((band, bandIndex) => {
        const baseY = height * band.y
        const color = band.color
        
        // Main wave fill
        ctx.beginPath()
        ctx.moveTo(0, height)
        
        const points: { x: number; y: number }[] = []
        
        for (let x = 0; x <= width; x += 2) {
          const y = getWaveHeight(x, baseY, time, bandIndex)
          
          // Mouse interaction - realistic water displacement
          if (mouse.active) {
            const dx = x - mouse.x
            const dy = y - mouse.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            const maxDist = 200
            
            if (dist < maxDist) {
              const force = Math.pow(1 - dist / maxDist, 2)
              const waveOffset = Math.sin(dist * 0.08 - time * 12) * force * 50
              points.push({ x, y: y + waveOffset })
            } else {
              points.push({ x, y })
            }
          } else {
            points.push({ x, y })
          }
        }
        
        points.forEach((p, i) => {
          if (i === 0) ctx.moveTo(p.x, p.y)
          else ctx.lineTo(p.x, p.y)
        })
        
        ctx.lineTo(width, height)
        ctx.lineTo(0, height)
        ctx.closePath()
        
        // Gradient with realistic light falloff
        const waveGradient = ctx.createLinearGradient(0, baseY - 60, 0, baseY + 100)
        waveGradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`)
        waveGradient.addColorStop(0.3, `rgba(${color.r}, ${color.g}, ${color.b}, ${band.alpha * 0.5})`)
        waveGradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, ${band.alpha})`)
        waveGradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, ${band.alpha * 0.3})`)
        
        ctx.fillStyle = waveGradient
        ctx.fill()
        
        // Highlight line at wave crest
        ctx.globalCompositeOperation = "lighter"
        ctx.beginPath()
        points.forEach((p, i) => {
          if (i === 0) ctx.moveTo(p.x, p.y)
          else ctx.lineTo(p.x, p.y)
        })
        
        const highlightAlpha = 0.3 + Math.sin(time * 3 + bandIndex) * 0.1
        ctx.strokeStyle = `rgba(255, 255, 255, ${highlightAlpha})`
        ctx.lineWidth = 1.5
        ctx.stroke()
        
        ctx.globalCompositeOperation = "source-over"
      })

      // === LAYER 4: Surface sparkles / light reflections ===
      ctx.globalCompositeOperation = "lighter"
      
      for (let i = 0; i < 60; i++) {
        const sparkleX = (i * width / 60 + time * (80 + i * 2)) % (width + 100) - 50
        const baseY = height * (0.15 + (i % 5) * 0.15)
        const sparkleY = getWaveHeight(sparkleX, baseY, time, i % 5)
        
        const colors = [brandColors.magenta, brandColors.purple, brandColors.blue, brandColors.cyan]
        const color = colors[i % 4]
        
        // Flickering intensity
        const flicker = (Math.sin(time * 15 + i * 2.3) + 1) / 2
        const size = 2 + flicker * 4
        const alpha = 0.3 + flicker * 0.5
        
        // Glow
        const glowGradient = ctx.createRadialGradient(sparkleX, sparkleY, 0, sparkleX, sparkleY, size * 6)
        glowGradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.6})`)
        glowGradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.2})`)
        glowGradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`)
        
        ctx.fillStyle = glowGradient
        ctx.beginPath()
        ctx.arc(sparkleX, sparkleY, size * 6, 0, Math.PI * 2)
        ctx.fill()
        
        // Bright core
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.8})`
        ctx.beginPath()
        ctx.arc(sparkleX, sparkleY, size * 0.4, 0, Math.PI * 2)
        ctx.fill()
      }

      // === LAYER 5: Mouse interaction - realistic ripples ===
      if (mouse.active) {
        // Concentric ripples with realistic water physics
        for (let ring = 0; ring < 6; ring++) {
          const baseRadius = 20 + ring * 35
          const radiusOscillation = Math.sin(time * 8 - ring * 0.5) * 8
          const radius = baseRadius + radiusOscillation
          
          const colors = [brandColors.cyan, brandColors.blue, brandColors.purple, brandColors.magenta]
          const color = colors[ring % 4]
          
          const alpha = (0.4 - ring * 0.05) * (0.7 + Math.sin(time * 10 + ring) * 0.3)
          
          // Inner glow
          const rippleGradient = ctx.createRadialGradient(
            mouse.x, mouse.y, radius - 10,
            mouse.x, mouse.y, radius + 10
          )
          rippleGradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`)
          rippleGradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`)
          rippleGradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`)
          
          ctx.strokeStyle = rippleGradient
          ctx.lineWidth = 3 - ring * 0.3
          ctx.beginPath()
          ctx.arc(mouse.x, mouse.y, radius, 0, Math.PI * 2)
          ctx.stroke()
        }
        
        // Central light bloom
        const bloomGradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 80)
        bloomGradient.addColorStop(0, `rgba(255, 255, 255, 0.2)`)
        bloomGradient.addColorStop(0.3, `rgba(${brandColors.cyan.r}, ${brandColors.cyan.g}, ${brandColors.cyan.b}, 0.15)`)
        bloomGradient.addColorStop(0.6, `rgba(${brandColors.purple.r}, ${brandColors.purple.g}, ${brandColors.purple.b}, 0.08)`)
        bloomGradient.addColorStop(1, `rgba(0, 0, 0, 0)`)
        
        ctx.fillStyle = bloomGradient
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 80, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalCompositeOperation = "source-over"

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
      className="absolute inset-0 pointer-events-auto"
      style={{ background: "transparent" }}
    />
  )
}
