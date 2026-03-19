# Plano: Integrações de Marketing - INDEX Landing Page

## TL;DR

> **Objetivo**: Integrar LP com RD Station Marketing API (formulário de leads) + ferramentas de tracking (GA4, Meta Pixel, Microsoft Clarity) - todas opcionais via variáveis de ambiente.>
> **Entregas**:
>
> - API Route para conversão RD Station
> - Componentes de analytics condicionais
> - Checkbox de consentimento LGPD
> - Tracking de evento Lead em todas as plataformas
> - Normalização de telefone
>
> **Esforço Estimado**: Médio (2-3 dias)
> **Execução Paralela**: NÃO - Sequencial (dependências)
> **Caminho Crítico**: API Route → LGPD Checkbox→ Form Integration → Tracking Scripts

---

## Contexto

### Requisitos Confirmados

1. **RD Station Marketing Integration**
   - Autenticação: API Key Legada (query param)
   - Quando formulário for enviado, registrar lead no RD Station
   - Erros devem ser silenciosos (log server-side, sucesso sempre ao usuário)

2. **LGPD Consentimento**
   - DEVE adicionar checkbox de consentimento antes do botão de enviar
   - Formulário só pode ser enviado se checkbox marcado

3. **Ferramentas de Tracking (opcionais via env)**
   - Google Analytics 4 → `NEXT_PUBLIC_GA_ID`
   - Meta/Facebook Pixel → `NEXT_PUBLIC_FB_PIXEL_ID`
   - Microsoft Clarity → `NEXT_PUBLIC_CLARITY_ID`

4. **Eventos de Tracking**
   - APENAS envio de formulário (Lead event)
   - SEM scroll tracking, click tracking, ou page view adicional

### Estado Atual do Código

- Formulário em `/components/landing/form-section.tsx`
- Usa mock delay (1.5s) para simulação
- UI de sucesso já implementada (`isSubmitted` state)
- Campos: `nome`, `telefone`, `email`, `empresa`, `funcionarios`
- Sem LGPD checkbox
- Sem integração real com API

---

## Objetivos de Trabalho

### Objetivo Principal

Implementar integração completa de marketing que:1. Registra leads no RD Station Marketing via API 2. Adiciona consentimento LGPD obrigatório 3. Trackear eventos Lead em GA4/Meta/Clarity (quando configurados) 4. Funciona com fallback gracioso quando APIs falham

### Entregas Concretas

- [ ] API Route `/app/api/rd-conversion/route.ts` funcional
- [ ] Checkbox LGPD no formulário
- [ ] Normalização automática de telefone
- [ ] Debounce no botão de submit (2s)
- [ ] Timeout de 10s na chamada RD Station
- [ ] Componente Analytics que carrega scripts condicionalmente
- [ ] Função `trackLeadSubmission()` unificada
- [ ] TypeScript declarations para `gtag`, `fbq`, `clarity`
- [ ] `.env.example` atualizado

### Critérios de Aceitação

```bash
# Test1: API Route responde corretamente
curl -X POST http://localhost:3000/api/rd-conversion \
  -H "Content-Type: application/json" \
  -d '{"nome":"Teste","telefone":"11999999999","email":"test@example.com","empresa":"TestCorp","funcionarios":"11-50"}'# Expected: {"success": true}

# Test2: Validação de campos obrigatórios
curl -X POST http://localhost:3000/api/rd-conversion \
  -H "Content-Type: application/json" \
  -d '{"nome":"Teste"}'# Expected: 400 Bad Request - "email é obrigatório"

# Test3: Scripts carregam condicionalmente
NEXT_PUBLIC_GA_ID="G-TEST" npm run dev
# Verificar: <scriptsrc="googletagmanager.com/gtag/js"> presente

npm run dev
# Verificar: GA script AUSENTE quando NEXT_PUBLIC_GA_ID não definido
```

### MustNOT Have(Guardrails)

- **NÃO** modificar UI do formulário exceto adicionar checkbox LGPD
- **NÃO** implementar retry logic para RD Station
- **NÃO** trackear eventos além de Lead submission
- **NÃO** retornar detalhes de erro RD Station para o cliente
- **NÃO** criar sistema genérico de `trackEvent()`
- **NÃO** implementar banner LGPD completo (apenas checkbox)

---

## Estratégia de Verificação

### Decisão de Testes

- **Infraestrutura de testes existe**: NÃO (sem testes unitários)
- **Testes automatizados**: Agent-executed QA scenarios
- **Framework**: Playwright para E2E + curl para API

### Cenários de QA (Agent-Executed)

Todos os cenários são executados pelo agente, sem intervenção humana.

```
Cenário 1: Happy Path - Formulário enviado com sucesso
Tool: Playwright
Pre: RD_STATION_API_KEY configurado, LGPD checkbox visível
Steps:1. Navegar para http://localhost:3000#formulario
2. Preencher: nome="João Silva", telefone="11988887777", email="joao@test.com"3. Marcar checkbox LGPD
4. Clicar "Solicitar Diagnóstico Digital"
Expected: Card de sucesso aparece ("Solicitação enviada com sucesso!")
Evidence: Screenshot em.sisyphus/evidence/task-1-happy-path.png

Cenário2: LGPD Checkbox Required
Tool: Playwright
Pre: LGPD checkbox desmarcado
Steps:1. Navegar para http://localhost:3000#formulario
2. Preencher todos os campos obrigatórios
3. NÃO marcar checkbox LGPD
4. Clicar submit
Expected: Formulário NÃO envia, mensagem "Você deve aceitar os termos" aparece
Evidence: Screenshot em .sisyphus/evidence/task-2-lgpd-required.png

Cenário 3: RD Station Falha Silenciosamente
Tool: Bash (curl) + Playwright
Pre: RD_STATION_API_KEY inválido
Steps:1. Configurar RD_STATION_API_KEY="invalid_key"
2. Reiniciar servidor
3. Preencher formulário com dados válidos
4. Marcar LGPD
5. Clicar submit
Expected: Card de sucesso aparece (erro é silencioso pro usuário)
Evidence: Console log server-side mostra "RD Station Error: ...""

Cenário4: Tracking Events Disparam
Tool: Playwright
Pre: NEXT_PUBLIC_GA_ID e NEXT_PUBLIC_FB_PIXEL_ID configurados
Steps:1. Intercept network requests para google-analytics e facebook.net
2. Preencher formulário
3. Marcar LGPD
4. Clicar submit
Expected: Requests para GA4 (generate_lead) e Meta (Lead) disparados
Evidence: Network logs validados
```

---

## Estratégia de Execução

### Ondas de Execução (Sequencial)

```
WAVE 1: Fundação (API Route + Validação)
├── Task 1: Criar API Route /api/rd-conversion/route.ts
│   └── Validação de campos obrigatórios
├── Task 2: Implementar chamada RD Station API
│   ├── Normalização de telefone
│   ├── Timeout 10s
│   └── Error handling silencioso
└── Task 3: Criar types e utilitários
    └── TypeScript declarations

WAVE 2: LGPD Compliance
├── Task 4: Adicionar checkbox LGPD no formulário
│   ├── Estado de consentimento
│   ├── Validação obrigatória
│   └── Mensagem de erro
└── Task 5: Integrar API Route no form submission
    ├── Debounce 2s no botão
    └── Loading state mantido

WAVE 3: Analytics Tracking
├── Task 6: Criar componente Analytics
│   ├── GA4 via @next/third-parties/google
│   ├── Meta Pixel via next/script
│   └── Clarity via next/script
├── Task 7: Criar função trackLeadSubmission()
│   └── Dispara eventos em todas as plataformas
└── Task 8: Integrar tracking no form submission
    └── Chama trackLeadSubmission após sucesso

WAVE 4: Finalização
├── Task 9: Atualizar .env.example
└── Task 10: Documentação e QA final
```

### Matriz de Dependências

- **Task1**: Sem dependências
- **Task2**: Depende de Task 1
- **Task3**: Depende de Task2
- **Task4**: Sem dependências (pode rodar paralelo comWave1)
- **Task5**: Depende de Task 1, Task 4
- **Task6**: Sem dependências (pode rodar paralelo)
- **Task7**: Depende de Task3, Task6
- **Task8**: Depende de Task5, Task 7
- **Task9**: Sem dependências
- **Task10**: Depende de todas

---

## TODOs

> Implementação + Teste = UMA Tarefa. Nunca separar.
> TODA tarefa DEVE ter: Agente Recomendado + QA Scenarios.+ Uma tarefa SEM QA Scenarios está INCOMPLETA.---

### Wave 1: Fundação

- [ ] 1. Criar API Route `/app/api/rd-conversion/route.ts`

  **O que fazer**:
  - Criar diretório `/app/api/rd-conversion/` se não existir
  - Criar arquivo `route.ts` com handler POST
  - Validar campos obrigatórios (email, conversion_identifier)
  - Retornar JSON `{ success: boolean }`

  **Não fazer**:
  - Não implementar retry logic
  - Não retornar detalhes de erro RD Station ao cliente
  - Não usar GET handler

  **Agente Recomendado**:

  > Category: `quick`
  > Reason: Tarefa simples, direta, sem dependências

  **Paralelismo**:
  - **Pode Rodar em Paralelo**: Sim (sem dependências)
  - **Grupo**: Wave 1
  - **Bloqueia**: Tasks 2, 3, 5

  **Referências**:

  > API Route pattern em Next.js 14+:
  >
  > ```typescript
  > // app/api/rd-conversion/route.ts
  > import { NextRequest, NextResponse } from "next/server";
  >
  > export async function POST(request: NextRequest) {
  >   const body = await request.json();
  >   // ... validation
  >   return NextResponse.json({ success: true });
  > }
  > ```

  **Critérios de Aceitação**:

  > **AGENT-EXECUTABLE VERIFICATION ONLY** — Sem intervenção humana.> > Cada critério DEVE ser verificável executando um comando ou ferramenta.

  Scenario: Happy Path - API接受有效dados
  Tool: Bash (curl)
  Preconditions: Servidor rodando em localhost:3000
  Steps:1. Execute curl POST request 2. Assert response status 200 3. Assert response body `{ "success": true }`
  Expected Result: Response 200 OK with success true
  Failure Indicators: Status 400/500, response missing success field
  Evidence: .sisyphus/evidence/task-1-happy-path-curl.txt

  Scenario: Missing Required Field - Email não fornecido
  Tool: Bash (curl)
  Preconditions: Servidor rodando
  Steps: 1. curl POSTsem email field 2. Assert response status 400 3. Assert error message mentions"email"
  Expected Result: 400 Bad Request with clear error
  Failure Indicators: Status 200, missing error message
  Evidence: .sisyphus/evidence/task-1-validation-error.json

  **Commit**: YES
  - Message: `feat(api): add rd-conversion endpoint with validation`
  - Files: `app/api/rd-conversion/route.ts`

---

- [ ] 2. Implementar Integração RD Station API

  **O que fazer**:
  - Adicionar chamada `fetch()` para `https://api.rd.services/platform/conversions`
  - Autenticar com `?api_key=${process.env.RD_STATION_API_KEY}`
  - Mapear campos do form para payload RD Station:
    - `email` → `payload.email`
    - `nome` → `payload.name`
    - `telefone` → `payload.phone` (normalizado)
    - `empresa` → `payload.company_name`
    - `funcionarios` → `payload.cf_employees`
  - Implementar normalização de telefone: remover não-numéricos, adicionar +55
  - Adicionar `AbortController` com timeout de 10 segundos
  - Error handling: log server-side, retornar `{ success: true }` mesmo em erro

  **Não fazer**:
  - Não implementar retry
  - Não usar OAuth (usar API Key legada)
  - Não bloquear response esperando RD Station

  **Agente Recomendado**:

  > Category: `unspecified-high`
  > Reason: Integração com API externa, tratamento de erros, edge cases

  **Paralelismo**:
  - **Pode Rodar em Paralelo**: Não (depende de Task1)
  - **Grupo**: Wave 1
  - **Bloqueia**: Task 5
  - **Bloqueado Por**: Task 1

  **Referências**:

  > RD Station Conversion API docs:
  >
  > ```
  > POST https://api.rd.services/platform/conversions?api_key=YOUR_KEY
  >
  > Body:
  > {
  >   "event_type": "CONVERSION",
  >   "event_family": "CDP",
  >   "payload": {
  >     "conversion_identifier": "LP Diagnóstico Digital",
  >     "email": "user@example.com",
  >     "name": "João Silva",
  >     "phone": "+5511999999999",
  >     "company_name": "Empresa ABC",
  >     "cf_employees": "11-50"
  >   }
  > }
  > ```

  > Phone normalization pattern:
  >
  > ```typescript
  > function normalizePhone(phone: string): string {
  >   const digits = phone.replace(/\D/g, "");
  >   if (digits.startsWith("55")) return "+" + digits;
  >   return "+55" + digits;
  > }
  > ```

  > AbortController timeout pattern:
  >
  > ```typescript
  > const controller = new AbortController();
  > const timeout = setTimeout(() => controller.abort(), 10000);
  >
  > try {
  >   const response = await fetch(url, { signal: controller.signal });
  > } finally {
  >   clearTimeout(timeout);
  > }
  > ```

  **Critérios de Aceitação**:

  Scenario: RD Station API Call Success
  Tool: Bash (curl) + server logs
  Preconditions: RD_STATION_API_KEY válido configurado
  Steps: 1. curl POST com dados válidos 2. Verificar resposta 200 3. Verificar logs não contêm "RD Station Error"
  Expected Result: Lead criado no RD Station, resposta success
  Failure Indicators: Error log visível, status diferente de 200
  Evidence: .sisyphus/evidence/task-2-rd-success.txt

  Scenario: RD Station API Failure - Silent Error
  Tool: Bash (curl) + server logs
  Preconditions: RD_STATION_API_KEY inválido
  Steps: 1. curl POST com dados válidos 2. Verificar resposta ainda é 200 success 3. Verificar log server contém "RD Station Error"
  Expected Result: Usuário vê sucesso, erro logado server-side
  Failure Indicators: Resposta 500, erro exposto ao cliente
  Evidence: .sisyphus/evidence/task-2-silent-error.txt

  Scenario: Phone Normalization
  Tool: Unit test (ler código fonte)
  Preconditions: Código implementado
  Steps: 1. Verificar função normalizePhone existe 2. Assert: "(11) 99999-9999" → "+5511999999999" 3. Assert: "11988887777" → "+5511988887777"
  Expected Result: Telefone sempre formatado E.164
  Failure Indicators: Formatos incorretos passando
  Evidence: .sisyphus/evidence/task-2-phone-norm.txt

  Scenario: Request Timeout
  Tool: Bash (curl com mock)
  Preconditions: RD Station demora >10s (mock)
  Steps: 1. Mock timeout na API RD Station 2. curl POST 3. Verificar resposta após ~10s
  Expected Result: Resposta success após timeout, erro logado
  Failure Indicators: Request pendura indefinidamente
  Evidence: .sisyphus/evidence/task-2-timeout.txt

  **Commit**: YES
  - Message: `feat(api): integrate rd station conversion api with error handling`
  - Files: `app/api/rd-conversion/route.ts`, `lib/normalize-phone.ts`

---

- [ ] 3. Criar TypeScript Declarations e Utilitários

  **O que fazer**:
  - Criar `/types/analytics.d.ts` com declarations para `window.gtag`, `window.fbq`, `window.clarity`
  - Criar `/lib/analytics.ts` com função `trackLeadSubmission(data: LeadData)`
  - Criar tipo `LeadData` interface em `/types/lead.ts`
  - Implementar checks de existência antes de chamar cada track

  **Não fazer**:
  - Não criar sistema genérico de `trackEvent()`
  - Não adicionar tracking de outros eventos

  **Agente Recomendado**:

  > Category: `quick`
  > Reason: Tipos e utilitários simples

  **Paralelismo**:
  - **Pode Rodar em Paralelo**: Não (depende de Task2)
  - **Grupo**: Wave 1
  - **Bloqueia**: Task 7
  - **Bloqueado Por**: Task 2

  **Referências**:

  > TypeScript declarations:
  >
  > ```typescript
  > // types/analytics.d.ts
  > declare global {
  >   interface Window {
  >     gtag?: (...args: any[]) => void;
  >     fbq?: (...args: any[]) => void;
  >     clarity?: (...args: any[]) => void;
  >   }
  > }
  > ```

  > trackLeadSubmission pattern:
  >
  > ```typescript
  > // lib/analytics.ts
  > import type { LeadData } from "@/types/lead";
  >
  > export function trackLeadSubmission(data: LeadData) {
  >   if (typeof window === "undefined") return;
  >
  >   // GA4
  >   if (window.gtag) {
  >     window.gtag("event", "generate_lead", {
  >       currency: "BRL",
  >       value: 0,
  >     });
  >   }
  >
  >   // Meta Pixel
  >   if (window.fbq) {
  >     window.fbq("track", "Lead", {
  >       content_name: "LP Diagnóstico Digital",
  >       content_category: "Lead Generation",
  >     });
  >   }
  >
  >   // Clarity
  >   if (window.clarity) {
  >     window.clarity("event", "lead_submission");
  >   }
  > }
  > ```

  **Critérios de Aceitação**:

  Scenario: TypeScript Declarations Exist
  Tool: Bash (ls)
  Steps: 1. ls types/analytics.d.ts 2. ls lib/analytics.ts 3. ls types/lead.ts
  Expected Result: All files exist
  Evidence: .sisyphus/evidence/task-3-files-exist.txt

  Scenario: trackLeadSubmission Executa Sem Scripts
  Tool: Node REPL
  Steps: 1. Import trackLeadSubmission 2. Chamar com dados válidos 3. Verificar não há erros (window undefined)
  Expected Result: Função executa sem throw
  Evidence: .sisyphus/evidence/task-3-no-scripts.txt

  **Commit**: YES
  - Message: `feat(types): add analytics types and lead tracking utility`
  - Files: `types/analytics.d.ts`, `types/lead.ts`, `lib/analytics.ts`

---

### Wave 2: LGPD Compliance

- [ ] 4. Adicionar Checkbox LGPD no Formulário

  **O que fazer**:
  - Adicionar estado `consentGiven` no `FormSection` component
  - Adicionar checkbox antes do botão de submit
  - Texto: "Concordo em receber contato da equipe INDEX sobre o Diagnóstico Digital."
  - Link para política de privacidade (#)
  - Validação: só permite submit se checkbox marcado
  - Mensagem de erro: "Você precisa aceitar os termos para continuar."

  **Não fazer**:
  - Não implementar banner LGPD completo
  - Não modificar outros campos do formulário
  - Não adicionar campos de consentimento adicionais

  **Agente Recomendado**:

  > Category: `visual-engineering`
  > Reason: UI/UX task, checkbox styling, error states

  **Skills**:

  > - `ui-ux-pro-max`: Checkbox styling, error states, accessibility

  **Paralelismo**:
  - **Pode Rodar em Paralelo**: Sim (sem dependências de Wave 1)
  - **Grupo**: Wave 2
  - **Bloqueia**: Task 5
  - **Bloqueado Por**: Nenhum

  **Referências**:

  > File: components/landing/form-section.tsx
  > Lines: 201-224 (área do botão submit)
  >
  > Adicionar após linha 199 (antes do botão):
  >
  > ```tsx
  > {
  >   /* LGPD Consent */
  > }
  > <div className="mt-6 flex items-start gap-3">
  >   <input
  >     type="checkbox"
  >     id="lgpd-consent"
  >     checked={consentGiven}
  >     onChange={(e) => setConsentGiven(e.target.checked)}
  >     className="mt-1 h-4 w-4 rounded border-[#495057] bg-[#373D42] text-[#B3D235] focus:ring-[#B3D235]/20"
  >   />
  >   <label htmlFor="lgpd-consent" className="text-sm text-[#CED4DA]">
  >     Concordo em receber contato da equipe INDEX sobre o Diagnóstico Digital.{" "}
  >     <a href="#" className="text-[#00C3DE] hover:underline">
  >       Política de Privacidade
  >     </a>
  >   </label>
  > </div>;
  > {
  >   submitAttempted && !consentGiven && (
  >     <p className="mt-2 text-sm text-red-400">Você precisa aceitar os termos para continuar.</p>
  >   );
  > }
  > ```

  **Critérios de Aceitação**:

  Scenario: Checkbox Visible Before Submit
  Tool: Playwright
  Steps: 1. Navegar para #formulario 2. Verificar checkbox LGPD visível 3. Verificar texto "Concordo em receber contato"
  Expected Result: Checkbox e label renderizados corretamente
  Evidence: Screenshot .sisyphus/evidence/task-4-checkbox-visible.png

  Scenario: Submit Blocked Without Consent
  Tool: Playwright
  Steps: 1. Preencher todos os campos 2. NÃO marcar checkbox LGPD 3. Clicar submit 4. Verificar mensagem de erro aparece
  Expected Result: "Você precisa aceitar os termos" visível
  Evidence: Screenshot .sisyphus/evidence/task-4-blocked-submit.png

  Scenario: Submit Allowed With Consent
  Tool: Playwright
  Steps: 1. Preencher todos os campos 2. MARCAR checkbox LGPD 3. Clicar submit 4. Verificar card de sucesso aparece
  Expected Result: Formulário enviado com sucesso
  Evidence: Screenshot .sisyphus/evidence/task-4-allowed-submit.png

  **Commit**: YES
  - Message: `feat(form): add lgpd consent checkbox with validation`
  - Files: `components/landing/form-section.tsx`

---

- [ ] 5. Integrar API Route no Form Submission

  **O que fazer**:
  - Modificar `handleSubmit` em `FormSection` para:
    1. Validar checkbox LGPD
    2. Chamar `/api/rd-conversion` via fetch
    3. Chamar `trackLeadSubmission()` após sucesso
    4. Mostrar card de sucesso independente do resultado
  - Adicionar debounce de 2 segundos no botão submit
  - Manter loading state durante requisição

  **Não fazer**:
  - Não modificar UI do card de sucesso
  - Não adicionar loading spinner novo
  - Não implementar retry

  **Agente Recomendado**:

  > Category: `unspecified-high`
  > Reason: Integração complexa com múltiplas dependências

  **Paralelismo**:
  - **Pode Rodar em Paralelo**: Não
  - **Grupo**: Wave 2
  - **Bloqueia**: Task 8
  - **Bloqueado Por**: Task 1, Task 2, Task 4

  **Referências**:

  > Current handler (mock):
  >
  > ```typescript
  > const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  >   e.preventDefault();
  >   setIsSubmitting(true);
  >   await new Promise((resolve) => setTimeout(resolve, 1500));
  >   setIsSubmitting(false);
  >   setIsSubmitted(true);
  > };
  > ```

  > New handler pattern:
  >
  > ```typescript
  > const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  >   e.preventDefault();
  >
  >   // LGPD validation
  >   if (!consentGiven) {
  >     setSubmitAttempted(true);
  >     return;
  >   }
  >
  >   setIsSubmitting(true);
  >
  >   try {
  >     await fetch("/api/rd-conversion", {
  >       method: "POST",
  >       headers: { "Content-Type": "application/json" },
  >       body: JSON.stringify({
  >         nome,
  >         telefone,
  >         email,
  >         empresa,
  >         funcionarios,
  >         conversion_identifier: "LP Diagnóstico Digital",
  >       }),
  >     });
  >
  >     trackLeadSubmission({ nome, email, empresa });
  >   } catch (error) {
  >     console.error("Form submission error:", error);
  >   } finally {
  >     setIsSubmitting(false);
  >     setIsSubmitted(true);
  >   }
  > };
  > ```

  > Debounce pattern:
  >
  > ```typescript
  > const [debouncedSubmit, setDebouncedSubmit] = useState(false);
  >
  > const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  >   if (debouncedSubmit) return;
  >   setDebouncedSubmit(true);
  >   setTimeout(() => setDebouncedSubmit(false), 2000);
  >   // ... rest
  > };
  > ```

  **Critérios de Aceitação**:

  Scenario: Form Submits to API Route
  Tool: Playwright + Network interception
  Steps: 1. Intercept POST to /api/rd-conversion 2. Preencher formulário 3. Marcar LGPD 4. Clicar submit 5. Verificar requisição POST disparada
  Expected Result: POST body contém todos os campos
  Evidence: .sisyphus/evidence/task-5-api-call.json

  Scenario: Debounce Prevents Double Submit
  Tool: Playwright
  Steps: 1. Preencher formulário 2. Marcar LGPD 3. Clicar submit 2 vezes rapidamente 4. Verificar apenas 1 requisição POST
  Expected Result: Apenas uma chamada API
  Failure Indicators: Múltiplas requisições
  Evidence: .sisyphus/evidence/task-5-debounce.txt

  Scenario: Success Card Shows on API Failure
  Tool: Playwright
  Steps: 1. Mock API returning 500 2. Preencher formulário 3. Marcar LGPD 4. Clicar submit
  Expected Result: Card de sucesso aparece mesmo com API down
  Failure Indicators: Erro visível ao usuário
  Evidence: .sisyphus/evidence/task-5-silent-error.png

  **Commit**: YES
  - Message: `feat(form): integrate api route and tracking on submission`
  - Files: `components/landing/form-section.tsx`

---

### Wave 3: Analytics Tracking

- [ ] 6. Criar Componente Analytics

  **O que fazer**:
  - Criar `/components/analytics.tsx` como Client Component
  - Usar `@next/third-parties/google` para GA4
  - Usar `next/script` com `strategy="afterInteractive"` para Meta Pixel
  - Usar `next/script` para Clarity
  - Carregar scripts APENAS se env vars definidos
  - Adicionar ao `/app/layout.tsx`

  **Não fazer**:
  - Não usar `<script>` tags diretamente
  - Não carregar scripts em development (apenas production)
  - Não implementar page view tracking

  **Agente Recomendado**:

  > Category: `quick`
  > Reason: Configuração de scripts, direta

  **Paralelismo**:
  - **Pode Rodar em Paralelo**: Sim (sem dependências)
  - **Grupo**: Wave 3
  - **Bloqueia**: Task 8
  - **Bloqueado Por**: Nenhum

  **Referências**:

  > GA4 with @next/third-parties:
  >
  > ```typescript
  > // components/analytics.tsx
  > 'use client';
  >
  > import { GoogleAnalytics } from '@next/third-parties/google';
  > import Script from 'next/script';
  >
  > export function Analytics() {
  >   const gaId = process.env.NEXT_PUBLIC_GA_ID;
  >   const fbPixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
  >   const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
  >
  >   return (
  >     <>
  >       {gaId && <GoogleAnalytics gaId={gaId} />}
  >
  >       {fbPixelId && (
  >         <>
  >           <Script
  >             src={`https://connect.facebook.net/en_US/fbevents.js`}
  >             strategy="afterInteractive"
  >           />
  >           <Script id="fb-pixel-init" strategy="afterInteractive">
  >             {`fbq('init', '${fbPixelId}');fbq('track', 'PageView');`}
  >           </Script>
  >         </>
  >       )}
  >
  >       {clarityId && (
  >         <Script id="clarity-init" strategy="afterInteractive">
  >           {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarityId}");`}
  >         </Script>
  >       )}
  >     </>
  >   );
  > }
  > ```

  > Layout integration:
  >
  > ```typescript
  > // app/layout.tsx
  > import { Analytics } from '@/components/analytics';
  >
  > export default function RootLayout({ children }) {
  >   return (
  >     <html lang="pt-BR">
  >       <body>
  >         {children}
  >         <Analytics />
  >       </body>
  >     </html>
  >   );
  > }
  > ```

  **Critérios de Aceitação**:

  Scenario: GA4 Script Loads When Env Set
  Tool: Playwright
  Steps: 1. Start with NEXT_PUBLIC_GA_ID="G-TEST" 2. Navigate to page 3. Check DOM for googletagmanager.com/gtag/js
  Expected Result: Script tag present in DOM
  Failure Indicators: Script missing
  Evidence: .sisyphus/evidence/task-6-ga-loaded.html

  Scenario: Scripts Not Loaded Without Env
  Tool: Playwright
  Steps: 1. Start without NEXT_PUBLIC_GA_ID 2. Navigate to page 3. Check DOM for absence of gtag script
  Expected Result: No GA script in DOM
  Evidence: .sisyphus/evidence/task-6-no-scripts.html

  Scenario: All Scripts Load Together
  Tool: Playwright
  Steps: 1. Set all three env vars 2. Navigate to page 3. Check DOM for GA, FB, Clarity scripts
  Expected Result: All three scripts present
  Evidence: .sisyphus/evidence/task-6-all-scripts.html

  **Commit**: YES
  - Message: `feat(analytics): add conditional analytics component for ga4, meta pixel, and clarity`
  - Files: `components/analytics.tsx`, `app/layout.tsx`, `package.json` (add @next/third-parties)

---

- [ ] 7. Criar Função trackLeadSubmission

  **O que fazer**:
  - Usar interface `LeadData` criada na Task 3
  - Implementar checks de existência (`typeof window.gtag !== 'undefined'`)
  - Chamar cada plataforma de tracking
  - Exportar função do `/lib/analytics.ts`

  **Não fazer**:
  - Não criar função genérica `trackEvent()`
  - Não adicionar parâmetros extra
  - Não logar erros de tracking (silencioso)

  **Agente Recomendado**:

  > Category: `quick`
  > Reason: Função simples de tracking

  **Paralelismo**:
  - **Pode Rodar em Paralelo**: Não (depende de Task3 e Task6)
  - **Grupo**: Wave 3
  - **Bloqueia**: Task 8
  - **Bloqueado Por**: Task 3, Task 6

  **Referências**:

  > Ver Task3 para implementação completa

  **Critérios de Aceitação**:

  Scenario: Function Exists in Correct File
  Tool: Bash (grep)
  Steps: 1. grep -n "trackLeadSubmission" lib/analytics.ts
  Expected Result: Function declaration found
  Evidence: .sisyphus/evidence/task-7-function-exists.txt

  Scenario: Function Handles Missing Window
  Tool: Node REPL
  Steps: 1. Import trackLeadSubmission 2. Call in Node environment (no window) 3. Verify no error thrown
  Expected Result: Function returns without error
  Evidence: .sisyphus/evidence/task-7-no-window.txt

  **Commit**: YES (combined with Task 3)
  - Message: `feat(analytics): add trackLeadSubmission utility function`
  - Files: `lib/analytics.ts`

---

- [ ] 8. Integrar Tracking no Form Submission

  **O que fazer**:
  - Importar `trackLeadSubmission` no `FormSection`
  - Chamar `trackLeadSubmission({ nome, email, empresa })` após sucesso do fetch
  - Garantir que tracking dispara mesmo se API falhar
  - Verificar que não bloqueia UI

  **Não fazer**:
  - Não usar `await` no tracking (fire-and-forget)
  - Não adicionar retry logic

  **Agente Recomendado**:

  > Category: `quick`
  > Reason: Integração simples

  **Paralelismo**:
  - **Pode Rodar em Paralelo**: Não
  - **Grupo**: Wave 3
  - **Bloqueia**: Nenhum
  - **Bloqueado Por**: Task 5, Task 7

  **Referências**:

  > Integration pattern:
  >
  > ```typescript
  > // components/landing/form-section.tsx
  > import { trackLeadSubmission } from '@/lib/analytics';
  >
  > const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  >   // ... validation and fetch
  >
  >   try {
  >     await fetch('/api/rd-conversion', { ... });
  >   } catch (error) {
  >     console.error('Submission error:', error);
  >   } finally {
  >     // Track regardless of success/failure
  >     trackLeadSubmission({ nome, email, empresa });
  >     setIsSubmitting(false);
  >     setIsSubmitted(true);
  >   }
  > };
  > ```

  **Critérios de Aceitação**:

  Scenario: Tracking Fires on Form Submit
  Tool: Playwright + Network interception
  Steps: 1. Intercept requests to google-analytics, facebook.net 2. Preencher formulário 3. Marcar LGPD 4. Clicar submit 5. Verify GA and FB events fired
  Expected Result: Both tracking events captured
  Evidence: .sisyphus/evidence/task-8-tracking-fired.txt

  Scenario: Tracking Fires Even Without Env Vars
  Tool: Playwright
  Steps: 1. Start without any NEXT*PUBLIC*\* vars 2. Preencher formulário 3. Marcar LGPD 4. Clicar submit
  Expected Result: Form submits successfully, no errors
  Evidence: .sisyphus/evidence/task-8-no-env-vars.png

  **Commit**: YES
  - Message: `feat(form): integrate trackLeadSubmission on form submit`
  - Files: `components/landing/form-section.tsx`

---

### Wave 4: Finalização

- [ ] 9. Atualizar .env.example e Documentação

  **O que fazer**:
  - Criar/adicionar ao `.env.example`:

    ```
    # RD Station Marketing (Required)
    RD_STATION_API_KEY=your_api_key_here
    RD_STATION_CONVERSION_IDENTIFIER=LP Diagnóstico Digital

    # Analytics (Optional)
    NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
    NEXT_PUBLIC_FB_PIXEL_ID=XXXXXXXXXX
    NEXT_PUBLIC_CLARITY_ID=XXXXXXXXXX
    ```

  - Criar `.env.local.example` com instruções
  - Atualizar README ou criar `docs/integrations.md`

  **Não fazer**:
  - Não commitar `.env.local` com valores reais
  - Não adicionar variáveis não utilizadas

  **Agente Recomendado**:

  > Category: `quick`
  > Reason: Documentação simples

  **Paralelismo**:
  - **Pode Rodar em Paralelo**: Sim
  - **Grupo**: Wave 4
  - **Bloqueia**: Nenhum
  - **Bloqueado Por**: Nenhum

  **Referências**:

  ```bash
  # .env.example
  RD_STATION_API_KEY=your_api_key_here
  RD_STATION_CONVERSION_IDENTIFIER=LP Diagnóstico Digital
  NEXT_PUBLIC_GA_ID=
  NEXT_PUBLIC_FB_PIXEL_ID=
  NEXT_PUBLIC_CLARITY_ID=
  ```

  **Critérios de Aceitação**:

  Scenario: .env.example Contains All Variables
  Tool: Bash (cat)
  Steps: 1. cat .env.example 2. Verify RD*STATION_API_KEY present 3. Verify all NEXT_PUBLIC*\* present
  Expected Result: All 5 variables documented
  Evidence: .sisyphus/evidence/task-9-env-example.txt

  Scenario: README Updated
  Tool: Bash (grep)
  Steps: 1. grep "RD_STATION" README.md or docs/integrations.md
  Expected Result: Documentation mentions integration
  Evidence: .sisyphus/evidence/task-9-readme.txt

  **Commit**: YES
  - Message: `docs: add environment variables and integration documentation`
  - Files: `.env.example`, `docs/integrations.md` (or README.md)

---

- [ ] 10. QA Final e Validação End-to-End

  **O que fazer**:
  - Rodar todos os cenários de QA
  - Verificar env vars funcionando com valores reais
  - Testar em modo production build (`npm run build && npm run start`)
  - Verificar que não há console errors
  - Verificar que scripts carregam na ordem correta

  **Não fazer**:
  - Não pular nenhum cenário de QA
  - Não usar `npm run dev` para validação final (usar production build)

  **Agente Recomendado**:

  > Category: `unspecified-high`
  > Reason: QA completo, validação de integração

  **Paralelismo**:
  - **Pode Rodar em Paralelo**: Não
  - **Grupo**: Wave 4 (Final)
  - **Bloqueia**: Nenhum
  - **Bloqueado Por**: Todas as tasks anteriores

  **QA Scenarios**:

  Scenario: Complete Happy Path E2E
  Tool: Playwright
  Preconditions: All env vars set with real values
  Steps: 1. Build production (`npm run build && npm run start`) 2. Navigate to page 3. Fill all form fields 4. Check LGPD checkbox 5. Submit form 6. Verify success card appears 7. Verify tracking events fired (check network)
  Expected Result: Lead created in RD Station, tracking events fired
  Evidence: .sisyphus/evidence/task-10-e2e-full.png

  Scenario: Form Without LGPD Consent
  Tool: Playwright
  Steps: 1. Navigate to page 2. Fill all form fields 3. DO NOT check LGPD checkbox 4. Try to submit
  Expected Result: Error message "Você precisa aceitar os termos"
  Evidence: .sisyphus/evidence/task-10-lgpd-error.png

  Scenario: Production Build No Console Errors
  Tool: Playwright
  Steps: 1. Build production 2. Navigate through all sections 3. Check browser console for errors
  Expected Result: Zero console errors
  Failure Indicators: Any red console errors
  Evidence: .sisyphus/evidence/task-10-console-clean.txt

  Scenario: All Scripts Load on Production
  Tool: Playwright
  Preconditions: All env vars set
  Steps: 1. Build production 2. Navigate to page 3. Check DOM for GA script 4. Check DOM for FB pixel 5. Check DOM for Clarity script
  Expected Result: All scripts present in correct order
  Evidence: .sisyphus/evidence/task-10-scripts-order.html

  **Commit**: YES
  - Message: `test: final qa and e2e validation`
  - Files: N/A (QA only, may create evidence files)

---

## Commit Strategy

Commits atômicos por feature:

1. `feat(api): add rd-conversion endpoint with validation`
2. `feat(api): integrate rd station conversion api with error handling`
3. `feat(types): add analytics types and lead tracking utility`
4. `feat(form): add lgpd consent checkbox with validation`
5. `feat(form): integrate api route and tracking on submission`
6. `feat(analytics): add conditional analytics component for ga4, meta pixel, and clarity`
7. `feat(analytics): add trackLeadSubmission utility function`
8. `feat(form): integrate trackLeadSubscription on form submit`
9. `docs: add environment variables and integration documentation`
10. `test: final qa and e2e validation`

---

## Critérios de Sucesso

### Verificação Final

```bash
# 1. API Route funcionando
curl -X POST http://localhost:3000/api/rd-conversion \
  -H "Content-Type: application/json" \
  -d '{"nome":"Teste","telefone":"11999999999","email":"test@example.com"}'# Expected: {"success":true}

# 2. Formulário envia com LGPD
# (Playwright E2E test)

# 3. Tracking events disparam
# (Network interception verification)

# 4. Production build sem erros
npm run build && npm run start
# Expected: Build successful, no runtime errors
```

### Checklist Final

- [ ] RD Station API integrada e testada
- [ ] Checkbox LGPD obrigatório funcionando
- [ ] Telefone normalizado para E.164
- [ ] Debounce de 2s no submit
- [ ] Timeout de 10s no fetch
- [ ] Erros silenciosos (log server-side)
- [ ] GA4 carrega condicionalmente
- [ ] Meta Pixel carrega condicionalmente
- [ ] Clarity carrega condicionalmente
- [ ] trackLeadSubmission executa após submit
- [ ] .env.example documentado
- [ ] README/docs atualizados
- [ ] QA E2E passou em production build
