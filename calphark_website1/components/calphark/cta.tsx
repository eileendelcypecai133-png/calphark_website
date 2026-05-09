"use client"

import { useEffect, useRef, useState } from "react"
import { AIButton } from "./ai-button"
import { ArrowRight } from "lucide-react"

export function CalpharkCTA() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 lg:py-32 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          onMouseMove={handleMouseMove}
          className={`relative rounded-3xl overflow-hidden transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Background gradient using brand colors */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a3e] via-[#2d1f4a] to-[#1a2f4a]" />

          {/* Animated gradient following mouse */}
          <div
            className="absolute inset-0 opacity-60 transition-all duration-300"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(233, 30, 140, 0.4) 0%, transparent 50%)`,
            }}
          />

          {/* Secondary mouse-follow gradient */}
          <div
            className="absolute inset-0 opacity-40 transition-all duration-500"
            style={{
              background: `radial-gradient(circle at ${100 - mousePosition.x}% ${100 - mousePosition.y}%, rgba(43, 108, 176, 0.4) 0%, transparent 50%)`,
            }}
          />

          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(rgba(233,30,140,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(43,108,176,0.2) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(30)].map((_, i) => {
              const colors = ["#E91E8C", "#8B4B9E", "#2B6CB0"]
              return (
                <div
                  key={i}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    backgroundColor: colors[i % 3],
                    opacity: 0.6,
                    animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
                    animationDelay: `${Math.random() * 5}s`,
                  }}
                />
              )
            })}
          </div>

          {/* Content */}
          <div className="relative z-10 px-8 py-16 md:px-16 md:py-24 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance">
              Ready to Transform Your{" "}
              <span className="bg-gradient-to-r from-[#E91E8C] via-[#8B4B9E] to-[#2B6CB0] bg-clip-text text-transparent">
                Enterprise
              </span>
              ?
            </h2>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10">
              Let&apos;s discuss how our AI solutions can address your unique
              challenges and drive measurable business outcomes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AIButton variant="primary" size="lg">
                Schedule a Demo
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </AIButton>
              <button className="group relative px-8 py-4 text-lg font-medium text-white rounded-lg border border-white/30 hover:border-white/50 transition-all duration-300 hover:bg-white/10 overflow-hidden">
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <span className="relative">Contact Sales</span>
              </button>
            </div>

            {/* Neural network decoration - left */}
            <svg
              className="absolute bottom-0 left-0 w-64 h-64 opacity-20"
              viewBox="0 0 200 200"
            >
              {[...Array(6)].map((_, i) => {
                const angle = (i * Math.PI * 2) / 6
                const x = 100 + 80 * Math.cos(angle)
                const y = 100 + 80 * Math.sin(angle)
                return (
                  <g key={i}>
                    <circle cx={x} cy={y} r="4" fill="#E91E8C" className="animate-neural-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                    <line
                      x1={100}
                      y1={100}
                      x2={x}
                      y2={y}
                      stroke="url(#ctaLineGradient)"
                      strokeWidth="1"
                    />
                  </g>
                )
              })}
              <circle cx="100" cy="100" r="8" fill="#8B4B9E" />
              <defs>
                <linearGradient id="ctaLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E91E8C" />
                  <stop offset="100%" stopColor="#2B6CB0" />
                </linearGradient>
              </defs>
            </svg>

            {/* Neural network decoration - right */}
            <svg
              className="absolute top-0 right-0 w-48 h-48 opacity-20"
              viewBox="0 0 200 200"
            >
              {[...Array(4)].map((_, i) => {
                const angle = (i * Math.PI * 2) / 4
                const x = 100 + 60 * Math.cos(angle)
                const y = 100 + 60 * Math.sin(angle)
                return (
                  <g key={i}>
                    <circle cx={x} cy={y} r="3" fill="#2B6CB0" className="animate-neural-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
                    <line
                      x1={100}
                      y1={100}
                      x2={x}
                      y2={y}
                      stroke="#8B4B9E"
                      strokeWidth="1"
                      strokeDasharray="4,4"
                    />
                  </g>
                )
              })}
            </svg>

            {/* Scan line effect */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
              <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#E91E8C]/40 to-transparent animate-scan-line" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
