
import { TrendingUp, Target, LineChart, Search } from "lucide-react";
import { FeatureCard } from "./feature-card";

export function SolutionSection() {
  const requirements = [
    {
      icon: LineChart,
      text: "Leitura correta dos dados",
      detail: "Saber exatamente qual canal traz resultado (e qual é desperdício)",
    },
    {
      icon: Target,
      text: "Direção estratégica",
      detail: 'Decisões baseadas em fatos, não em "acho que..."',
    },
    {
      icon: Search,
      text: "Clareza total",
      detail: "Gargalos identificados, oportunidades mapeadas, próximos passos definidos",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[--surface-secondary] py-16 dark:bg-[--dark-surface-secondary] md:py-24">
      {/* Blur decorations */}
      <figure className="pointer-events-none absolute -left-[10%] bottom-[10%] z-0 aspect-square w-[300px] rounded-full bg-[#B3D235]/10 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-[1140px] px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 bg-[#B3D235]/15 px-4 py-2">
            <TrendingUp className="size-4 text-[#4d5b17] dark:text-[#B3D235]" />
            <span className="text-sm font-semibold text-[#4d5b17] dark:text-[#B3D235]">
              A solução: executar com o mapa na mão
            </span>
          </div>

          <h2 className="text-2xl font-bold leading-tight text-[--text-primary] dark:text-[--dark-text-primary] md:text-4xl">
            Marketing digital <span className="text-[#B3D235]">funciona</span> sim.
            <br />O erro é tentar escalar antes de saber o que escalar.
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-[--text-secondary] dark:text-white/85">
            Empresas que crescem com previsibilidade não fazem mais coisas.
            <br />
            Elas fazem{" "}
            <span className="font-semibold text-[--text-primary] dark:text-white">
              as coisas certas
            </span>
            , baseadas em dados claros.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-[--text-secondary] dark:text-white/85">
            Isso só acontece quando você tem:
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {requirements.map((req, index) => (
              <FeatureCard
                key={index}
                icon={req.icon}
                text={req.text}
                detail={req.detail}
                number={index + 1}
                variant="solution"
              />
            ))}
          </div>

          {/* Highlighted box */}
          <div className="relative mt-10 overflow-hidden border border-[#B3D235]/20 bg-[#B3D235]/5 p-6 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-[#B3D235]/10 via-transparent to-[#00C3DE]/5" />
            <p className="relative z-10 text-[--text-secondary]">
              Sem diagnóstico, você escala o erro junto com o acerto.
            </p>
            <p className="relative z-10 mt-2 text-xl font-bold text-[--text-primary]">
              Com diagnóstico, você escala{" "}
              <span className="text-[#B3D235]">só o que funciona</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
