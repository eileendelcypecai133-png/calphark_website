"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { AIButton } from "./ai-button"
import { ArrowRight, Sparkles } from "lucide-react"

export function CalpharkHero() {
  const logoRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!logoRef.current) return
      const rect = logoRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const x = (e.clientX - centerX) / 25
      const y = (e.clientY - centerY) / 25
      setMousePos({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div 
            className={`space-y-8 text-center lg:text-left order-2 lg:order-1 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand-magenta/10 via-brand-purple/10 to-brand-blue/10 border border-brand-purple/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-brand-magenta" />
              <span className="text-sm font-medium bg-gradient-to-r from-brand-magenta via-brand-purple to-brand-blue bg-clip-text text-transparent">
                Enterprise AI Solutions
              </span>
            </div>

            {/* Tagline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
              <span className="text-foreground">Guided by</span>{" "}
              <span className="bg-gradient-to-r from-brand-magenta via-brand-purple to-brand-blue bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                Intelligence
              </span>
              <br />
              <span className="text-foreground">Driven by</span>{" "}
              <span className="bg-gradient-to-r from-brand-blue via-brand-purple to-brand-magenta bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                Purpose
              </span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Transform your enterprise with intelligent AI solutions tailored to your industry. 
              We deliver measurable results through cutting-edge technology and deep domain expertise.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <AIButton variant="primary" size="lg">
                Explore Solutions
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </AIButton>
              <AIButton variant="outline" size="lg">
                Schedule Consultation
              </AIButton>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-8 justify-center lg:justify-start pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-brand-magenta to-brand-purple bg-clip-text text-transparent">
                  500+
                </div>
                <div className="text-xs text-muted-foreground">Enterprise Clients</div>
              </div>
              <div className="w-px h-10 bg-gradient-to-b from-transparent via-brand-purple/30 to-transparent" />
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">
                  99.9%
                </div>
                <div className="text-xs text-muted-foreground">Uptime SLA</div>
              </div>
              <div className="w-px h-10 bg-gradient-to-b from-transparent via-brand-purple/30 to-transparent" />
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-brand-blue to-brand-magenta bg-clip-text text-transparent">
                  24/7
                </div>
                <div className="text-xs text-muted-foreground">Global Support</div>
              </div>
            </div>
          </div>

          {/* 3D Animated Logo */}
          <div 
            className={`order-1 lg:order-2 flex justify-center transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div
              ref={logoRef}
              className="relative w-72 h-72 md:w-96 md:h-96 cursor-pointer"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`,
                transition: "transform 0.1s ease-out",
              }}
            >
              {/* Outer rotating ring */}
              <div className="absolute inset-[-20px] rounded-full border-2 border-dashed border-brand-magenta/30 animate-rotate-slow" />
              
              {/* Middle rotating ring - opposite direction */}
              <div 
                className="absolute inset-[-10px] rounded-full border border-brand-purple/20"
                style={{ animation: "rotate-slow 25s linear infinite reverse" }}
              />

              {/* Pulsing glow layers */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-magenta via-brand-purple to-brand-blue opacity-20 blur-3xl animate-pulse-glow" />
              <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-brand-blue via-brand-purple to-brand-magenta opacity-30 blur-2xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
              
              {/* Fluid energy rings */}
              <svg className="absolute inset-[-30px] w-[calc(100%+60px)] h-[calc(100%+60px)]" viewBox="0 0 420 420">
                <defs>
                  <linearGradient id="fluidGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E91E8C" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#8B4B9E" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#2B6CB0" stopOpacity="0.4" />
                  </linearGradient>
                  <linearGradient id="fluidGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#2B6CB0" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#E91E8C" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                {/* Outer flowing ring */}
                <circle
                  cx="210"
                  cy="210"
                  r="200"
                  fill="none"
                  stroke="url(#fluidGradient1)"
                  strokeWidth="2"
                  className="animate-rotate-slow"
                  style={{ transformOrigin: "center" }}
                />
                {/* Inner flowing ring */}
                <circle
                  cx="210"
                  cy="210"
                  r="185"
                  fill="none"
                  stroke="url(#fluidGradient2)"
                  strokeWidth="1.5"
                  style={{ animation: "rotate-slow 30s linear infinite reverse", transformOrigin: "center" }}
                />
              </svg>

              {/* Main logo container */}
              <div className={`absolute inset-12 rounded-full bg-white/90 backdrop-blur-xl shadow-2xl flex items-center justify-center transition-all duration-500 ${isHovering ? "scale-105" : ""}`}>
                {/* Gradient border */}
                <div className="absolute inset-0 rounded-full p-[3px] bg-gradient-to-br from-brand-magenta via-brand-purple to-brand-blue">
                  <div className="w-full h-full rounded-full bg-white" />
                </div>
                
                {/* Logo */}
                <div className="relative w-3/4 h-3/4 z-10">
                  <Image
                    src="/calphark.png"
                    alt="Calphark"
                    fill
                    className="object-contain drop-shadow-xl"
                    priority
                  />
                </div>

                {/* Scan line effect */}
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <div 
                    className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-brand-magenta/50 to-transparent animate-scan-line"
                  />
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <span className="text-xs text-muted-foreground uppercase tracking-wider">
          Scroll to explore
        </span>
        <div className="w-6 h-10 rounded-full border-2 border-brand-purple/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-gradient-to-b from-brand-magenta to-brand-blue animate-bounce" />
        </div>
      </div>
    </section>
  )
}
