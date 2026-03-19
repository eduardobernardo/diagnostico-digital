"use client";

import { ArrowDown, Star, Users, Award } from "lucide-react";

interface HeroSectionProps {
  onCtaClick: () => void;
}

export function HeroSection({ onCtaClick }: HeroSectionProps) {
  return (
    <section className="relative min-h-[calc(100vh-var(--header-height))] overflow-hidden bg-[--dark-surface-primary] pb-10">
      <div className="absolute left-0 top-0 z-0 grid h-full w-full grid-cols-[clamp(28px,10vw,120px)_auto_clamp(28px,10vw,120px)] border-b border-white/10">
        <div className="col-span-1 flex h-full items-center justify-center" />
        <div className="col-span-1 flex h-full items-center justify-center border-x border-white/10" />
        <div className="col-span-1 flex h-full items-center justify-center" />
      </div>

      <figure className="pointer-events-none absolute -bottom-[70%] left-1/2 z-0 block aspect-square w-[520px] -translate-x-1/2 rounded-full bg-[#B3D235]/30 blur-[200px]" />
      <figure className="pointer-events-none absolute left-[4vw] top-[64px] z-20 hidden aspect-square w-[32vw] rounded-full bg-[#00C3DE]/20 blur-[100px] md:block" />
      <figure className="pointer-events-none absolute bottom-[-50px] right-[7vw] z-20 hidden aspect-square w-[30vw] rounded-full bg-[#B3D235]/15 blur-[100px] md:block" />

      <div className="relative z-10 flex flex-col divide-y divide-white/10 pt-[35px]">
        {/* Tag */}
        <div
          className="animate-fade-in-up flex flex-col items-center justify-end"
          style={{ animationDelay: "0ms" }}
        >
          <div className="flex items-center gap-2 !border !border-b-0 border-white/20 bg-white/5 px-4 py-2 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#B3D235] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#B3D235]"></span>
            </span>
            <p className="text-sm tracking-tight text-white/70">
              Consultoria Especializada em Marketing Digital
            </p>
          </div>
        </div>

        {/* Headline + Subtitle */}
        <div>
          <div className="mx-auto flex min-h-[288px] max-w-[80vw] shrink-0 flex-col items-center justify-center gap-4 px-2 py-8 sm:px-16 lg:px-24">
            <h1 className="!max-w-screen-lg text-pretty text-center text-[clamp(28px,6vw,56px)] font-bold leading-[1.1] tracking-[-1.44px] text-white md:tracking-[-2.16px]">
              <span className="animate-fade-in-up inline-block" style={{ animationDelay: "100ms" }}>
                Seu marketing digital{" "}
              </span>
              <span
                className="animate-fade-in-up inline-block text-[#B3D235]"
                style={{ animationDelay: "200ms" }}
              >
                gera resultado
              </span>
              <br className="hidden md:block" />
              <span className="animate-fade-in-up inline-block" style={{ animationDelay: "300ms" }}>
                {" "}
                ou só consome dinheiro todo mês?
              </span>
            </h1>
            <p
              className="text-md animate-fade-in-up max-w-2xl text-pretty text-center text-white/70 md:text-lg"
              style={{ animationDelay: "400ms" }}
            >
              Se você investe em anúncios, redes sociais ou marketing digital e não consegue dizer,
              com clareza, o que realmente traz retorno, o problema não é falta de esforço. É falta
              de <span className="font-semibold text-[#B3D235]">estratégia</span>.
            </p>
          </div>
        </div>

        {/* Highlight box — glassmorphism */}
        <div
          className="animate-fade-in-up flex items-center justify-center px-4 py-6"
          style={{ animationDelay: "450ms" }}
        >
          <div className="relative max-w-2xl overflow-hidden border border-[#B3D235]/20 bg-[#B3D235]/5 p-6 backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-[#B3D235]/10 via-transparent to-[#00C3DE]/5" />
            <p className="relative z-10 text-center text-lg text-white/80">
              Marketing sem diagnóstico não é crescimento.
              <br />É <span className="font-semibold text-[#B3D235]">desperdício</span> disfarçado
              de ação.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div
          className="animate-fade-in-up flex items-start justify-center px-8 pt-6 sm:px-24"
          style={{ animationDelay: "500ms" }}
        >
          <div className="flex w-full max-w-[80vw] flex-col items-center justify-start md:!max-w-[450px]">
            <button
              onClick={onCtaClick}
              className="group relative flex h-16 w-full items-center justify-center gap-2 bg-[#B3D235] text-base font-semibold text-[#212529] transition-all duration-300 hover:bg-[#c5e247] hover:shadow-xl hover:shadow-[#B3D235]/30"
            >
              <span className="absolute -inset-1 animate-pulse rounded-sm bg-[#B3D235]/20" />
              <ArrowDown className="relative z-10 h-5 w-5 transition-transform group-hover:translate-y-0.5" />
              <span className="relative z-10">Solicite o Diagnóstico Digital da Index</span>
            </button>
            <span className="mt-3 text-sm text-white/50">
              Descubra onde seu dinheiro está sendo mal investido
            </span>
          </div>
        </div>

        {/* Social proof badges — below CTA */}
        <div
          className="animate-fade-in-up flex items-center justify-center px-4 py-5"
          style={{ animationDelay: "650ms" }}
        >
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <Award className="size-4 text-[#B3D235]" />
              <span className="text-sm font-medium text-white/60">23+ Anos de Experiência</span>
            </div>
            <div className="hidden h-4 w-px bg-white/15 md:block" />
            <div className="flex items-center gap-2">
              <Users className="size-4 text-[#00C3DE]" />
              <span className="text-sm font-medium text-white/60">300+ Empresas Atendidas</span>
            </div>
            <div className="hidden h-4 w-px bg-white/15 md:block" />
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-3 fill-[#B3D235] text-[#B3D235]" />
                ))}
              </div>
              <span className="text-sm font-medium text-white/60">5.0 Avaliação</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
