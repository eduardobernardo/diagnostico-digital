
import { Building2, Users, BarChart2, Calendar, X, Check } from "lucide-react";
import { FeatureCard } from "./feature-card";

export function AboutSection() {
  const stats = [
    { icon: Calendar, label: "Desde 2001", detail: "23 anos transformando marketing em resultado" },
    { icon: Users, label: "300+ empresas", detail: "De startups a grandes marcas, todos os setores" },
    { icon: BarChart2, label: "Foco em ROI", detail: "Cada diagnóstico gera um plano de ação mensurável" },
  ];

  return (
    <section className="relative overflow-hidden bg-[--surface-primary] py-16 dark:bg-[--dark-surface-primary] md:py-24">
      {/* Blur decorations */}
      <figure className="pointer-events-none absolute right-[5%] top-[10%] z-0 aspect-square w-[350px] rounded-full bg-[#B3D235]/10 blur-[120px]" />
      <figure className="pointer-events-none absolute -left-[5%] bottom-[10%] z-0 aspect-square w-[250px] rounded-full bg-[#00C3DE]/10 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-[1140px] px-6">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <span className="mb-4 inline-flex items-center gap-2 bg-[#00C3DE]/15 px-4 py-2 text-sm font-semibold text-[#00606d] dark:text-[#00C3DE]">
              <Building2 className="size-4" />
              Quem está por trás do diagnóstico
            </span>
          </div>

          <p className="text-center text-lg leading-relaxed text-[--text-secondary] dark:text-white/85">
            Foi exatamente por ver esse cenário se repetir, em empresas de diferentes portes e
            setores, que a Index{" "}
            <span className="font-semibold text-[--text-primary] dark:text-white">
              construiu sua metodologia
            </span>
            . Há 23 anos, a Index não promete resultado.{" "}
            <span className="font-semibold text-[#B3D235]">
              A gente mapeia onde ele está escondido.
            </span>
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {stats.map((stat, index) => (
              <FeatureCard
                key={index}
                icon={stat.icon}
                text={stat.label}
                detail={stat.detail}
                number={index + 1}
                variant="about"
              />
            ))}
          </div>

          <div className="mt-10 space-y-6 text-center">
            <p className="text-xl font-semibold text-[--text-primary] dark:text-[--dark-text-primary]">
              Marketing aqui não começa com {'"confia em mim"'}.
              <br />
              <span className="text-[#B3D235]">Começa com {'"olha os dados"'}.</span>
            </p>
          </div>

          {/* Contrast box: What you WON'T hear vs WILL hear */}
          <article className="relative mt-10 overflow-hidden border border-[#00C3DE]/20 bg-[#00C3DE]/5 p-6 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00C3DE]/10 via-transparent to-[#B3D235]/5" />

            <div className="relative z-10 grid gap-6 md:grid-cols-2">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-white/40">
                  O que você NÃO vai ouvir da Index
                </p>
                <div className="space-y-2">
                  {[
                    '"Depois a gente vê se funciona"',
                    '"É assim que o mercado tá fazendo"',
                    '"Precisa investir mais para ter resultado"',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-600 dark:text-white/60">
                      <X className="size-4 shrink-0 text-red-500/60" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#8fb41f] dark:text-[#B3D235]">
                  O que você VAI ouvir
                </p>
                <div className="space-y-2">
                  {[
                    '"Aqui está onde está o vazamento"',
                    '"Esse é o próximo passo baseado nos seus dados"',
                    '"Existe espaço para otimizar sem gastar mais"',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-800 dark:text-white/90">
                      <Check className="size-4 shrink-0 text-[#B3D235]" />
                      <span className="text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-6 border-t border-[--text-tertiary]/20 pt-4 text-center text-[--text-tertiary]">
              <p>
                A Index entra <span className="text-[#00C3DE]">antes</span> que você gaste mais à
                toa.
              </p>
              <p>Antes que o mesmo erro se repita.</p>
              <p>Antes que seu orçamento vire história de arrependimento.</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
