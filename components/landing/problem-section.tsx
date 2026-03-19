
import { AlertCircle, BarChart3, Layers, FileQuestion } from "lucide-react";
import { FeatureCard } from "./feature-card";

export function ProblemSection() {
  const problems = [
    { icon: Layers, text: "Muitos canais ativos", detail: "Espalhando recursos em vez de focar no que funciona" },
    { icon: BarChart3, text: "Várias ações acontecendo", detail: "Equipe ocupada, mas sem direção clara" },
    { icon: FileQuestion, text: "Relatórios cheios de números", detail: "Dados que impressionam, mas não explicam nada" },
    { icon: AlertCircle, text: "Nenhuma resposta clara", detail: "\"Cadê meu cliente?\"" },
  ];

  return (
    <section className="relative overflow-hidden bg-[--surface-primary] py-16 dark:bg-[--dark-surface-primary] md:py-24">
      {/* Blur decoration */}
      <figure className="pointer-events-none absolute -right-[10%] top-[20%] z-0 aspect-square w-[400px] rounded-full bg-[#00C3DE]/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-[1140px] px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-flex items-center gap-2 bg-[#B3D235]/15 px-4 py-2 text-sm font-semibold text-[#4d5b17] dark:text-[#B3D235]">
            <AlertCircle className="size-4" />O cenário que a gente vive todo dia
          </span>

          <p className="text-lg leading-relaxed text-[--text-secondary] dark:text-white/85 md:text-xl">
            Você abre o relatório do mês e vê números. Impressões. Cliques. Alcance.
            <br />
            Mas quando fecha o documento, continua sem saber:{" "}
            <span className="font-semibold text-[--text-primary] dark:text-[--dark-text-primary]">
              isso trouxe cliente?
            </span>
            <br />
            Ou só trouxe mais uma fatura para pagar?
          </p>

          <h2 className="mt-10 text-2xl font-bold leading-tight text-[--text-primary] dark:text-[--dark-text-primary] md:text-4xl">
            O padrão é sempre o mesmo:
          </h2>

          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {problems.map((problem, index) => (
              <FeatureCard
                key={index}
                icon={problem.icon}
                text={problem.text}
                detail={problem.detail}
                number={index + 1}
                variant="problem"
              />
            ))}
          </div>

          {/* Highlighted box with animation */}
          <div className="relative mt-10 overflow-hidden border border-[#B3D235]/20 bg-[#B3D235]/5 p-6 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-[#B3D235]/10 via-transparent to-[#00C3DE]/5" />

            <p className="relative z-10 text-lg font-semibold text-[--text-primary] md:text-xl">
              A pergunta que não sai da cabeça:
            </p>
            <p className="relative z-10 mt-3 text-xl font-bold text-[--text-primary] md:text-2xl">
              Onde está o <span className="text-[#B3D235]">retorno</span> disso tudo?
            </p>
            <p className="relative z-10 mt-4 text-[--text-tertiary]">
              Sem essa resposta, crescer é jogo de loteria.
              <br />E você não abriu empresa para apostar.
            </p>
          </div>
        </div>

        {/* Consequences */}
        <div className="mx-auto mt-16 max-w-3xl">
          <h3 className="mb-8 text-center text-xl font-bold text-[--text-primary] dark:text-[--dark-text-primary] md:text-2xl">
            Quando você navega sem mapa:
          </h3>

          <div className="space-y-4">
            {[
              {
                title: "O marketing vira \"gasto\" em vez de investimento",
                detail: "Você paga todo mês e torce para dar certo.",
              },
              {
                title: "Decisões no escuro",
                detail:
                  "\"Vamos tentar TikTok? Todo mundo tá usando...\" (Esqueceram de perguntar: seu cliente está lá?)",
              },
              {
                title: "Orçamento que some",
                detail:
                  "R$ 5 mil aqui, R$ 3 mil ali... No fim do ano, viram R$ 50-100 mil que não trouxeram cliente.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-1 border-l-4 border-[#B3D235] bg-[#B3D235]/5 p-4 dark:bg-[#B3D235]/10"
              >
                <span className="font-medium text-[--text-primary] dark:text-[--dark-text-primary]">
                  {item.title}
                </span>
                <span className="text-sm text-[--text-tertiary] dark:text-white/50">
                  {item.detail}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center leading-relaxed text-[--text-primary] dark:text-white/90">
            Se você já desconfiou que marketing digital {'"não funciona"'}, saiba:{" "}
            <span className="font-semibold text-[#B3D235]">o problema nunca foi o digital.</span>
            <br />
            Foi a falta de diagnóstico antes de executar.
          </p>
        </div>
      </div>
    </section>
  );
}
