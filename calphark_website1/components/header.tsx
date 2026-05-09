"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-pink to-brand-lavender rounded-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
              <div className="absolute inset-1 bg-background rounded-md flex items-center justify-center">
                <span className="text-sm font-bold bg-gradient-to-r from-brand-pink to-brand-lavender bg-clip-text text-transparent">L</span>
              </div>
            </div>
            <span className="font-semibold text-foreground">Lovable</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {["Product", "Solutions", "Pricing", "Resources"].map((item) => (
              <a
                key={item}
                href="#"
                className="relative text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-pink to-brand-lavender transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
              Log in
            </Button>
            <Button className="relative bg-gradient-to-r from-brand-pink to-brand-lavender hover:opacity-90 text-primary-foreground border-0 transition-all duration-300 hover:shadow-lg hover:shadow-brand-pink/25 hover:-translate-y-0.5">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border/50 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col p-4 gap-3">
            {["Product", "Solutions", "Pricing", "Resources"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                {item}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-3 border-t border-border/50">
              <Button variant="ghost" className="justify-start">Log in</Button>
              <Button className="bg-gradient-to-r from-brand-pink to-brand-lavender text-primary-foreground border-0">
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
