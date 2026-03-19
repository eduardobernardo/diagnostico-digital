'use client'

import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FeatureCardProps {
  icon: LucideIcon
  text: string
  number?: number
  variant?: 'problem' | 'solution' | 'about'
  className?: string
}

export function FeatureCard({
  icon: Icon,
  text,
  number,
  variant = 'solution',
  className,
}: FeatureCardProps) {
  // Usando apenas cores da marca: #B3D235 (verde limão) e #00C3DE (ciano)
  const colorMap = {
    problem: {
      bg: 'bg-[#212529] dark:bg-[#212529]',
      border: 'border-white/10 dark:border-white/10',
      icon: 'text-[#00C3DE]',
      number: 'text-white/5',
      hoverBorder: 'hover:border-[#00C3DE]/40',
      glow: 'from-[#00C3DE]/10',
    },
    solution: {
      bg: 'bg-[--surface-secondary] dark:bg-[--dark-surface-secondary]',
      border: 'border-[--border] dark:border-[--dark-border]',
      icon: 'text-[#B3D235]',
      number: 'text-[#B3D235]/10',
      hoverBorder: 'hover:border-[#B3D235]/40',
      glow: 'from-[#B3D235]/10',
    },
    about: {
      bg: 'bg-[--surface-secondary] dark:bg-[--dark-surface-secondary]',
      border: 'border-[--border] dark:border-[--dark-border]',
      icon: 'text-[#00C3DE]',
      number: 'text-[#00C3DE]/10',
      hoverBorder: 'hover:border-[#00C3DE]/40',
      glow: 'from-[#00C3DE]/10',
    },
  }

  const colors = colorMap[variant]

  return (
    <article
      className={cn(
        'group relative overflow-hidden border p-5 transition-all duration-300',
        colors.bg,
        colors.border,
        colors.hoverBorder,
        'hover:shadow-md',
        className
      )}
    >
      {/* Background number */}
      {number && (
        <div
          className={cn(
            'absolute -right-4 -top-4 text-7xl font-bold select-none pointer-events-none transition-opacity duration-300',
            colors.number
          )}
        >
          {String(number).padStart(2, '0')}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-3">
        {/* Icon */}
        <div className={cn(
          'flex h-10 w-10 items-center justify-center',
          variant === 'problem' ? 'bg-white/5' : 'bg-[--surface-primary] dark:bg-[--dark-surface-primary]',
          'transition-transform duration-300 group-hover:scale-110'
        )}>
          <Icon className={cn('size-5', colors.icon)} />
        </div>

        {/* Text */}
        <p className={cn(
          'text-sm font-medium leading-snug',
          variant === 'problem' ? 'text-white/90' : 'text-[--text-primary] dark:text-[--dark-text-primary]'
        )}>
          {text}
        </p>
      </div>

      {/* Hover glow effect */}
      <div
        className={cn(
          'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300',
          'pointer-events-none bg-gradient-to-br to-transparent',
          colors.glow
        )}
      />
    </article>
  )
}
