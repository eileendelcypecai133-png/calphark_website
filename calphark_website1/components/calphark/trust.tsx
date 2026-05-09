"use client"

import { useEffect, useRef, useState } from "react"
import { CheckCircle2 } from "lucide-react"
import { ScrollReveal, HoverEffect, MagneticHover } from "./scroll-reveal"

const stats = [
  { value: "500+", label: "Enterprise Clients" },
  { value: "99.9%", label: "Uptime Guarantee" },
  { value: "50+", label: "Countries Served" },
  { value: "24/7", label: "Expert Support" },
]

const certifications = [
  "ISO 27001 Certified",
  "SOC 2 Type II",
  "GDPR Compliant",
  "HIPAA Ready",
]

export function CalpharkTrust() {
  const [counters, setCounters] = useState<number[]>(stats.map(() => 0))
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const steps = 60
    const interval = duration / steps

    const targets = stats.map((stat) => {
      const match = stat.value.match(/[\d.]+/)
      return match ? parseFloat(match[0]) : 0
    })

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps
      const eased = 1 - Math.pow(1 - progress, 3)

      setCounters(targets.map((target) => Math.round(target * eased)))

      if (step >= steps) {
        clearInterval(timer)
        setCounters(targets.map((t) => t))
      }
    }, interval)

    return () => clearInterval(timer)
  }, [isVisible])

  const formatValue = (index: number) => {
    const original = stats[index].value
    const count = counters[index]

    if (original.includes("+")) return `${count}+`
    if (original.includes("%")) return `${count}%`
    if (original.includes("/")) return original
    return count.toString()
  }

  return (
    <section id="about" ref={sectionRef} className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content */}
          <div>
            <ScrollReveal delay={0} direction="right">
              <span className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-brand-magenta/10 via-brand-purple/10 to-brand-blue/10 border border-brand-purple/20 transition-all duration-500 hover:border-brand-purple/40">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-magenta to-brand-purple animate-pulse" />
                <span className="bg-gradient-to-r from-brand-magenta via-brand-purple to-brand-blue bg-clip-text text-transparent">
                  Why Choose Calphark
                </span>
              </span>
            </ScrollReveal>
            
            <ScrollReveal delay={100} direction="right">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
                Enterprise Trust,{" "}
                <span className="bg-gradient-to-r from-brand-magenta via-brand-purple to-brand-blue bg-clip-text text-transparent">
                  Startup Agility
                </span>
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={200} direction="right">
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We combine the reliability and security that enterprises demand with
                the innovation and speed of a technology leader. Our solutions are
                built on a foundation of trust, compliance, and continuous improvement.
              </p>
            </ScrollReveal>

            {/* Certifications */}
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <ScrollReveal key={cert} delay={300 + index * 80} direction="right">
                  <MagneticHover strength={0.2}>
                    <div className="group flex items-center gap-3 cursor-pointer transition-all duration-300 hover:translate-x-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-brand-magenta/10 via-brand-purple/10 to-brand-blue/10 flex items-center justify-center transition-all duration-300 group-hover:from-brand-magenta/20 group-hover:via-brand-purple/20 group-hover:to-brand-blue/20 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-brand-purple/20">
                        <CheckCircle2 className="w-4 h-4 text-brand-purple transition-colors duration-300 group-hover:text-brand-magenta" />
                      </div>
                      <span className="text-foreground font-medium transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-brand-magenta group-hover:via-brand-purple group-hover:to-brand-blue group-hover:bg-clip-text group-hover:text-transparent">
                        {cert}
                      </span>
                    </div>
                  </MagneticHover>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <ScrollReveal
                key={stat.label}
                delay={100 + index * 100}
                direction="left"
              >
                <HoverEffect intensity="medium">
                  <div className="group relative p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-brand-purple/10 text-center transition-all duration-500 hover:shadow-2xl hover:shadow-brand-purple/15 hover:border-brand-purple/30 overflow-hidden cursor-pointer">
                    {/* Animated background */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-magenta/0 via-brand-purple/0 to-brand-blue/0 group-hover:from-brand-magenta/5 group-hover:via-brand-purple/5 group-hover:to-brand-blue/5 transition-all duration-500" />

                    {/* Scan line */}
                    <div className="absolute inset-0 overflow-hidden rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-brand-magenta/40 to-transparent animate-scan-line" />
                    </div>

                    <div className="relative">
                      <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-brand-magenta via-brand-purple to-brand-blue bg-clip-text text-transparent mb-2 transition-all duration-300 group-hover:scale-110">
                        {formatValue(index)}
                      </div>
                      <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>

                    {/* Corner accents */}
                    <div className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg viewBox="0 0 32 32" className="w-full h-full">
                        <path
                          d="M0 0 L32 0 L32 32"
                          fill="none"
                          stroke="url(#trustCorner)"
                          strokeWidth="2"
                        />
                        <defs>
                          <linearGradient id="trustCorner" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#E91E8C" />
                            <stop offset="100%" stopColor="#2B6CB0" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg viewBox="0 0 32 32" className="w-full h-full">
                        <path
                          d="M32 32 L0 32 L0 0"
                          fill="none"
                          stroke="url(#trustCorner2)"
                          strokeWidth="2"
                        />
                        <defs>
                          <linearGradient id="trustCorner2" x1="100%" y1="100%" x2="0%" y2="0%">
                            <stop offset="0%" stopColor="#2B6CB0" />
                            <stop offset="100%" stopColor="#E91E8C" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </HoverEffect>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
