"use client";

import { HeroSection } from "@/components/landing/hero-section";
import { ProblemSection } from "@/components/landing/problem-section";
import { SolutionSection } from "@/components/landing/solution-section";
import { AboutSection } from "@/components/landing/about-section";
import { DiagnosticSection } from "@/components/landing/diagnostic-section";
import { FaqSection } from "@/components/landing/faq-section";
import { FormSection } from "@/components/landing/form-section";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingHeader } from "@/components/landing/landing-header";

export default function LandingPage() {
  const scrollToForm = () => {
    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[--dark-surface-primary]">
      <LandingHeader onCtaClick={scrollToForm} />
      <main className="pt-[var(--header-height)]">
        <HeroSection onCtaClick={scrollToForm} />
        <ProblemSection />
        <SolutionSection />
        <AboutSection />
        <DiagnosticSection />
        {/* <FaqSection /> */}
        <FormSection />
      </main>
      <LandingFooter />
    </div>
  );
}
