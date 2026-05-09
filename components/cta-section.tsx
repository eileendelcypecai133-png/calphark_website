"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check } from "lucide-react"

const benefits = [
  "No credit card required",
  "14-day free trial",
  "Cancel anytime",
  "24/7 support",
]

export function CTASection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovering) return
      const section = document.getElementById("cta-section")
      if (!section) return

      const rect = section.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [isHovering])

  return (
    <section
      id="cta-section"
      className="py-24 sm:py-32 relative overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Interactive Gradient Background */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: isHovering
            ? `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(var(--brand-pink), 0.1), transparent 40%)`
            : "transparent",
        }}
      />

      {/* Static Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-pink/5 via-transparent to-brand-lavender/5" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-brand-pink to-brand-lavender opacity-30"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${20 + Math.sin(i) * 30}%`,
                  animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </div>

          {/* Main Content */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            Ready to build something{" "}
            <span className="bg-gradient-to-r from-brand-pink via-brand-coral to-brand-lavender bg-clip-text text-transparent">
              amazing
            </span>
            ?
          </h2>

          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty">
            Join thousands of teams who have transformed their workflow. Start
            your free trial today and see the difference.
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-10">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-2 text-sm text-muted-foreground group"
              >
                <div className="w-5 h-5 rounded-full bg-brand-pink/10 flex items-center justify-center group-hover:bg-brand-pink/20 transition-colors duration-300">
                  <Check className="w-3 h-3 text-brand-pink" />
                </div>
                {benefit}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="group relative bg-gradient-to-r from-brand-pink to-brand-lavender hover:opacity-90 text-primary-foreground border-0 px-8 py-6 text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-brand-pink/30 hover:-translate-y-1"
            >
              Get Started for Free
              <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg border-border hover:border-brand-pink/50 hover:bg-brand-pink/5 transition-all duration-300"
            >
              Talk to Sales
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-pink/50 to-transparent" />

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
      `}</style>
    </section>
  )
}
