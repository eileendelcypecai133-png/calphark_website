"use client"

import { useState } from "react"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"

const footerLinks = {
  Product: ["Features", "Pricing", "Integrations", "Changelog", "Roadmap"],
  Company: ["About", "Blog", "Careers", "Press", "Contact"],
  Resources: ["Documentation", "Tutorials", "Community", "Support", "Status"],
  Legal: ["Privacy", "Terms", "Security", "Cookies"],
}

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Mail, href: "#", label: "Email" },
]

export function Footer() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  return (
    <footer className="bg-foreground text-background pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-12 border-b border-background/10">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-8 lg:mb-0">
            <div className="flex items-center gap-2 mb-4 group cursor-pointer">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-pink to-brand-lavender rounded-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
                <div className="absolute inset-1 bg-foreground rounded-md flex items-center justify-center">
                  <span className="text-sm font-bold bg-gradient-to-r from-brand-pink to-brand-lavender bg-clip-text text-transparent">
                    L
                  </span>
                </div>
              </div>
              <span className="font-semibold text-background">Lovable</span>
            </div>
            <p className="text-sm text-background/60 mb-6 max-w-xs">
              Building the future of product development, one beautiful
              experience at a time.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center transition-all duration-300 hover:bg-gradient-to-br hover:from-brand-pink hover:to-brand-lavender hover:scale-110"
                >
                  <social.icon className="w-4 h-4 text-background" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-background mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="relative text-sm text-background/60 hover:text-background transition-colors duration-200 group"
                      onMouseEnter={() => setHoveredLink(`${category}-${link}`)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      <span
                        className={`transition-transform duration-200 inline-block ${
                          hoveredLink === `${category}-${link}`
                            ? "translate-x-1"
                            : ""
                        }`}
                      >
                        {link}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/40">
            © {new Date().getFullYear()} Lovable. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-background/40 hover:text-background/80 transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-background/40 hover:text-background/80 transition-colors duration-200"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
