import { ArrowDown, Star, Users, TrendingUp } from "lucide-react";
import { ScrollButton } from "./scroll-button";

export function HeroSection() {
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
              Diagnóstico Gratuito de Marketing Digital
            </p>
          </div>
        </div>

        <div>
          <div className="mx-auto flex min-h-[288px] max-w-[80vw] shrink-0 flex-col items-center justify-center gap-4 px-2 py-8 sm:px-16 lg:px-24">
            <h1 className="!max-w-screen-lg text-pretty text-center text-[clamp(28px,6vw,56px)] font-bold leading-[1.1] tracking-[-1.44px] text-white md:tracking-[-2.16px]">
              <span className="animate-fade-in-up inline-block">Seu marketing</span>{" "}
              <span
                className="animate-fade-in-up inline-block text-[#B3D235]"
                style={{ animationDelay: "200ms" }}
              >
                traz cliente
              </span>
              <br className="hidden md:block" />
              <span className="animate-fade-in-up inline-block" style={{ animationDelay: "300ms" }}>
                {" "}
                ou só traz relatório?
              </span>
            </h1>
            <p
              className="text-md animate-fade-in-up max-w-2xl text-pretty text-center text-white/70 md:text-lg"
              style={{ animationDelay: "400ms" }}
            >
              Você investe em anúncios, redes sociais e campanhas, mas não sabe o que realmente traz
              cliente? Em 48 horas, nosso diagnóstico mostra exatamente onde está o{" "}
              <span className="font-semibold text-[#B3D235]">vazamento</span>.
            </p>
          </div>
        </div>

        <div
          className="animate-fade-in-up flex items-center justify-center px-4 py-6"
          style={{ animationDelay: "550ms" }}
        >
          <div className="relative w-full max-w-2xl overflow-hidden border border-white/5 bg-white/[0.02] p-6 backdrop-blur-md">
            <div className="absolute inset-0 bg-gradient-to-br from-[#B3D235]/5 via-transparent to-[#00C3DE]/5" />

            <div className="relative z-10 flex flex-col items-center justify-center gap-10 sm:flex-row sm:gap-0">
              {/* Lado Ruim */}
              <div className="flex flex-col items-center text-center sm:flex-1">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5">
                  <span className="text-sm font-bold text-white/30">✕</span>
                </div>
                <div className="mt-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/30">
                    Sem Diagnóstico
                  </p>
                  <p className="mt-1 text-lg font-medium text-white/60">Dinheiro no escuro</p>
                </div>
              </div>

              {/* Divisor Desktop */}
              <div className="hidden h-12 w-px bg-white/10 sm:mx-12 sm:block" />

              {/* Lado Bom */}
              <div className="flex flex-col items-center text-center sm:flex-1">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#B3D235]/20">
                  <span className="text-sm font-bold text-[#B3D235]">✓</span>
                </div>
                <div className="mt-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#B3D235]/70">
                    Com Diagnóstico
                  </p>
                  <p className="mt-1 text-lg font-bold text-white">Escala com previsibilidade</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="animate-fade-in-up flex items-start justify-center px-8 pt-4 sm:px-24"
          style={{ animationDelay: "450ms" }}
        >
          <div className="flex w-full max-w-[80vw] flex-col items-center justify-start md:!max-w-[500px]">
            <ScrollButton className="overflow-visible">
              <span className="absolute -inset-1 animate-pulse rounded-sm bg-[#B3D235]/20" />
              {/* <ArrowDown className="relative z-10 h-5 w-5 transition-transform group-hover:translate-y-0.5" /> */}
              <span className="relative z-10">Quero meu diagnóstico gratuito →</span>
            </ScrollButton>
            <span className="mt-3 text-center text-sm text-white/50">
              Cada semana sem clareza é mais uma semana pagando por resultado que não vem
            </span>
          </div>
        </div>

        <div
          className="animate-fade-in-up flex items-center justify-center px-4 py-5"
          style={{ animationDelay: "650ms" }}
        >
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-3 fill-[#B3D235] text-[#B3D235]" />
                ))}
              </div>
              <span className="text-sm font-medium text-white/60">5.0 no Google</span>
            </div>
            <div className="hidden h-4 w-px bg-white/15 md:block" />
            <div className="flex items-center gap-2">
              <Users className="size-4 text-[#00C3DE]" />
              <span className="text-sm font-medium text-white/60">300+ empresas atendidas</span>
            </div>
            <div className="hidden h-4 w-px bg-white/15 md:block" />
            <div className="flex items-center gap-2">
              <TrendingUp className="size-4 text-[#B3D235]" />
              <span className="text-sm font-medium text-white/60">23 anos de resultado</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
