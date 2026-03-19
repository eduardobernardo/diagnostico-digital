"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "O que é o Diagnóstico Digital da Index?",
    answer:
      "É uma análise estratégica completa do seu marketing digital atual. Avaliamos todos os seus canais, campanhas e investimentos para identificar onde está perdendo dinheiro e onde estão as oportunidades reais de crescimento.",
  },
  {
    question: "Quanto tempo leva para receber o diagnóstico?",
    answer:
      "Após o preenchimento do formulário, nossa equipe entra em contato em até 24 horas para agendar uma reunião inicial. O diagnóstico completo é entregue em até 7 dias úteis após a coleta de todas as informações necessárias.",
  },
  {
    question: "O diagnóstico é gratuito?",
    answer:
      "A primeira conversa de análise inicial é gratuita e sem compromisso. Nela, já conseguimos identificar os principais pontos de atenção do seu marketing digital.",
  },
  {
    question: "Preciso ter um investimento mínimo em marketing?",
    answer:
      "Não existe um valor mínimo obrigatório. O diagnóstico é útil tanto para empresas que estão começando quanto para aquelas que já investem significativamente em marketing digital.",
  },
  {
    question: "Como a Index é diferente de outras agências?",
    answer:
      "Nossa abordagem começa pelo diagnóstico, não pela execução. Não vendemos pacotes prontos. Cada estratégia é desenvolvida com base na realidade e nos objetivos específicos da sua empresa.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden bg-[--surface-primary] py-16 dark:bg-[--dark-surface-primary] md:py-24">
      {/* Blur decorations */}
      <figure className="bg-[#00C3DE]/8 pointer-events-none absolute -right-[15%] top-[30%] z-0 aspect-square w-[400px] rounded-full blur-[120px]" />
      <figure className="bg-[#B3D235]/8 pointer-events-none absolute -left-[10%] bottom-[20%] z-0 aspect-square w-[300px] rounded-full blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-[1140px] px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <div className="mb-4 inline-flex items-center gap-2 bg-[#00C3DE]/15 px-4 py-2">
              <HelpCircle className="size-5 text-[#00C3DE]" />
              <span className="text-sm font-semibold text-[--text-primary] dark:text-[--dark-text-primary]">
                Perguntas Frequentes
              </span>
            </div>

            <h2 className="text-2xl font-bold leading-tight text-[--text-primary] dark:text-[--dark-text-primary] md:text-4xl">
              Dúvidas? Temos as <span className="text-[#B3D235]">respostas</span>.
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={cn(
                  "group overflow-hidden border transition-all duration-300",
                  openIndex === index
                    ? "border-[#B3D235]/50 bg-[--surface-secondary] dark:bg-[--dark-surface-secondary]"
                    : "bg-[--surface-secondary]/50 dark:bg-[--dark-surface-secondary]/50 border-[--border] hover:border-[#00C3DE]/30 dark:border-[--dark-border]",
                )}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-semibold text-[--text-primary] dark:text-[--dark-text-primary]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "size-5 shrink-0 text-[#00C3DE] transition-transform duration-300",
                      openIndex === index && "rotate-180",
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    openIndex === index
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 leading-relaxed text-[--text-secondary] dark:text-white/80">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
