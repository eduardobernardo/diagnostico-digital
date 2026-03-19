"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollButton } from "./scroll-button";

export function LandingHeaderClient() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 h-[var(--header-height)] border-b transition-all duration-300",
        scrolled
          ? "border-[#212529]/80 bg-[#212529]/95 shadow-lg shadow-black/20 backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-full max-w-[1140px] items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-white drop-shadow-sm">
            INDE<span className="text-[#B3D235]">X</span>
          </span>
          <span className="ml-1 hidden border-l border-white/30 pl-2 text-xs text-white/80 sm:inline">
            Digital Commerce
          </span>
        </div>

        <ScrollButton variant="header">Quero meu diagnóstico →</ScrollButton>
      </div>
    </header>
  );
}
