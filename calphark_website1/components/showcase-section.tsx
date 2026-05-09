"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

const showcaseItems = [
  {
    title: "Dashboard Analytics",
    description: "Real-time insights and metrics visualization",
    category: "Analytics",
  },
  {
    title: "Team Collaboration",
    description: "Seamless communication and project management",
    category: "Productivity",
  },
  {
    title: "Smart Workflows",
    description: "Automated processes powered by AI",
    category: "Automation",
  },
]

export function ShowcaseSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const sectionTop = rect.top
      const sectionHeight = rect.height

      const progress = Math.max(
        0,
        Math.min(1, (viewportHeight - sectionTop) / (viewportHeight + sectionHeight))
      )
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 relative overflow-hidden">
      {/* Animated Background */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-brand-pink/5 via-transparent to-brand-lavender/5"
        style={{
          transform: `translateX(${scrollProgress * 100 - 50}%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-block text-sm font-medium text-brand-pink mb-4 tracking-wide uppercase">
              Showcase
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              See what&apos;s possible with our platform
            </h2>
            <p className="text-lg text-muted-foreground mb-8 text-pretty leading-relaxed">
              From startups to enterprises, teams around the world use our tools
              to build exceptional products. Explore what you can create.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-brand-pink to-brand-lavender hover:opacity-90 text-primary-foreground border-0 transition-all duration-300 hover:shadow-lg hover:shadow-brand-pink/25"
              >
                <Play className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
                Watch Video
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group hover:border-brand-pink/50 hover:bg-brand-pink/5 transition-all duration-300"
              >
                Explore Gallery
                <ArrowUpRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </div>
          </div>

          {/* Right Cards */}
          <div className="space-y-4">
            {showcaseItems.map((item, index) => (
              <div
                key={item.title}
                className="group relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className={`relative p-6 rounded-2xl bg-background border border-border/50 transition-all duration-500 cursor-pointer ${
                    hoveredIndex === index
                      ? "border-brand-pink/50 shadow-xl shadow-brand-pink/10 scale-[1.02]"
                      : "hover:border-border"
                  }`}
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-4">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-medium rounded-full transition-colors duration-300 ${
                        hoveredIndex === index
                          ? "bg-brand-pink/10 text-brand-pink"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {item.category}
                    </span>
                    <ArrowUpRight
                      className={`w-5 h-5 transition-all duration-300 ${
                        hoveredIndex === index
                          ? "text-brand-pink translate-x-0.5 -translate-y-0.5"
                          : "text-muted-foreground"
                      }`}
                    />
                  </div>

                  {/* Card Content */}
                  <h3
                    className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                      hoveredIndex === index
                        ? "text-brand-pink"
                        : "text-foreground"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>

                  {/* Animated Preview Bar */}
                  <div className="mt-4 h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r from-brand-pink to-brand-lavender rounded-full transition-all duration-700 ease-out ${
                        hoveredIndex === index ? "w-full" : "w-0"
                      }`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
