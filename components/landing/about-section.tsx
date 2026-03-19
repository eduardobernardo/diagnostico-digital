
import { Building2, Users, BarChart2 } from "lucide-react";
import { FeatureCard } from "./feature-card";

export function AboutSection() {
  const stats = [
    { icon: Building2, label: "Anos de experiência" },
    { icon: Users, label: "Empresas atendidas" },
    { icon: BarChart2, label: "Foco em resultados" },
  ];

  return (
    <section className="relative overflow-hidden bg-[--surface-primary] py-16 dark:bg-[--dark-surface-primary] md:py-24">
      {/* Blur decorations */}
      <figure className="pointer-events-none absolute right-[5%] top-[10%] z-0 aspect-square w-[350px] rounded-full bg-[#B3D235]/10 blur-[120px]" />
      <figure className="pointer-events-none absolute -left-[5%] bottom-[10%] z-0 aspect-square w-[250px] rounded-full bg-[#00C3DE]/10 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-[1140px] px-6">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <span className="mb-4 inline-flex items-center gap-2 bg-[#00C3DE]/15 px-4 py-2 text-sm font-semibold text-[#00C3DE]">
              <Building2 className="size-4" />
              Quem Somos
            </span>
          </div>

          <p className="text-center text-lg leading-relaxed text-[--text-secondary] dark:text-white/85">
            Foi exatamente por ver esse cenário se repetir, em empresas de diferentes portes e
            setores, que a Index{" "}
            <span className="font-semibold text-[--text-primary] dark:text-white">
              construiu sua metodologia
            </span>
            .
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {stats.map((stat, index) => (
              <FeatureCard
                key={index}
                icon={stat.icon}
                text={stat.label}
                number={index + 1}
                variant="about"
              />
            ))}
          </div>

          <div className="mt-10 space-y-6 text-center">
            <p className="text-lg text-[--text-secondary] dark:text-white/85">
              Há mais de{" "}
              <span className="font-bold text-[--text-primary] dark:text-[--dark-text-primary]">
                23 anos
              </span>
              , a Index ajuda empresas a pararem de adivinhar e começarem a decidir com base em{" "}
              <span className="font-semibold text-[#B3D235]">
                dados, estratégia e visão de negócio
              </span>
              .
            </p>

            <p className="text-xl font-semibold text-[--text-primary] dark:text-[--dark-text-primary]">
              Aqui, o marketing não começa com promessa.
              <br />
              <span className="text-[#B3D235]">Começa com diagnóstico.</span>
            </p>
          </div>

          {/* Dark box with animations */}
          <article className="relative mt-10 overflow-hidden border border-[#00C3DE]/20 bg-[#00C3DE]/5 p-6 text-center backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00C3DE]/10 via-transparent to-[#B3D235]/5" />

            <p className="relative z-10 text-[--text-secondary]">
              Aqui, não existe {'"depois a gente vê se funciona"'} ou{" "}
              {'"é assim que o mercado está fazendo"'}
            </p>
            <p className="relative z-10 mt-3 text-lg font-semibold text-[--text-primary]">
              Existe <span className="text-[#B3D235]">análise, direção e decisão</span>.
            </p>
            <div className="border-[--text-tertiary]/20 relative z-10 mt-4 space-y-2 border-t pt-4 text-[--text-tertiary]">
              <p>
                A Index entra <span className="text-[#00C3DE]">antes do desperdício</span>.
              </p>
              <p>Antes do erro se repetir.</p>
              <p>Antes do dinheiro ir embora.</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
