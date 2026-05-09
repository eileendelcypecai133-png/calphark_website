"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { FloatingOrb } from "@/components/floating-orb"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingOrb
          size={400}
          color="from-brand-pink/20 to-brand-lavender/20"
          initialPosition={{ x: -100, y: -50 }}
          delay={0}
        />
        <FloatingOrb
          size={300}
          color="from-brand-coral/15 to-brand-peach/15"
          initialPosition={{ x: 200, y: 100 }}
          delay={2}
        />
        <FloatingOrb
          size={250}
          color="from-brand-lavender/20 to-brand-pink/15"
          initialPosition={{ x: -150, y: 200 }}
          delay={4}
        />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Announcement Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 border border-border/50 mb-8 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Sparkles className="w-4 h-4 text-brand-pink" />
          <span className="text-sm text-muted-foreground">
            New: AI-powered workflows
          </span>
          <a
            href="#"
            className="text-sm font-medium text-brand-pink hover:text-brand-coral transition-colors"
          >
            Learn more
          </a>
        </div>

        {/* Main Heading */}
        <h1
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 transition-all duration-700 delay-100 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="text-balance">Build products that</span>
          <br />
          <span className="bg-gradient-to-r from-brand-pink via-brand-coral to-brand-lavender bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
            people love
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={`max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground mb-10 text-pretty transition-all duration-700 delay-200 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          The modern platform for building beautiful, interactive experiences.
          Transform your ideas into reality with our intuitive tools and
          AI-powered assistance.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Button
            size="lg"
            className="group relative bg-gradient-to-r from-brand-pink to-brand-lavender hover:opacity-90 text-primary-foreground border-0 px-8 py-6 text-lg transition-all duration-300 hover:shadow-xl hover:shadow-brand-pink/25 hover:-translate-y-1"
          >
            Start Building
            <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="px-8 py-6 text-lg border-border hover:border-brand-pink/50 hover:bg-brand-pink/5 transition-all duration-300"
          >
            Watch Demo
          </Button>
        </div>

        {/* Social Proof */}
        <div
          className={`mt-16 transition-all duration-700 delay-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-sm text-muted-foreground mb-6">
            Trusted by innovative teams worldwide
          </p>
          <div className="flex items-center justify-center gap-8 opacity-50">
            {["Acme Inc", "TechCorp", "Innovate", "BuildCo", "CreateLab"].map(
              (company) => (
                <div
                  key={company}
                  className="text-lg font-semibold text-muted-foreground/60 hover:text-muted-foreground transition-colors duration-200 cursor-default"
                >
                  {company}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
