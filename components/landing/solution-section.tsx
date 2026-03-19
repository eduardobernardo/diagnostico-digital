
import { CheckCircle2, TrendingUp, Target, LineChart } from "lucide-react";
import { FeatureCard } from "./feature-card";

export function SolutionSection() {
  const requirements = [
    { icon: LineChart, text: "Leitura correta dos dados" },
    { icon: Target, text: "Visão estratégica do negócio" },
    { icon: CheckCircle2, text: "Clareza sobre gargalos e oportunidades" },
  ];

  return (
    <section className="relative overflow-hidden bg-[--surface-secondary] py-16 dark:bg-[--dark-surface-secondary] md:py-24">
      {/* Blur decorations */}
      <figure className="pointer-events-none absolute -left-[10%] bottom-[10%] z-0 aspect-square w-[300px] rounded-full bg-[#B3D235]/10 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-[1140px] px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 bg-[#B3D235]/15 px-4 py-2">
            <TrendingUp className="size-4 text-[#B3D235]" />
            <span className="text-sm font-semibold text-[#B3D235]">A solução existe</span>
          </div>

          <h2 className="text-2xl font-bold leading-tight text-[--text-primary] dark:text-[--dark-text-primary] md:text-4xl">
            Marketing digital <span className="text-[#B3D235]">funciona</span>.
            <br />O que não funciona é executar antes de entender!
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-[--text-secondary] dark:text-white/85">
            Empresas que crescem com previsibilidade não investem mais,{" "}
            <span className="font-semibold text-[--text-primary] dark:text-white">
              investem melhor
            </span>
            .
          </p>

          <p className="mt-4 text-lg leading-relaxed text-[--text-secondary] dark:text-white/85">
            E isso só acontece quando existe:
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {requirements.map((req, index) => (
              <FeatureCard
                key={index}
                icon={req.icon}
                text={req.text}
                number={index + 1}
                variant="solution"
              />
            ))}
          </div>

          {/* Highlighted box */}
          <div className="relative mt-10 overflow-hidden border border-[#B3D235]/20 bg-[#B3D235]/5 p-6 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-[#B3D235]/10 via-transparent to-[#00C3DE]/5" />
            <p className="relative z-10 text-xl font-semibold text-[--text-primary]">
              Sem diagnóstico, não existe <span className="text-[#B3D235]">escala sustentável</span>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
