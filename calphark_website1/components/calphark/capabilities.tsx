"use client"

import { useState } from "react"
import { Brain, Zap, Shield, LineChart, Cpu, Globe } from "lucide-react"
import { ScrollReveal, HoverEffect } from "./scroll-reveal"

const capabilities = [
  {
    icon: Brain,
    title: "Machine Learning",
    description:
      "Custom ML models trained on your data to automate complex decision-making processes.",
  },
  {
    icon: Zap,
    title: "Real-time Processing",
    description:
      "Stream processing and instant insights for time-sensitive business operations.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-grade security with end-to-end encryption and compliance certifications.",
  },
  {
    icon: LineChart,
    title: "Predictive Analytics",
    description:
      "Forecast trends and anticipate market changes with advanced analytics.",
  },
  {
    icon: Cpu,
    title: "Edge Computing",
    description:
      "Deploy AI at the edge for faster inference and reduced latency.",
  },
  {
    icon: Globe,
    title: "Global Scale",
    description:
      "Infrastructure designed to scale seamlessly across regions and markets.",
  },
]

export function CalpharkCapabilities() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section
      id="capabilities"
      className="py-24 lg:py-32 bg-gradient-to-b from-brand-light-purple/20 via-brand-light-magenta/10 to-background relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="capability-grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1" fill="#8B4B9E" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#capability-grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <ScrollReveal delay={0} direction="up">
            <span className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-brand-magenta/10 via-brand-purple/10 to-brand-blue/10 border border-brand-purple/20 transition-all duration-500 hover:border-brand-purple/40">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-purple to-brand-blue animate-pulse" />
              <span className="bg-gradient-to-r from-brand-magenta via-brand-purple to-brand-blue bg-clip-text text-transparent">
                Our Capabilities
              </span>
            </span>
          </ScrollReveal>
          <ScrollReveal delay={100} direction="up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              Powered by{" "}
              <span className="bg-gradient-to-r from-brand-magenta via-brand-purple to-brand-blue bg-clip-text text-transparent">
                Advanced Technology
              </span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200} direction="up">
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform combines cutting-edge AI with enterprise-grade
              infrastructure to deliver solutions that scale with your ambitions.
            </p>
          </ScrollReveal>
        </div>

        {/* Capabilities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon
            const isHovered = hoveredIndex === index

            return (
              <ScrollReveal
                key={capability.title}
                delay={100 + index * 80}
                direction="up"
              >
                <HoverEffect intensity="medium">
                  <div
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="relative group p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-brand-purple/10 h-full transition-all duration-500 hover:shadow-2xl hover:shadow-brand-purple/15 hover:border-brand-purple/30 overflow-hidden cursor-pointer"
                  >
                    {/* Animated top border */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl transition-all duration-500 ${
                        isHovered
                          ? "bg-gradient-to-r from-brand-magenta via-brand-purple to-brand-blue animate-border-flow bg-[length:200%_100%]"
                          : "bg-transparent"
                      }`}
                    />

                    {/* Scan line */}
                    <div className={`absolute inset-0 overflow-hidden rounded-2xl transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}>
                      <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-brand-magenta/40 to-transparent animate-scan-line" />
                    </div>

                    {/* Icon with pulse effect */}
                    <div className="relative mb-6">
                      <div
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                          isHovered
                            ? "bg-gradient-to-br from-brand-magenta/20 via-brand-purple/20 to-brand-blue/20 scale-110 shadow-lg shadow-brand-purple/20"
                            : "bg-gradient-to-br from-brand-light-magenta via-brand-light-purple to-brand-light-blue"
                        }`}
                      >
                        <Icon
                          className={`w-8 h-8 transition-all duration-300 ${
                            isHovered ? "text-brand-magenta" : "text-brand-purple"
                          }`}
                        />
                      </div>

                      {/* Pulse rings */}
                      {isHovered && (
                        <>
                          <div className="absolute inset-0 w-16 h-16 rounded-2xl border border-brand-magenta/30 animate-ping" />
                          <div
                            className="absolute inset-0 w-16 h-16 rounded-2xl border border-brand-blue/20 animate-ping"
                            style={{ animationDelay: "0.2s" }}
                          />
                        </>
                      )}
                    </div>

                    {/* Content */}
                    <h3 className={`text-xl font-semibold mb-3 transition-all duration-300 ${isHovered ? "bg-gradient-to-r from-brand-magenta via-brand-purple to-brand-blue bg-clip-text text-transparent" : "text-foreground"}`}>
                      {capability.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {capability.description}
                    </p>

                    {/* AI connection lines */}
                    <svg
                      className={`absolute -bottom-4 -right-4 w-24 h-24 transition-opacity duration-500 ${
                        isHovered ? "opacity-30" : "opacity-0"
                      }`}
                      viewBox="0 0 100 100"
                    >
                      <path
                        d="M10 90 Q 50 50 90 10"
                        stroke="url(#capabilityLine)"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="5,5"
                      />
                      <defs>
                        <linearGradient id="capabilityLine" x1="0%" y1="100%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#E91E8C" />
                          <stop offset="50%" stopColor="#8B4B9E" />
                          <stop offset="100%" stopColor="#2B6CB0" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Corner glow */}
                    <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}>
                      <div className="w-full h-full bg-gradient-to-tl from-brand-blue/20 via-brand-purple/10 to-transparent blur-2xl" />
                    </div>
                  </div>
                </HoverEffect>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
