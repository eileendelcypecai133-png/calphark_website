"use client"

import Link from "next/link"
import Image from "next/image"
import { Linkedin, Twitter } from "lucide-react"

const footerLinks = {
  Solutions: [
    "Machine Learning",
    "Predictive Analytics",
    "Process Automation",
    "Data Intelligence",
  ],
  Industries: [
    "Healthcare",
    "Finance",
    "Manufacturing",
    "Retail",
    "Logistics",
  ],
  Company: [
    "About Us",
    "Careers",
    "Press",
    "Partners",
  ],
  Resources: [
    "Documentation",
    "Case Studies",
    "Blog",
    "Support",
  ],
}

export function CalpharkFooter() {
  return (
    <footer className="bg-gradient-to-b from-brand-light-purple/20 via-brand-light-magenta/10 to-background border-t border-brand-purple/10 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="footer-grid"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1" fill="#8B4B9E" opacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative w-12 h-12 transition-all duration-500 group-hover:scale-110">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-magenta via-brand-purple to-brand-blue rounded-full blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                <Image
                  src="/calphark.png"
                  alt="Calphark"
                  fill
                  className="object-contain relative z-10"
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
            <p className="text-muted-foreground mb-6 max-w-sm leading-relaxed">
              Guided by intelligence, driven by purpose. We deliver enterprise
              AI solutions that transform businesses across industries.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Twitter, href: "#", label: "Twitter" },
              ].map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="group/social relative w-10 h-10 rounded-full bg-white/80 border border-brand-purple/10 flex items-center justify-center text-muted-foreground transition-all duration-300 hover:shadow-lg hover:shadow-brand-purple/20 overflow-hidden"
                  >
                    {/* Gradient background on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-magenta via-brand-purple to-brand-blue opacity-0 group-hover/social:opacity-100 transition-opacity duration-300" />
                    <Icon className="w-5 h-5 relative z-10 transition-colors duration-300 group-hover/social:text-white" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4 bg-gradient-to-r from-brand-magenta via-brand-purple to-brand-blue bg-clip-text text-transparent">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="group/link relative text-sm text-muted-foreground transition-all duration-300 hover:text-foreground"
                    >
                      <span className="relative">
                        {link}
                        <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-brand-magenta to-brand-blue transition-all duration-300 group-hover/link:w-full" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-brand-purple/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Calphark. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="group/legal relative text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span className="relative">
                    {item}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-brand-magenta to-brand-purple transition-all duration-300 group-hover/legal:w-full" />
                  </span>
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
