"use client"

import { useEffect, useRef, useState } from "react"
import { Zap, Shield, Palette, Layers, Globe, Sparkles } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Optimized performance that keeps your users engaged and coming back for more.",
    color: "from-brand-pink to-brand-coral",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-grade security with end-to-end encryption and compliance certifications.",
    color: "from-brand-coral to-brand-peach",
  },
  {
    icon: Palette,
    title: "Beautiful Design",
    description:
      "Stunning templates and components that make your product stand out.",
    color: "from-brand-lavender to-brand-pink",
  },
  {
    icon: Layers,
    title: "Modular Architecture",
    description:
      "Build complex applications with reusable, composable building blocks.",
    color: "from-brand-peach to-brand-coral",
  },
  {
    icon: Globe,
    title: "Global Scale",
    description:
      "Deploy worldwide with automatic scaling and edge optimization.",
    color: "from-brand-pink to-brand-lavender",
  },
  {
    icon: Sparkles,
    title: "AI-Powered",
    description:
      "Intelligent features that adapt and improve based on user behavior.",
    color: "from-brand-coral to-brand-pink",
  },
]

export function FeaturesSection() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute("data-index") || "0"
            )
            setVisibleCards((prev) =>
              prev.includes(index) ? prev : [...prev, index]
            )
          }
        })
      },
      { threshold: 0.2 }
    )

    const cards = sectionRef.current?.querySelectorAll(".feature-card")
    cards?.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-24 sm:py-32 bg-gradient-to-b from-background to-secondary/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-brand-pink to-brand-lavender bg-clip-text text-transparent">
              ship faster
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            A comprehensive toolkit designed to streamline your workflow and
            accelerate development.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              data-index={index}
              className={`feature-card group relative p-6 rounded-2xl bg-background border border-border/50 transition-all duration-500 hover:border-brand-pink/30 hover:shadow-xl hover:shadow-brand-pink/5 hover:-translate-y-2 ${
                visibleCards.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-brand-pink transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Glow Effect */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
