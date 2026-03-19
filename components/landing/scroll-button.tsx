"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ScrollButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "header";
  children: React.ReactNode;
}

export const ScrollButton = forwardRef<HTMLButtonElement, ScrollButtonProps>(
  ({ variant = "primary", className, children, ...props }, ref) => {
    const handleClick = () => {
      document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
    };

    if (variant === "header") {
      return (
        <button
          ref={ref}
          onClick={handleClick}
          className={cn(
            "bg-[#B3D235] px-5 py-2.5 text-sm font-semibold text-[#212529] transition-all duration-300 hover:bg-[#c5e247] hover:shadow-lg hover:shadow-[#B3D235]/20",
            className,
          )}
          {...props}
        >
          {children}
        </button>
      );
    }

    return (
      <button
        ref={ref}
        onClick={handleClick}
        className={cn(
          "group relative flex h-16 w-full items-center justify-center gap-2 bg-[#B3D235] text-base font-semibold text-[#212529] transition-all duration-300 hover:bg-[#c5e247] hover:shadow-xl hover:shadow-[#B3D235]/30",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

ScrollButton.displayName = "ScrollButton";
