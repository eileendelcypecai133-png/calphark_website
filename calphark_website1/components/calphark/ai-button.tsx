"use client"

import { ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface AIButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
}

export const AIButton = forwardRef<HTMLButtonElement, AIButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const sizeClasses = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    }

    const baseClasses = `
      relative overflow-hidden font-medium rounded-lg
      transition-all duration-300 ease-out
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-purple
      disabled:opacity-50 disabled:cursor-not-allowed
      group
    `

    if (variant === "primary") {
      return (
        <button
          ref={ref}
          className={cn(
            baseClasses,
            sizeClasses[size],
            "bg-gradient-to-r from-brand-magenta via-brand-purple to-brand-blue text-white",
            "hover:shadow-[0_0_30px_rgba(233,30,140,0.4),0_0_60px_rgba(139,75,158,0.3)]",
            "hover:scale-[1.02] active:scale-[0.98]",
            className
          )}
          {...props}
        >
          {/* Animated border */}
          <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="absolute inset-[-2px] rounded-lg bg-gradient-to-r from-brand-magenta via-brand-purple to-brand-blue animate-border-flow" />
          </span>
          
          {/* Shimmer effect */}
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          {/* Scan line */}
          <span className="absolute inset-0 overflow-hidden rounded-lg opacity-0 group-hover:opacity-100">
            <span className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent animate-scan-line" />
          </span>
          
          {/* Content */}
          <span className="relative z-10 flex items-center justify-center gap-2">
            {children}
          </span>
          
          {/* Corner accents */}
          <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/30 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/30 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/30 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/30 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      )
    }

    if (variant === "secondary") {
      return (
        <button
          ref={ref}
          className={cn(
            baseClasses,
            sizeClasses[size],
            "bg-white/80 backdrop-blur-sm text-foreground border border-brand-purple/20",
            "hover:bg-gradient-to-r hover:from-brand-light-magenta hover:via-brand-light-purple hover:to-brand-light-blue",
            "hover:border-brand-purple/40 hover:shadow-lg",
            "hover:scale-[1.02] active:scale-[0.98]",
            className
          )}
          {...props}
        >
          {/* Shimmer effect */}
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-brand-magenta/10 to-transparent" />
          
          {/* Content */}
          <span className="relative z-10 flex items-center justify-center gap-2">
            {children}
          </span>
        </button>
      )
    }

    // Outline variant
    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          sizeClasses[size],
          "bg-transparent text-foreground",
          "border-2 border-transparent bg-clip-padding",
          "before:absolute before:inset-0 before:rounded-lg before:p-[2px]",
          "before:bg-gradient-to-r before:from-brand-magenta before:via-brand-purple before:to-brand-blue",
          "before:-z-10 before:content-['']",
          "after:absolute after:inset-[2px] after:rounded-[6px] after:bg-white after:-z-10 after:content-['']",
          "hover:after:bg-gradient-to-r hover:after:from-brand-light-magenta hover:after:via-brand-light-purple hover:after:to-brand-light-blue",
          "hover:shadow-[0_0_20px_rgba(233,30,140,0.3),0_0_40px_rgba(139,75,158,0.2)]",
          "hover:scale-[1.02] active:scale-[0.98]",
          className
        )}
        {...props}
      >
        {/* Shimmer effect */}
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-brand-purple/20 to-transparent rounded-lg" />
        
        {/* Content */}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
      </button>
    )
  }
)

AIButton.displayName = "AIButton"
