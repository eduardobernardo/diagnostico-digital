
import { CheckCircle2, Lightbulb, DollarSign, Ban, Target, Zap } from "lucide-react";

export function DiagnosticSection() {
  const benefits = [
    {
      icon: DollarSign,
      title: "Onde seu dinheiro está sendo desperdiçado",
      detail: "Identificamos os canais que consomem budget sem trazer retorno.",
    },
    {
      icon: Ban,
      title: "O que está bloqueando suas conversões",
      detail: "Achamos os gargalos que fazem clientes em potencial desistirem.",
    },
    {
      icon: CheckCircle2,
      title: "Quais canais realmente funcionam para VOCÊ",
      detail: "Descobrimos onde seus clientes estão (nem sempre é óbvio).",
    },
    {
      icon: Target,
      title: "Onde investir para escalar",
      detail: "Apontamos as oportunidades de maior retorno no seu cenário atual.",
    },
    {
      icon: Zap,
      title: "O que corrigir AGORA antes de crescer",
      detail: "Lista priorizada: o que fazer nesta semana, neste mês, neste trimestre.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[--surface-secondary] py-16 dark:bg-[--dark-surface-secondary] md:py-24">
      {/* Blur decorations */}
      <figure className="pointer-events-none absolute left-[10%] top-[20%] z-0 aspect-square w-[300px] rounded-full bg-[#00C3DE]/10 blur-[100px]" />
      <figure className="pointer-events-none absolute bottom-[10%] right-[5%] z-0 aspect-square w-[250px] rounded-full bg-[#B3D235]/10 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-[1140px] px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 bg-[#00C3DE]/15 px-4 py-2">
            <Lightbulb className="size-4 text-[#00606d] dark:text-[#00C3DE]" />
            <span className="text-sm font-semibold text-[#00606d] dark:text-[#00C3DE]">
              O que você recebe no diagnóstico
            </span>
          </div>

          <h2 className="text-2xl font-bold leading-tight text-[--text-primary] dark:text-[--dark-text-primary] md:text-4xl">
            Um mapa completo do seu marketing em{" "}
            <span className="text-[#B3D235]">48 horas</span>
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-[--text-secondary] dark:text-white/85">
            Nosso diagnóstico analisa seus canais, processos e números para entregar:
          </p>

          <div className="mt-8 space-y-3 text-left">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group flex items-start gap-4 border border-[--border] bg-[--surface-primary] p-4 shadow-sm transition-all duration-300 [box-shadow:_70px_-20px_130px_0px_rgba(179,210,53,0.03)_inset] hover:border-[#B3D235]/50 hover:shadow-md dark:border-[--dark-border] dark:bg-[--dark-surface-primary]"
              >
                <div className="flex size-9 shrink-0 items-center justify-center bg-[#B3D235]/10">
                  <benefit.icon className="size-5 text-[#B3D235]" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-semibold text-[--text-primary] dark:text-white/90">
                    {benefit.title}
                  </span>
                  <span className="text-sm text-[--text-tertiary] dark:text-white/50">
                    {benefit.detail}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Highlighted box */}
          <div className="relative mt-10 overflow-hidden border border-[#B3D235]/20 bg-[#B3D235]/5 p-6 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-[#B3D235]/10 via-transparent to-[#00C3DE]/5" />
            <p className="relative z-10 font-semibold text-[--text-secondary]">
              Não é um PDF cheio de gráficos bonitos.
            </p>
            <p className="relative z-10 mt-2 text-xl font-bold text-[--text-primary]">
              É um plano de ação com{" "}
              <span className="text-[#B3D235]">passos claros</span>.
            </p>
            <p className="relative z-10 mt-2 text-sm text-[--text-tertiary]">
              Faça isso → isso acontece → seu resultado melhora.
            </p>
          </div>

          <p className="mt-8 text-lg font-semibold text-[--text-primary] dark:text-[--dark-text-primary]">
            Esse é o jeito Index de transformar marketing em{" "}
            <span className="text-[#B3D235]">investimento com retorno previsível</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
