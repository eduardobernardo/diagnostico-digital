"use client";

import { trackLeadSubmission } from "@/lib/analytics";
import { useRef, useState, type FormEvent } from "react";
import {
  CheckCircle2,
  Send,
  ArrowRight,
  TrendingDown,
  Target,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export function FormSection() {
  const lastSubmitAttemptRef = useRef(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const now = Date.now();
    if (now - lastSubmitAttemptRef.current < 2000) {
      return;
    }

    lastSubmitAttemptRef.current = now;
    setSubmitAttempted(true);

    if (!consentGiven) {
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const leadData = {
      nome: String(formData.get("nome") ?? ""),
      email: String(formData.get("email") ?? ""),
      empresa: String(formData.get("empresa") ?? ""),
    };

    try {
      const response = await fetch("/api/rd-conversion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: formData.get("nome"),
          telefone: formData.get("telefone"),
          email: formData.get("email"),
          empresa: formData.get("empresa"),
          funcionarios: formData.get("funcionarios"),
          conversion_identifier: "LP Diagnóstico Digital",
        }),
      });

      if (response.ok) {
        trackLeadSubmission(leadData);
      }
    } catch {
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const benefits = [
    { icon: TrendingDown, text: "Menos desperdício" },
    { icon: Target, text: "Mais estratégia" },
    { icon: ShieldCheck, text: "Crescimento com segurança" },
  ];

  if (isSubmitted) {
    return (
      <section
        id="formulario"
        className="relative overflow-hidden bg-[--dark-surface-primary] py-16 md:py-24"
      >
        <figure className="pointer-events-none absolute left-1/2 top-1/2 z-0 aspect-square w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B3D235]/20 blur-[150px]" />
        <div className="relative z-10 mx-auto max-w-[1140px] px-6">
          <div className="mx-auto max-w-xl text-center">
            <div className="animate-bounce-slow mx-auto mb-6 flex size-20 items-center justify-center bg-[#B3D235]">
              <CheckCircle2 className="size-10 text-[#212529]" />
            </div>
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              Solicitação enviada com sucesso!
            </h2>
            <p className="mt-4 text-white/90">
              Em breve, um de nossos especialistas entrará em contato para agendar seu Diagnóstico
              Digital.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 border border-[#B3D235]/30 bg-[#B3D235]/10 px-4 py-2 text-sm text-[#B3D235]">
              <Sparkles className="size-4" />
              Aguarde nosso contato em até 24h
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="formulario"
      className="relative overflow-hidden bg-gradient-to-b from-[--dark-surface-secondary] to-[--dark-surface-primary] py-16 md:py-24"
    >
      {/* Blur decorations */}
      <figure className="pointer-events-none absolute -left-[10%] top-[20%] z-0 aspect-square w-[400px] rounded-full bg-[#B3D235]/15 blur-[150px]" />
      <figure className="pointer-events-none absolute -right-[10%] bottom-[10%] z-0 aspect-square w-[350px] rounded-full bg-[#00C3DE]/10 blur-[120px]" />

      {/* Grid decoration */}
      <div className="absolute left-0 top-0 z-0 grid h-full w-full grid-cols-[clamp(28px,10vw,120px)_auto_clamp(28px,10vw,120px)] opacity-30">
        <div className="col-span-1 flex h-full items-center justify-center" />
        <div className="col-span-1 flex h-full items-center justify-center border-x border-white/5" />
        <div className="col-span-1 flex h-full items-center justify-center" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1140px] px-6">
        <div className="mx-auto max-w-3xl">
          {/* Final CTA Header */}
          <div className="mb-10 text-center">
            <div className="mb-4 inline-flex items-center gap-2 border border-[#B3D235]/30 bg-[#B3D235]/10 px-4 py-2">
              <Sparkles className="size-5 text-[#B3D235]" />
              <span className="text-sm font-semibold text-[#B3D235]">Última Etapa</span>
            </div>

            <h2 className="text-2xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
              Antes de investir mais em marketing,
              <br />
              <span className="text-[#B3D235]">invista em clareza.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90">
              Preencha o formulário abaixo e descubra se o Diagnóstico Digital da Index é o passo
              que sua empresa precisa agora.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4 md:gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 border border-white/10 bg-white/5 px-4 py-2 text-white/90 backdrop-blur-sm transition-all duration-300 hover:border-[#B3D235]/30 hover:bg-[#B3D235]/10"
                >
                  <benefit.icon className="size-5 text-[#B3D235]" />
                  <span>{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <form
            onSubmit={handleSubmit}
            className="relative overflow-hidden border border-white/10 bg-[#2C3136] p-6 shadow-2xl backdrop-blur-xl md:p-8"
          >
            <div className="animated-line absolute left-0 top-2 h-px w-full bg-gradient-to-r from-transparent via-[#B3D235]/30 to-transparent" />
            <div
              className="animated-line absolute bottom-2 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#00C3DE]/20 to-transparent"
              style={{ animationDelay: "1.5s" }}
            />

            <div className="relative z-10 grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label htmlFor="nome" className="mb-2 block text-sm font-medium text-[#F8F9FA]">
                  Nome completo *
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  required
                  className="w-full border border-[#495057] bg-[#373D42] px-4 py-3.5 text-[#F8F9FA] transition-all duration-300 placeholder:text-[#ADB5BD] focus:border-[#B3D235] focus:outline-none focus:ring-2 focus:ring-[#B3D235]/20"
                  placeholder="Digite seu nome completo"
                />
              </div>

              <div>
                <label htmlFor="telefone" className="mb-2 block text-sm font-medium text-[#F8F9FA]">
                  Telefone *
                </label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  required
                  className="w-full border border-[#495057] bg-[#373D42] px-4 py-3.5 text-[#F8F9FA] transition-all duration-300 placeholder:text-[#ADB5BD] focus:border-[#B3D235] focus:outline-none focus:ring-2 focus:ring-[#B3D235]/20"
                  placeholder="(00) 00000-0000"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#F8F9FA]">
                  E-mail *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full border border-[#495057] bg-[#373D42] px-4 py-3.5 text-[#F8F9FA] transition-all duration-300 placeholder:text-[#ADB5BD] focus:border-[#B3D235] focus:outline-none focus:ring-2 focus:ring-[#B3D235]/20"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label htmlFor="empresa" className="mb-2 block text-sm font-medium text-[#F8F9FA]">
                  Nome da empresa *
                </label>
                <input
                  type="text"
                  id="empresa"
                  name="empresa"
                  required
                  className="w-full border border-[#495057] bg-[#373D42] px-4 py-3.5 text-[#F8F9FA] transition-all duration-300 placeholder:text-[#ADB5BD] focus:border-[#B3D235] focus:outline-none focus:ring-2 focus:ring-[#B3D235]/20"
                  placeholder="Nome da sua empresa"
                />
              </div>

              <div>
                <label
                  htmlFor="funcionarios"
                  className="mb-2 block text-sm font-medium text-[#F8F9FA]"
                >
                  Quantidade de funcionários
                </label>
                <select
                  id="funcionarios"
                  name="funcionarios"
                  className="w-full border border-[#495057] bg-[#373D42] px-4 py-3.5 text-[#F8F9FA] transition-all duration-300 focus:border-[#B3D235] focus:outline-none focus:ring-2 focus:ring-[#B3D235]/20"
                >
                  <option value="">Selecione</option>
                  <option value="1-10">1 a 10</option>
                  <option value="11-50">11 a 50</option>
                  <option value="51-200">51 a 200</option>
                  <option value="201-500">201 a 500</option>
                  <option value="500+">Mais de 500</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-start gap-3">
                <div className="flex h-6 items-center">
                  <input
                    type="checkbox"
                    id="lgpd-consent"
                    checked={consentGiven}
                    onChange={(e) => {
                      setConsentGiven(e.target.checked);
                      if (submitAttempted) setSubmitAttempted(false);
                    }}
                    className="size-4 rounded border-[#495057] bg-[#373D42] text-[#B3D235] focus:ring-2 focus:ring-[#B3D235]/20 focus:ring-offset-0"
                  />
                </div>
                <label htmlFor="lgpd-consent" className="text-sm text-[#F8F9FA]">
                  Concordo em receber contato da equipe INDEX sobre o Diagnóstico Digital.{" "}
                  <a href="#" className="text-[#B3D235] hover:underline">
                    Política de Privacidade
                  </a>
                </label>
              </div>
              {submitAttempted && !consentGiven && (
                <p className="mt-2 text-sm text-red-400">
                  Você precisa aceitar os termos para continuar.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-8 flex h-14 w-full items-center justify-center gap-3 bg-[#B3D235] text-lg font-semibold text-[#212529] transition-all duration-300 hover:bg-[#c5e247] hover:shadow-xl hover:shadow-[#B3D235]/25 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <div className="size-5 animate-spin rounded-full border-2 border-[#212529]/30 border-t-[#212529]" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="size-5" />
                  Solicitar Diagnóstico Digital
                  <ArrowRight className="size-5" />
                </>
              )}
            </button>

            <p className="mt-5 text-center text-sm text-[#CED4DA]">
              Ao enviar, você concorda em receber o contato da equipe Index.
              <br />
              <span className="text-[#00C3DE]">Seus dados estão seguros conosco.</span>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
