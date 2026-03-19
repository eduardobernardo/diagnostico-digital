"use client";

import { AlertCircle, BarChart3, Layers, FileQuestion } from "lucide-react";
import { FeatureCard } from "./feature-card";

export function ProblemSection() {
  const problems = [
    { icon: Layers, text: "Muitos canais ativos" },
    { icon: BarChart3, text: "Várias ações acontecendo" },
    { icon: FileQuestion, text: "Relatórios cheios de números" },
    { icon: AlertCircle, text: "Pouca ou nenhuma clareza" },
  ];

  return (
    <section className="relative overflow-hidden bg-[--surface-primary] py-16 dark:bg-[--dark-surface-primary] md:py-24">
      {/* Blur decoration */}
      <figure className="pointer-events-none absolute -right-[10%] top-[20%] z-0 aspect-square w-[400px] rounded-full bg-[#00C3DE]/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-[1140px] px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-flex items-center gap-2 bg-[#B3D235]/15 px-4 py-2 text-sm font-semibold text-[#B3D235]">
            <AlertCircle className="size-4" />O Problema
          </span>

          <p className="text-lg leading-relaxed text-[--text-secondary] dark:text-white/85 md:text-xl">
            A maioria dos empresários não erra por falta de vontade.
            <br />
            Erra porque está cercada de{" "}
            <span className="font-semibold text-[--text-primary] dark:text-[--dark-text-primary]">
              execução sem direção
            </span>
            .
          </p>

          <h2 className="mt-10 text-2xl font-bold leading-tight text-[--text-primary] dark:text-[--dark-text-primary] md:text-4xl">
            O cenário costuma ser o mesmo:
          </h2>

          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {problems.map((problem, index) => (
              <FeatureCard
                key={index}
                icon={problem.icon}
                text={problem.text}
                number={index + 1}
                variant="problem"
              />
            ))}
          </div>

          {/* Highlighted box with animation */}
          <div className="relative mt-10 overflow-hidden border border-[#B3D235]/20 bg-[#B3D235]/5 p-6 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-[#B3D235]/10 via-transparent to-[#00C3DE]/5" />

            <p className="relative z-10 text-lg text-[--text-secondary] md:text-xl">
              E a pergunta mais importante segue sem resposta:
            </p>
            <p className="relative z-10 mt-3 text-xl font-bold text-[--text-primary] md:text-2xl">
              O que, de fato, está trazendo <span className="text-[#B3D235]">resultado</span>?
            </p>
            <p className="relative z-10 mt-4 text-[--text-tertiary]">
              Sem essa resposta, crescer vira aposta.
            </p>
          </div>
        </div>

        {/* Consequences */}
        <div className="mx-auto mt-16 max-w-3xl">
          <h3 className="mb-8 text-center text-xl font-bold text-[--text-primary] dark:text-[--dark-text-primary] md:text-2xl">
            Quando não há diagnóstico:
          </h3>

          <div className="space-y-4">
            {[
              "O marketing vira custo fixo",
              "Decisões são tomadas no escuro",
              "O orçamento escorre mês após mês",
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 border-l-4 border-[#B3D235] bg-[#B3D235]/5 p-4 dark:bg-[#B3D235]/10"
              >
                <AlertCircle className="size-5 shrink-0 text-[#B3D235]" />
                <span className="font-medium text-[--text-primary] dark:text-[--dark-text-primary]">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center leading-relaxed text-[--text-primary] dark:text-white/90">
            É nesse momento que o empresário começa a desacreditar do digital, quando, na verdade,
            nunca teve acesso ao marketing digital feito da{" "}
            <span className="font-semibold text-[#B3D235]">forma certa</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
