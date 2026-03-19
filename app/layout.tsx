import type React from "react";
import "../styles/globals.css";
import { Analytics } from "@/components/analytics";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  preload: true,
  fallback: ["system-ui", "Arial", "sans-serif"],
  adjustFontFallback: true,
});

export const metadata = {
  metadataBase: new URL("https://diagnostico.indexdc.com.br"),
  title: "Diagnóstico Digital | INDEX Digital Commerce",
  description:
    "Descubra exatamente onde seu budget de marketing está vazando. Em 48h, receba um mapa estratégico para escalar seu resultado com previsibilidade.",
  keywords: [
    "marketing digital",
    "diagnóstico digital",
    "ROI marketing",
    "consultoria marketing",
    "INDEX Digital Commerce",
  ],
  openGraph: {
    title: "Seu marketing traz cliente ou só traz relatório?",
    description:
      "Pare de queimar dinheiro com ações que não trazem ROI. Solicite seu diagnóstico gratuito de 48h com a equipe da INDEX.",
    type: "website",
    url: "https://diagnostico.indexdc.com.br",
    siteName: "INDEX Digital Commerce",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "INDEX - Diagnóstico Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seu marketing traz cliente ou só traz relatório?",
    description: "Descubra onde seu budget de marketing está vazando com o diagnóstico da INDEX.",
    images: ["/og-image.webp"],
  },
  alternates: {
    canonical: "https://diagnostico.indexdc.com.br",
  },
};

export const viewport = {
  themeColor: "#212529",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="https://api.basehub.com" />
      </head>
      <body
        className={`min-h-screen bg-white text-[#333333] ${montserrat.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
