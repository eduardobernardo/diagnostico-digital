"use client"

import { Linkedin, Instagram } from "lucide-react"

export function LandingFooter() {
  return (
    <footer className="border-t border-white/10 bg-[--dark-surface-primary] py-6">
      <div className="mx-auto flex max-w-[1140px] flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-white">
            INDE<span className="text-[#B3D235]">X</span>
          </span>
          <span className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Todos os direitos reservados.
          </span>
        </div>

        {/* Social */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="flex size-8 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors hover:border-[#B3D235]/50 hover:text-[#B3D235]"
            aria-label="LinkedIn"
          >
            <Linkedin className="size-4" />
          </a>
          <a
            href="#"
            className="flex size-8 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors hover:border-[#B3D235]/50 hover:text-[#B3D235]"
            aria-label="Instagram"
          >
            <Instagram className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
