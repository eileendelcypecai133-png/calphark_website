"use client"

import { useEffect, useRef } from "react"

// Living Intelligence Fluid Wave Field
// The principle: "alive, not hyperactive"
// - Waves subtly bend when cursor moves
// - Energy fields react with smooth inertia
// - Gradients morph slowly and intentionally
// - No sharp movements, no chaos

export function FluidWaveField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ 
    x: 0, y: 0, 
    targetX: 0, targetY: 0,
    velocity: { x: 0, y: 0 }
  })
  const scrollRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 3
    }
    resize()
    window.addEventListener("resize", resize)

    // Track mouse with very smooth interpolation - intentional, not jerky
    const handleMouseMove = (e: MouseEvent) => {
      const prevTargetX = mouseRef.current.targetX
      const prevTargetY = mouseRef.current.targetY
      mouseRef.current.targetX = e.clientX
      mouseRef.current.targetY = e.clientY + scrollRef.current
      // Calculate velocity for subtle reactions
      mouseRef.current.velocity.x = (e.clientX - prevTargetX) * 0.1
      mouseRef.current.velocity.y = (e.clientY + scrollRef.current - prevTargetY) * 0.1
    }
    window.addEventListener("mousemove", handleMouseMove)

    const handleScroll = () => {
      scrollRef.current = window.scrollY
    }
    window.addEventListener("scroll", handleScroll)

    // Brand colors - purple, magenta, blue, subtle cyan
    const colors = {
      purple: { r: 139, g: 75, b: 158 },
      magenta: { r: 233, g: 30, b: 140 },
      blue: { r: 43, g: 108, b: 176 },
      cyan: { r: 56, g: 189, b: 248 },
    }

    // Organic energy nodes that respond to presence
    interface EnergyNode {
      baseX: number
      baseY: number
      x: number
      y: number
      radius: number
      color: { r: number; g: number; b: number }
      phase: number
      breathSpeed: number
      responsiveness: number
    }

    const nodes: EnergyNode[] = [
      // Distributed across the page with varying responsiveness
      { baseX: 0.1, baseY: 0.08, x: 0, y: 0, radius: 320, color: colors.purple, phase: 0, breathSpeed: 0.0003, responsiveness: 0.8 },
      { baseX: 0.85, baseY: 0.15, x: 0, y: 0, radius: 380, color: colors.magenta, phase: 1.2, breathSpeed: 0.00025, responsiveness: 0.6 },
      { baseX: 0.5, baseY: 0.22, x: 0, y: 0, radius: 280, color: colors.blue, phase: 2.4, breathSpeed: 0.00035, responsiveness: 0.9 },
      { baseX: 0.15, baseY: 0.35, x: 0, y: 0, radius: 250, color: colors.cyan, phase: 3.6, breathSpeed: 0.0004, responsiveness: 0.5 },
      { baseX: 0.75, baseY: 0.42, x: 0, y: 0, radius: 340, color: colors.purple, phase: 0.8, breathSpeed: 0.00028, responsiveness: 0.7 },
      { baseX: 0.3, baseY: 0.52, x: 0, y: 0, radius: 300, color: colors.magenta, phase: 2, breathSpeed: 0.00032, responsiveness: 0.85 },
      { baseX: 0.9, baseY: 0.6, x: 0, y: 0, radius: 260, color: colors.blue, phase: 4, breathSpeed: 0.00038, responsiveness: 0.55 },
      { baseX: 0.2, baseY: 0.7, x: 0, y: 0, radius: 350, color: colors.cyan, phase: 1.5, breathSpeed: 0.00026, responsiveness: 0.75 },
      { baseX: 0.6, baseY: 0.78, x: 0, y: 0, radius: 290, color: colors.purple, phase: 3, breathSpeed: 0.00034, responsiveness: 0.65 },
      { baseX: 0.45, baseY: 0.88, x: 0, y: 0, radius: 400, color: colors.magenta, phase: 0.5, breathSpeed: 0.00022, responsiveness: 0.8 },
      { baseX: 0.8, baseY: 0.95, x: 0, y: 0, radius: 320, color: colors.blue, phase: 2.8, breathSpeed: 0.0003, responsiveness: 0.7 },
    ]

    // Slow organic noise for morphing
    const organicFlow = (x: number, y: number, t: number, seed: number) => {
      // Very slow, flowing movement
      const n1 = Math.sin(x * 0.003 + t * 0.5 + seed) * Math.cos(y * 0.002 + t * 0.3)
      const n2 = Math.sin(x * 0.005 + y * 0.004 + t * 0.2 + seed * 1.5) * 0.6
      const n3 = Math.cos(x * 0.002 - t * 0.15 + seed * 0.7) * Math.sin(y * 0.003 + t * 0.4) * 0.4
      return (n1 + n2 + n3) / 2
    }

    let time = 0

    const animate = () => {
      // Very smooth mouse interpolation - low latency but with inertia
      const lerpFactor = 0.03 // Slow, intentional following
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * lerpFactor
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * lerpFactor
      
      // Decay velocity
      mouseRef.current.velocity.x *= 0.95
      mouseRef.current.velocity.y *= 0.95

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 1

      // Update and draw energy nodes
      nodes.forEach((node, index) => {
        const baseX = node.baseX * canvas.width
        const baseY = node.baseY * canvas.height

        // Organic breathing movement - slow and intentional
        const flowX = organicFlow(baseX, time * 0.2, time * node.breathSpeed, index * 50)
        const flowY = organicFlow(time * 0.2, baseY, time * node.breathSpeed * 1.1, index * 80)
        
        node.x = baseX + flowX * 60
        node.y = baseY + flowY * 50

        // Subtle cursor response - the system responds to presence
        const dx = mouseRef.current.x - node.x
        const dy = mouseRef.current.y - node.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const maxInfluence = 500

        if (dist < maxInfluence) {
          // Gentle, smooth attraction/repulsion based on node responsiveness
          const influence = Math.pow(1 - dist / maxInfluence, 2) * node.responsiveness * 0.08
          // Nodes gently bend toward cursor, creating "the system is responding to me" feel
          node.x += dx * influence
          node.y += dy * influence
        }

        // Morphing radius - slow breathing
        const breathe = 1 + Math.sin(time * node.breathSpeed * 3 + node.phase) * 0.08
        const radius = node.radius * breathe

        // Multi-layer gradient for depth and softness
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, radius
        )

        // Very subtle, ambient opacity - creates depth without chaos
        const baseAlpha = 0.035 + Math.sin(time * node.breathSpeed * 5 + node.phase) * 0.01
        
        gradient.addColorStop(0, `rgba(${node.color.r}, ${node.color.g}, ${node.color.b}, ${baseAlpha * 1.3})`)
        gradient.addColorStop(0.25, `rgba(${node.color.r}, ${node.color.g}, ${node.color.b}, ${baseAlpha * 0.9})`)
        gradient.addColorStop(0.5, `rgba(${node.color.r}, ${node.color.g}, ${node.color.b}, ${baseAlpha * 0.5})`)
        gradient.addColorStop(0.75, `rgba(${node.color.r}, ${node.color.g}, ${node.color.b}, ${baseAlpha * 0.2})`)
        gradient.addColorStop(1, `rgba(${node.color.r}, ${node.color.g}, ${node.color.b}, 0)`)

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      })

      // Energy flow streams - very subtle, continuous
      const streamCount = 5
      for (let s = 0; s < streamCount; s++) {
        const baseY = (canvas.height / (streamCount + 1)) * (s + 1)
        const streamColor = s % 4 === 0 ? colors.purple 
          : s % 4 === 1 ? colors.magenta 
          : s % 4 === 2 ? colors.blue 
          : colors.cyan

        ctx.beginPath()

        for (let x = 0; x <= canvas.width; x += 6) {
          // Flowing wave - slow, organic
          const wave1 = Math.sin(x * 0.0015 + time * 0.0005 + s * 0.8) * 50
          const wave2 = Math.sin(x * 0.003 + time * 0.0003 + s * 1.5) * 30
          const organic = organicFlow(x, s * 100, time * 0.0002, s) * 40
          
          let waveY = baseY + wave1 + wave2 + organic

          // Streams subtly bend toward cursor
          const streamDx = mouseRef.current.x - x
          const streamDy = mouseRef.current.y - waveY
          const streamDist = Math.sqrt(streamDx * streamDx + streamDy * streamDy)
          
          if (streamDist < 400) {
            const streamInfluence = Math.pow(1 - streamDist / 400, 2) * 25
            waveY -= streamInfluence * Math.sign(streamDy) * 0.5
          }

          if (x === 0) {
            ctx.moveTo(x, waveY)
          } else {
            ctx.lineTo(x, waveY)
          }
        }

        // Very subtle stream opacity
        const streamAlpha = 0.012 + Math.sin(time * 0.0004 + s * 0.9) * 0.005

        // Soft glow layer
        ctx.strokeStyle = `rgba(${streamColor.r}, ${streamColor.g}, ${streamColor.b}, ${streamAlpha * 0.4})`
        ctx.lineWidth = 15
        ctx.stroke()

        // Core line
        ctx.strokeStyle = `rgba(${streamColor.r}, ${streamColor.g}, ${streamColor.b}, ${streamAlpha})`
        ctx.lineWidth = 1.5
        ctx.stroke()
      }

      // Connection lines between nearby nodes - shows intelligence/network
      ctx.strokeStyle = `rgba(139, 75, 158, 0.015)`
      ctx.lineWidth = 1
      
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          
          if (dist < 400) {
            const alpha = (1 - dist / 400) * 0.02
            ctx.strokeStyle = `rgba(139, 75, 158, ${alpha})`
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
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
