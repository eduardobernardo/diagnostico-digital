import type { LeadData } from "@/types/lead";

export function trackLeadSubmission(data: LeadData) {
  if (typeof window === "undefined") return;

  // GA4
  if (window.gtag) {
    window.gtag("event", "generate_lead", {
      currency: "BRL",
      value: 0,
    });
  }

  // Meta Pixel
  if (window.fbq) {
    window.fbq("track", "Lead", {
      content_name: "LP Diagnóstico Digital",
      content_category: "Lead Generation",
    });
  }

  // Microsoft Clarity
  if (window.clarity) {
    window.clarity("event", "lead_submission");
  }
}
