"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "secondary" | "outline"
  }
>(({ className, variant = "default", ...props }, ref) => (
  <div
    ref={ref}
    role="status"
    className={cn(
      "inline-flex items-center rounded-md border px-1.5 py-0.5 text-xs font-medium ring-inset focus:outline-none focus:ring-2 focus:ring-ring",
      variant === "default" &&
        "border-primary bg-primary/10 text-primary ring-primary/20",
      variant === "secondary" &&
        "border-secondary bg-secondary/10 text-secondary ring-secondary/20",
      variant === "outline" && "border-input bg-background text-foreground",
      className
    )}
    {...props}
  />
))
Badge.displayName = "Badge"

export { Badge }
