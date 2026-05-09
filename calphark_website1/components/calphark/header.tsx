"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { AIButton } from "./ai-button"

const navItems = [
  { label: "Solutions", href: "#solutions" },
  { label: "Industries", href: "#industries" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
]

export function CalpharkHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-xl shadow-lg shadow-brand-purple/5 border-b border-brand-purple/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 transition-all duration-500 group-hover:scale-110">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-magenta via-brand-purple to-brand-blue rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
              <Image
                src="/calphark.png"
                alt="Calphark"
                fill
                className="object-contain relative z-10 drop-shadow-lg"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-brand-magenta via-brand-purple to-brand-blue bg-clip-text text-transparent">
                Calphark
              </span>
              <span className="text-[10px] text-muted-foreground tracking-widest uppercase">
                Intelligence Driven
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-foreground group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="relative z-10">{item.label}</span>
                
                {/* Hover background */}
                <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-brand-magenta/0 via-brand-purple/0 to-brand-blue/0 transition-all duration-300 group-hover:from-brand-magenta/5 group-hover:via-brand-purple/5 group-hover:to-brand-blue/5" />
                
                {/* Animated underline */}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-brand-magenta via-brand-purple to-brand-blue transition-all duration-300 group-hover:w-full rounded-full" />
                
                {/* Glow dot */}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-magenta opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[2px]" />
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="#contact"
              className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 group"
            >
              <span>Sign In</span>
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-brand-magenta to-brand-purple transition-all duration-300 group-hover:w-full" />
            </Link>
            <AIButton variant="primary" size="sm">
              Get Started
            </AIButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative p-2 text-foreground group"
            aria-label="Toggle menu"
          >
            <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-brand-magenta/0 to-brand-blue/0 group-hover:from-brand-magenta/10 group-hover:to-brand-blue/10 transition-all duration-300" />
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-brand-purple/10 bg-background/95 backdrop-blur-xl">
            <nav className="flex flex-col gap-2">
              {navItems.map((item, index) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-brand-magenta/5 hover:via-brand-purple/5 hover:to-brand-blue/5 hover:pl-6"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col gap-3 mt-4 px-4">
                <Link
                  href="#contact"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 text-center"
                >
                  Sign In
                </Link>
                <AIButton variant="primary" size="md" className="w-full">
                  Get Started
                </AIButton>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
