"use client"

import { useState } from "react"
import {
  Building2,
  HeartPulse,
  Factory,
  Landmark,
  ShoppingCart,
  Truck,
} from "lucide-react"
import { ScrollReveal, HoverEffect } from "./scroll-reveal"

const industries = [
  {
    icon: HeartPulse,
    title: "Healthcare",
    description:
      "AI-powered diagnostics, patient care optimization, and clinical decision support systems.",
  },
  {
    icon: Landmark,
    title: "Finance",
    description:
      "Risk assessment, fraud detection, and intelligent trading systems for modern finance.",
  },
  {
    icon: Factory,
    title: "Manufacturing",
    description:
      "Predictive maintenance, quality control, and supply chain optimization solutions.",
  },
  {
    icon: Building2,
    title: "Real Estate",
    description:
      "Market analysis, property valuation, and smart building management systems.",
  },
  {
    icon: ShoppingCart,
    title: "Retail",
    description:
      "Customer behavior analytics, inventory optimization, and personalized experiences.",
  },
  {
    icon: Truck,
    title: "Logistics",
    description:
      "Route optimization, demand forecasting, and autonomous fleet management.",
  },
]

export function CalpharkIndustries() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="industries" className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <ScrollReveal delay={0} direction="up">
            <span className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-brand-magenta/10 via-brand-purple/10 to-brand-blue/10 border border-brand-purple/20 transition-all duration-500 hover:border-brand-purple/40">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-magenta to-brand-purple animate-pulse" />
              <span className="bg-gradient-to-r from-brand-magenta via-brand-purple to-brand-blue bg-clip-text text-transparent">
                Industries We Serve
              </span>
            </span>
          </ScrollReveal>
          <ScrollReveal delay={100} direction="up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              Tailored Solutions for{" "}
              <span className="bg-gradient-to-r from-brand-magenta via-brand-purple to-brand-blue bg-clip-text text-transparent">
                Every Sector
              </span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200} direction="up">
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI expertise spans across diverse industries, delivering customized
              solutions that address unique challenges and unlock new opportunities.
            </p>
          </ScrollReveal>
        </div>

        {/* Industry Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {industries.map((industry, index) => {
            const Icon = industry.icon
            const isHovered = hoveredIndex === index

            return (
              <ScrollReveal
                key={industry.title}
                delay={100 + index * 80}
                direction="up"
              >
                <HoverEffect intensity="medium">
                  <div
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="group relative p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-brand-purple/10 transition-all duration-500 cursor-pointer overflow-hidden h-full hover:shadow-2xl hover:shadow-brand-purple/15 hover:border-brand-purple/30"
                  >
                    {/* Hover gradient background */}
                    <div className={`absolute inset-0 transition-all duration-700 ${isHovered ? "bg-gradient-to-br from-brand-magenta/8 via-brand-purple/5 to-brand-blue/8" : "bg-transparent"}`} />

                    {/* Animated border gradient */}
                    <div className={`absolute inset-0 rounded-2xl transition-all duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}>
                      <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br from-brand-magenta via-brand-purple to-brand-blue animate-border-flow bg-[length:200%_200%]" />
                      <div className="absolute inset-[1px] rounded-2xl bg-white/95" />
                    </div>

                    {/* Scan line effect */}
                    <div className={`absolute inset-0 overflow-hidden rounded-2xl transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}>
                      <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-brand-magenta/40 to-transparent animate-scan-line" />
                    </div>

                    {/* Icon */}
                    <div className="relative mb-6">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 ${isHovered ? "bg-gradient-to-br from-brand-magenta/20 via-brand-purple/20 to-brand-blue/20 scale-110 shadow-lg shadow-brand-purple/20" : "bg-gradient-to-br from-brand-light-magenta via-brand-light-purple to-brand-light-blue"}`}>
                        <Icon className={`w-7 h-7 transition-all duration-300 ${isHovered ? "text-brand-magenta" : "text-brand-purple"}`} />
                      </div>
                      {/* Glow effect */}
                      <div className={`absolute inset-0 w-14 h-14 rounded-xl blur-xl transition-all duration-500 ${isHovered ? "bg-gradient-to-br from-brand-magenta/30 to-brand-blue/30" : "bg-transparent"}`} />
                    </div>

                    {/* Content */}
                    <h3 className={`relative text-xl font-semibold mb-3 transition-all duration-300 ${isHovered ? "bg-gradient-to-r from-brand-magenta via-brand-purple to-brand-blue bg-clip-text text-transparent" : "text-foreground"}`}>
                      {industry.title}
                    </h3>
                    <p className="relative text-muted-foreground leading-relaxed">
                      {industry.description}
                    </p>

                    {/* Neural network dots */}
                    <div className={`absolute top-4 right-4 transition-all duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}>
                      <div className="flex gap-1.5">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="w-1.5 h-1.5 rounded-full animate-neural-pulse"
                            style={{ 
                              animationDelay: `${i * 200}ms`,
                              background: i === 0 ? "#E91E8C" : i === 1 ? "#8B4B9E" : "#2B6CB0"
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Corner accent */}
                    <div className={`absolute bottom-0 right-0 w-20 h-20 transition-all duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}>
                      <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-brand-blue/10 via-brand-purple/5 to-transparent rounded-br-2xl" />
                    </div>

                    {/* Data flow lines */}
                    <svg className={`absolute bottom-4 left-4 w-12 h-12 transition-opacity duration-500 ${isHovered ? "opacity-30" : "opacity-0"}`} viewBox="0 0 48 48">
                      <path
                        d="M4 44 L44 4"
                        stroke="url(#industryGradient)"
                        strokeWidth="1"
                        fill="none"
                        strokeDasharray="4,4"
                        className="animate-pulse"
                      />
                      <path
                        d="M4 34 L34 4"
                        stroke="url(#industryGradient)"
                        strokeWidth="1"
                        fill="none"
                        strokeDasharray="4,4"
                        className="animate-pulse"
                        style={{ animationDelay: "0.5s" }}
                      />
                      <defs>
                        <linearGradient id="industryGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#E91E8C" />
                          <stop offset="50%" stopColor="#8B4B9E" />
                          <stop offset="100%" stopColor="#2B6CB0" />
                        </linearGradient>
                      </defs>
                    </svg>
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
