import { ReactNode } from "react";
import { cn } from "./ui/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "strong" | "subtle";
  background?: "helping-hands" | "volunteers" | "none";
  shine?: boolean;
}

export function GlassCard({ 
  children, 
  className, 
  variant = "default",
  background = "none",
  shine = false
}: GlassCardProps) {
  const baseClasses = "rounded-xl transition-all duration-300";
  
  const variantClasses = {
    default: "glass-card",
    strong: "glass",
    subtle: "glass-gradient backdrop-blur-sm border border-white/10"
  };

  const backgroundClasses = {
    "helping-hands": "bg-helping-hands bg-overlay",
    "volunteers": "bg-volunteers bg-overlay",
    "none": ""
  };

  const shineClass = shine ? "glass-shine" : "";

  return (
    <div 
      className={cn(
        baseClasses,
        variantClasses[variant],
        backgroundClasses[background],
        shineClass,
        className
      )}
    >
      {children}
    </div>
  );
}