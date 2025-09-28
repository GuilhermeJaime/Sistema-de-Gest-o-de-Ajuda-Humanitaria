import { ReactNode } from "react";
import { Button } from "./ui/button";
import { cn } from "./ui/utils";

interface GlassButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export function GlassButton({ 
  children, 
  className, 
  variant = "default",
  size = "default",
  onClick,
  disabled,
  type = "button",
  ...props 
}: GlassButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={cn(
        "glass-button glass-shine",
        "text-white border-white/20",
        "hover:text-white hover:border-white/30",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}