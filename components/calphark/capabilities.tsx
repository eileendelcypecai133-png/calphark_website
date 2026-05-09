"use client"

import { useState } from "react"
import { Brain, Zap, Shield, LineChart, Cpu, Globe } from "lucide-react"
import { ScrollReveal } from "./scroll-reveal"
import { IntelligentCard, InteractiveText, SectionTransition } from "./intelligent-interactions"

const capabilities = [
  {
    icon: Brain,
    title: "Machine Learning",
    description:
      "Custom ML models trained on your data to automate complex decision-making processes.",
    keywords: ["ML", "automate", "decision-making"],
  },
  {
    icon: Zap,
    title: "Real-time Processing",
    description:
      "Stream processing and instant insights for time-sensitive business operations.",
    keywords: ["instant", "Stream", "time-sensitive"],
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-grade security with end-to-end encryption and compliance certifications.",
    keywords: ["Bank-grade", "encryption", "compliance"],
  },
  {
    icon: LineChart,
    title: "Predictive Analytics",
    description:
      "Forecast trends and anticipate market changes with advanced analytics.",
    keywords: ["Forecast", "anticipate", "advanced"],
  },
  {
    icon: Cpu,
    title: "Edge Computing",
    description:
      "Deploy AI at the edge for faster inference and reduced latency.",
    keywords: ["AI", "faster", "inference"],
  },
  {
    icon: Globe,
    title: "Global Scale",
    description:
      "Infrastructure designed to scale seamlessly across regions and markets.",
    keywords: ["scale", "seamlessly", "Infrastructure"],
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
      <div className="absolute inset-0 opacity-20">
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
        <SectionTransition variant="gradient-flow" className="text-center mb-16 lg:mb-20">
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
        </SectionTransition>

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
                <IntelligentCard>
                  <div
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="relative p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-brand-purple/10 h-full transition-all duration-500 overflow-hidden"
                  >
                    {/* Animated top border */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl transition-all duration-500 ${
                        isHovered
                          ? "bg-gradient-to-r from-brand-magenta via-brand-purple to-brand-blue"
                          : "bg-transparent"
                      }`}
                    />

                    {/* Icon with subtle pulse */}
                    <div className="relative mb-6">
                      <div
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                          isHovered
                            ? "bg-gradient-to-br from-brand-magenta/15 via-brand-purple/15 to-brand-blue/15 shadow-lg shadow-brand-purple/15"
                            : "bg-gradient-to-br from-brand-light-magenta via-brand-light-purple to-brand-light-blue"
                        }`}
                      >
                        <Icon
                          className={`w-8 h-8 transition-all duration-300 ${
                            isHovered ? "text-brand-magenta" : "text-brand-purple"
                          }`}
                        />
                      </div>

                      {/* Subtle breathing glow */}
                      <div className={`absolute inset-0 w-16 h-16 rounded-2xl transition-all duration-700 ${isHovered ? "opacity-100" : "opacity-0"}`}>
                        <div className="w-full h-full rounded-2xl bg-gradient-to-br from-brand-magenta/15 to-brand-blue/15 blur-xl animate-pulse" style={{ animationDuration: "3s" }} />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className={`text-xl font-semibold mb-3 transition-all duration-300 ${isHovered ? "bg-gradient-to-r from-brand-magenta via-brand-purple to-brand-blue bg-clip-text text-transparent" : "text-foreground"}`}>
                      {capability.title}
                    </h3>
                    
                    {/* Interactive description */}
                    <div className="text-muted-foreground leading-relaxed">
                      <InteractiveText highlightWords={capability.keywords}>
                        {capability.description}
                      </InteractiveText>
                    </div>

                    {/* Corner glow */}
                    <div className={`absolute -bottom-8 -right-8 w-28 h-28 rounded-full transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}>
                      <div className="w-full h-full bg-gradient-to-tl from-brand-blue/15 via-brand-purple/8 to-transparent blur-2xl" />
                    </div>
                  </div>
                </IntelligentCard>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
