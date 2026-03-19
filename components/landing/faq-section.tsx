"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "O diagnóstico é realmente gratuito?",
    answer:
      "Sim, 100%. Você recebe a análise completa sem pagar nada. Se quiser continuar com a Index depois, ótimo. Se não quiser, você fica com o relatório e nossa recomendação.",
  },
  {
    question: "E se eu já tiver uma equipe de marketing?",
    answer:
      "Perfeito. O diagnóstico serve justamente para dar direção ao seu time. Muitas empresas que atendemos têm equipe interna — o diagnóstico mostra para onde apontar os esforços deles.",
  },
  {
    question: "Quanto tempo leva o processo?",
    answer:
      "A call de diagnóstico dura cerca de 45 minutos. Seu relatório completo chega em até 48h depois. Sem enrolação.",
  },
  {
    question: "Meus dados estão seguros?",
    answer:
      "Com certeza. Seguimos todas as diretrizes da LGPD. Seus dados são usados apenas para o diagnóstico e nunca são vendidos ou compartilhados.",
  },
  {
    question: "Como a Index é diferente de outras agências?",
    answer:
      "Nossa abordagem começa pelo diagnóstico, não pela execução. Não vendemos pacotes prontos. Cada estratégia é desenvolvida com base na realidade e nos objetivos específicos da sua empresa.",
  },
  {
    question: "E se eu não gostar do diagnóstico?",
    answer:
      "Você não paga nada, então não há risco. Mas se quiser, pode nos dizer o que faltou — feedbacks assim nos ajudam a melhorar.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden bg-[--surface-primary] py-16 dark:bg-[--dark-surface-primary] md:py-24">
      {/* Blur decorations */}
      <figure className="pointer-events-none absolute -right-[15%] top-[30%] z-0 aspect-square w-[400px] rounded-full bg-[#00C3DE]/8 blur-[120px]" />
      <figure className="pointer-events-none absolute -left-[10%] bottom-[20%] z-0 aspect-square w-[300px] rounded-full bg-[#B3D235]/8 blur-[100px]" />

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
              Perguntas que <span className="text-[#B3D235]">todo mundo faz</span>
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
