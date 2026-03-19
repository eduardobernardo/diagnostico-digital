"use client";

import { CheckCircle2, Lightbulb } from "lucide-react";

export function DiagnosticSection() {
  const benefits = [
    "Onde sua empresa está perdendo dinheiro",
    "O que impede o aumento das conversões",
    "Quais canais realmente funcionam",
    "Onde faz sentido investir",
    "O que precisa ser corrigido antes de escalar",
  ];

  return (
    <section className="relative overflow-hidden bg-[--surface-secondary] py-16 dark:bg-[--dark-surface-secondary] md:py-24">
      {/* Blur decorations */}
      <figure className="pointer-events-none absolute left-[10%] top-[20%] z-0 aspect-square w-[300px] rounded-full bg-[#00C3DE]/10 blur-[100px]" />
      <figure className="pointer-events-none absolute bottom-[10%] right-[5%] z-0 aspect-square w-[250px] rounded-full bg-[#B3D235]/10 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-[1140px] px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 bg-[#00C3DE]/15 px-4 py-2">
            <Lightbulb className="size-4 text-[#00C3DE]" />
            <span className="text-sm font-semibold text-[#00C3DE]">A metodologia</span>
          </div>

          <h2 className="text-2xl font-bold leading-tight text-[--text-primary] dark:text-[--dark-text-primary] md:text-4xl">
            O <span className="text-[#B3D235]">Diagnóstico Digital</span> é o ponto de partida de
            tudo.
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-[--text-secondary] dark:text-white/85">
            Ele analisa, de forma estratégica:
          </p>

          <div className="mt-8 space-y-3 text-left">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group flex items-center gap-3 border border-[--border] bg-[--surface-primary] p-4 shadow-sm transition-all duration-300 [box-shadow:_70px_-20px_130px_0px_rgba(179,210,53,0.03)_inset] hover:border-[#B3D235]/50 hover:shadow-md dark:border-[--dark-border] dark:bg-[--dark-surface-primary]"
              >
                <CheckCircle2 className="size-5 shrink-0 text-[#B3D235]" />
                <span className="text-[--text-secondary] dark:text-white/85">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Highlighted box */}
          <div className="relative mt-10 overflow-hidden border border-[#B3D235]/20 bg-[#B3D235]/5 p-6 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-[#B3D235]/10 via-transparent to-[#00C3DE]/5" />
            <p className="relative z-10 text-[--text-secondary]">Não é um relatório genérico.</p>
            <p className="relative z-10 mt-2 text-xl font-bold text-[--text-primary]">
              É um mapa claro para <span className="text-[#B3D235]">decisões inteligentes</span>.
            </p>
          </div>

          <p className="mt-8 text-lg font-semibold text-[--text-primary] dark:text-[--dark-text-primary]">
            É assim que a Index transforma marketing em{" "}
            <span className="text-[#B3D235]">investimento</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
