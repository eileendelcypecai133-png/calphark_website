"use client"

import { useState } from "react"
import { AIButton } from "./ai-button"
import { ArrowRight } from "lucide-react"
import { ScrollReveal, MagneticHover } from "./scroll-reveal"
import { SectionTransition } from "./intelligent-interactions"

export function CalpharkCTA() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <section id="contact" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionTransition variant="depth-shift">
          <ScrollReveal delay={0} direction="scale">
            <div
              onMouseMove={handleMouseMove}
              className="relative rounded-3xl overflow-hidden"
            >
              {/* Background gradient using brand colors */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a3e] via-[#2d1f4a] to-[#1a2f4a]" />

              {/* Animated gradient following mouse - slow, intentional, alive */}
              <div
                className="absolute inset-0 opacity-50 transition-all duration-1000 ease-out"
                style={{
                  background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(233, 30, 140, 0.35) 0%, transparent 45%)`,
                }}
              />

              {/* Secondary mouse-follow gradient - even slower for depth */}
              <div
                className="absolute inset-0 opacity-30 transition-all duration-1500 ease-out"
                style={{
                  background: `radial-gradient(circle at ${100 - mousePosition.x}% ${100 - mousePosition.y}%, rgba(43, 108, 176, 0.35) 0%, transparent 45%)`,
                }}
              />

              {/* Subtle grid overlay */}
              <div
                className="absolute inset-0 opacity-8"
                style={{
                  backgroundImage: `linear-gradient(rgba(233,30,140,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(43,108,176,0.15) 1px, transparent 1px)`,
                  backgroundSize: "50px 50px",
                }}
              />

              {/* Floating energy nodes - very slow, organic */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => {
                  const colors = ["#E91E8C", "#8B4B9E", "#2B6CB0", "#38BDF8"]
                  return (
                    <div
                      key={i}
                      className="absolute w-1.5 h-1.5 rounded-full"
                      style={{
                        left: `${10 + (i * 4.5) % 80}%`,
                        top: `${10 + (i * 3.7) % 80}%`,
                        backgroundColor: colors[i % 4],
                        opacity: 0.4,
                        animation: `float ${12 + (i % 5) * 2}s ease-in-out infinite`,
                        animationDelay: `${i * 0.5}s`,
                      }}
                    />
                  )
                })}
              </div>

              {/* Content */}
              <div className="relative z-10 px-8 py-16 md:px-16 md:py-24 text-center">
                <ScrollReveal delay={100} direction="up">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance">
                    Ready to Transform Your{" "}
                    <span className="bg-gradient-to-r from-[#E91E8C] via-[#8B4B9E] to-[#2B6CB0] bg-clip-text text-transparent">
                      Enterprise
                    </span>
                    ?
                  </h2>
                </ScrollReveal>
                
                <ScrollReveal delay={200} direction="up">
                  <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10">
                    Let&apos;s discuss how our AI solutions can address your unique
                    challenges and drive measurable business outcomes.
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={300} direction="up">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <MagneticHover strength={0.12}>
                      <AIButton variant="primary" size="lg">
                        Schedule a Demo
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </AIButton>
                    </MagneticHover>
                    <MagneticHover strength={0.12}>
                      <button className="group relative px-8 py-4 text-lg font-medium text-white rounded-lg border border-white/30 hover:border-white/50 transition-all duration-500 hover:bg-white/10 overflow-hidden">
                        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        <span className="relative">Contact Sales</span>
                      </button>
                    </MagneticHover>
                  </div>
                </ScrollReveal>

                {/* Neural network decoration - subtle, alive */}
                <svg
                  className="absolute bottom-4 left-4 w-48 h-48 opacity-15"
                  viewBox="0 0 200 200"
                >
                  {[...Array(5)].map((_, i) => {
                    const angle = (i * Math.PI * 2) / 5
                    const x = 100 + 70 * Math.cos(angle)
                    const y = 100 + 70 * Math.sin(angle)
                    return (
                      <g key={i}>
                        <circle 
                          cx={x} 
                          cy={y} 
                          r="3" 
                          fill="#E91E8C" 
                          className="animate-pulse" 
                          style={{ animationDelay: `${i * 0.4}s`, animationDuration: "3s" }} 
                        />
                        <line
                          x1={100}
                          y1={100}
                          x2={x}
                          y2={y}
                          stroke="url(#ctaLineGradient)"
                          strokeWidth="1"
                          opacity="0.5"
                        />
                      </g>
                    )
                  })}
                  <circle cx="100" cy="100" r="6" fill="#8B4B9E" />
                  <defs>
                    <linearGradient id="ctaLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#E91E8C" />
                      <stop offset="100%" stopColor="#2B6CB0" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Subtle corner decoration - right */}
                <svg
                  className="absolute top-4 right-4 w-32 h-32 opacity-10"
                  viewBox="0 0 200 200"
                >
                  {[...Array(3)].map((_, i) => {
                    const angle = (i * Math.PI * 2) / 3
                    const x = 100 + 50 * Math.cos(angle)
                    const y = 100 + 50 * Math.sin(angle)
                    return (
                      <g key={i}>
                        <circle 
                          cx={x} 
                          cy={y} 
                          r="2" 
                          fill="#2B6CB0" 
                          className="animate-pulse" 
                          style={{ animationDelay: `${i * 0.5}s`, animationDuration: "3s" }} 
                        />
                      </g>
                    )
                  })}
                </svg>
              </div>
            </div>
          </ScrollReveal>
        </SectionTransition>
      </div>
    </section>
  )
}
