import dynamic from "next/dynamic";
import { HeroSection } from "@/components/landing/hero-section";
import { LandingHeaderClient } from "@/components/landing/landing-header-client";

// Dynamic imports for below-the-fold sections
const ProblemSection = dynamic(
  () =>
    import("@/components/landing/problem-section").then((mod) => ({ default: mod.ProblemSection })),
  {
    loading: () => <div className="h-96 bg-[--dark-surface-primary]" />,
  },
);

const SolutionSection = dynamic(
  () =>
    import("@/components/landing/solution-section").then((mod) => ({
      default: mod.SolutionSection,
    })),
  {
    loading: () => <div className="h-96 bg-[--dark-surface-secondary]" />,
  },
);

const AboutSection = dynamic(
  () => import("@/components/landing/about-section").then((mod) => ({ default: mod.AboutSection })),
  {
    loading: () => <div className="h-96 bg-[--dark-surface-primary]" />,
  },
);

const DiagnosticSection = dynamic(
  () =>
    import("@/components/landing/diagnostic-section").then((mod) => ({
      default: mod.DiagnosticSection,
    })),
  {
    loading: () => <div className="h-96 bg-[--dark-surface-secondary]" />,
  },
);

const FaqSection = dynamic(
  () => import("@/components/landing/faq-section").then((mod) => ({ default: mod.FaqSection })),
  {
    loading: () => <div className="h-96 bg-[--dark-surface-primary]" />,
  },
);

const FormSection = dynamic(
  () => import("@/components/landing/form-section").then((mod) => ({ default: mod.FormSection })),
  {
    loading: () => <div className="h-[600px] bg-[--dark-surface-primary]" />,
  },
);

const LandingFooter = dynamic(
  () =>
    import("@/components/landing/landing-footer").then((mod) => ({ default: mod.LandingFooter })),
  {
    loading: () => <div className="h-32 bg-[#212529]" />,
  },
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[--dark-surface-primary]">
      <LandingHeaderClient />
      <main className="pt-[var(--header-height)]">
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <AboutSection />
        <DiagnosticSection />
        <FaqSection />
        <FormSection />
      </main>
      <LandingFooter />
    </div>
  );
}

