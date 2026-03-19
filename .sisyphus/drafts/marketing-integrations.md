# Draft: Marketing Integrations Plan

## Requirements (confirmed)

### Task 1: RD Station Marketing Integration

- **Goal**: Integrate LP form with RD Station Marketing API
- **Must**: Send lead data when form is submitted
- **Must**: Add RD Station tracking code for better tracking
- **Must**: Show thank you card after submission (already implemented)
- **Form fields**: nome, telefone, email, empresa, funcionarios (optional)

### Task 2: Marketing Integrations

- **Goal**: Add tracking tools to LP
- **Optional via env vars**:
  - Google Analytics 4 (GA4)
  - Facebook/Meta Pixel
  - Microsoft Clarity
- **Must**: Track form submission events on all platforms

## Research Findings

### RD Station Marketing API

- **Endpoint**: `POST https://api.rd.services/platform/conversions`
- **Auth**: API Key (simpler) or OAuth (more complex)
- **Required fields**: `email`, `conversion_identifier`
- **Optional fields**: `name`, `phone`, `company_name`, `custom_fields`
- **Tracking Code**: JavaScript snippet installed in `<head>`

### Google Analytics 4

- **Method**: Use `next/script` with `strategy="afterInteractive"`
- **Track**: Page views, form submission events
- **Env var**: `NEXT_PUBLIC_GA_ID`

### Facebook/Meta Pixel

- **Method**: Use `next/script` with `strategy="afterInteractive"`
- **Track**: Page views, Lead events
- **Env var**: `NEXT_PUBLIC_FB_PIXEL_ID`

### Microsoft Clarity

- **Method**: Use `next/script` with `strategy="afterInteractive"`
- **Track**: Session recordings, heatmaps
- **Env var**: `NEXT_PUBLIC_CLARITY_ID`

## Open Questions

1. RD Station API Key - já possui?
2. Conversion Identifier - qual nome usar? (sugestão: "LP Diagnóstico Digital")
3. GA4 / Meta Pixel / Clarity - já possui as contas configuradas?
4. Eventos específicos além de form submission? (scroll depth, CTA clicks?)
5. Tratamento de erros - mostrar mensagem ao usuário ou silencioso?

## Technical Approach (proposed)

### Architecture

\`\`\`
app/
├── layout.tsx # Add tracking scripts (GA4, FB, Clarity, RD)
├── api/
│ └── rd-conversion/
│ └── route.ts # API Route for RD Station conversion
├── lib/
│ ├── analytics.ts # Analytics helper functions
│ └── rd-station.ts # RD Station API client
└── .env.local # Environment variables
\`\`\`

### Environment Variables

\`\`\`

# RD Station (REQUIRED)

RD_STATION_API_KEY=xxx
RD_STATION_CONVERSION_IDENTIFIER="LP Diagnóstico Digital"

# Analytics (OPTIONAL)

NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FB_PIXEL_ID=XXXXXXXXXX
NEXT_PUBLIC_CLARITY_ID=XXXXXXXXXX
\`\`\`
