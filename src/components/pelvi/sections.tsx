import {
  CalendarDays, FileHeart, History, Package, Users, Stethoscope,
  Wallet, Building2, Sparkles, Check, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { DashboardMockup } from "./DashboardMockup";
import clinicImg from "@/assets/clinic.jpg";
import marinaImg from "@/assets/marina.jpg";

/* HERO */
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/15 blur-3xl" aria-hidden />
      <div className="absolute top-40 -right-24 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" aria-hidden />
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-24 lg:pt-24 lg:pb-32 grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-soft text-accent-foreground text-xs font-medium">
            <Sparkles className="h-3 w-3" /> Feito para fisioterapia pélvica
          </span>
          <h1 className="mt-6 text-5xl md:text-6xl lg:text-[4.25rem] leading-[1.05] font-semibold text-foreground">
            Gestão para quem entende a complexidade de ser{" "}
            <span className="text-primary">Pelvi.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
            Um sistema completo de agendamento, prontuário e financeiro feito sob medida para a fisioterapia pélvica — para você cuidar das suas pacientes sem se perder em planilhas, agendas de papel ou ferramentas que não falam a sua língua.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button asChild size="lg" className="rounded-full px-7 h-12 text-base shadow-soft">
              <a href="#planos">Começar grátis por 14 dias</a>
            </Button>
            <Button asChild variant="ghost" size="lg" className="rounded-full h-12 text-base">
              <a href="#recursos">Ver demonstração →</a>
            </Button>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            Sem cartão de crédito · LGPD-ready · Suporte humano em português
          </p>
        </div>
        <div className="animate-fade-up" style={{ animationDelay: "120ms" }}>
          <DashboardMockup />
        </div>
      </div>
    </section>
  );
}

/* PAINS */
const pains = [
  { t: "Sessões longas e seriadas", d: "Tratamentos pélvicos raramente são consulta única. Você precisa acompanhar pacotes, sessões consumidas, evolução semana a semana." },
  { t: "Prontuário sensível, intimidade real", d: "Anamneses pélvicas pedem sigilo, profundidade e flexibilidade que formulários genéricos não entregam." },
  { t: "Você é a clínica inteira", d: "Atende, agenda, cobra, registra evolução e ainda gerencia recepcionista (quando tem). Precisa de uma ferramenta que respeite isso." },
];

export function Pains() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight">
            A rotina da fisio pélvica é única.<br />
            <span className="text-primary">Sua gestão também deveria ser.</span>
          </h2>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {pains.map((p) => (
            <div key={p.t} className="rounded-3xl bg-card p-8 border border-border/60 shadow-card hover:-translate-y-1 hover:shadow-soft transition-all duration-300">
              <div className="h-10 w-10 rounded-2xl bg-primary/15 grid place-items-center mb-5">
                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{p.t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* FEATURES */
const features = [
  { i: CalendarDays, t: "Agenda inteligente", d: "Visualizações por dia, semana e mês. Arraste e solte para reagendar. Bloqueio de horários por profissional. Status: agendado, confirmado, cancelado, realizado. Ideal para encaixar avaliações pélvicas longas e sessões de retorno mais curtas no mesmo dia." },
  { i: FileHeart, t: "Prontuário com anamnese flexível", d: "Estrutura adaptável para anamneses uroginecológicas, obstétricas, oncológicas ou de dor pélvica. Cada clínica modela o seu jeito." },
  { i: History, t: "Linha do tempo de evoluções", d: "Acompanhe cada paciente em formato de timeline clínica. Veja a jornada completa do tratamento em uma rolagem." },
  { i: Package, t: "Pacotes de tratamento", d: "Crie pacotes de sessões com parcelamento automático no financeiro. O sistema desconta sessões usadas a cada atendimento." },
  { i: Users, t: "Cadastro completo de pacientes", d: "Busca rápida, paginação, dados sigilosos protegidos, histórico de atendimentos integrado." },
  { i: Stethoscope, t: "Gestão de procedimentos", d: "Cadastre cada serviço com duração e valor próprios — avaliação, reabilitação do assoalho pélvico, biofeedback, eletroestimulação, etc." },
  { i: Wallet, t: "Financeiro descomplicado", d: "Lance entradas e saídas, vincule à paciente e ao agendamento, dê baixa em pagamentos com um clique, veja o resumo do mês com saldo, recebido, pendente e despesas." },
  { i: Building2, t: "Multi-clínica e multi-profissional", d: "Atua em mais de um espaço? Faça login com o mesmo CPF e troque de contexto em segundos. Dados isolados por clínica. Permissões por papel: admin, profissional, recepção." },
];

export function Features() {
  return (
    <section id="recursos" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">Recursos</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold text-foreground leading-tight">
            Tudo o que você precisa, num só lugar.
          </h2>
        </div>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map(({ i: Icon, t, d }) => (
            <div key={t} className="rounded-3xl p-6 bg-card border border-border/60 hover:border-primary/40 hover:shadow-card transition-all duration-300 group">
              <div className="h-11 w-11 rounded-2xl bg-primary-soft grid place-items-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* AUDIENCE */
const profiles = [
  { t: "Fisio pélvica autônoma", d: "Quer parar de viver entre planilhas, WhatsApp e agenda de papel." },
  { t: "Clínicas de saúde da mulher", d: "Múltiplas profissionais, recepção, controle financeiro real." },
  { t: "Especialistas em uroginecologia e oncologia pélvica", d: "Precisam de prontuário sensível e linha do tempo clínica robusta." },
  { t: "Profissionais que atendem em mais de um lugar", d: "Consultório próprio + clínica parceira, sem precisar de duas ferramentas." },
];

export function Audience() {
  return (
    <section id="para-quem" className="py-24 bg-muted/50 relative overflow-hidden">
      <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl" aria-hidden />
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-5 gap-12 items-center">
        <div className="lg:col-span-2">
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">Para quem é</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold text-foreground leading-tight">
            Para quem é o Pelvi.
          </h2>
          <div className="mt-8 rounded-3xl overflow-hidden shadow-soft">
            <img src={clinicImg} alt="Consultório acolhedor de fisioterapia pélvica" className="w-full h-72 object-cover" loading="lazy" width={1024} height={1024} />
          </div>
        </div>
        <div className="lg:col-span-3 grid sm:grid-cols-2 gap-5">
          {profiles.map((p) => (
            <div key={p.t} className="rounded-3xl bg-card p-7 border border-border/60 hover:-translate-y-1 transition-transform shadow-card">
              <div className="h-2 w-12 rounded-full bg-primary mb-5" />
              <h3 className="text-xl font-semibold mb-2">{p.t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* HOW */
const steps = [
  { n: "1", t: "Crie sua clínica", d: "Cadastro em menos de 2 minutos. Você define os procedimentos, equipe e horários." },
  { n: "2", t: "Importe ou cadastre suas pacientes", d: "Comece com o histórico que já tem, no seu ritmo." },
  { n: "3", t: "Atenda com tranquilidade", d: "Agenda, prontuário, financeiro e evolução em um lugar só, do celular ou do computador." },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">Como funciona</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold text-foreground leading-tight">
            Três passos. Sem fricção.
          </h2>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-6 relative">
          {steps.map((s, i) => (
            <div key={s.n} className="relative">
              <div className="rounded-3xl p-8 bg-card border border-border/60 h-full shadow-card">
                <div className="text-6xl text-primary/30 leading-none mb-4">{s.n}</div>
                <h3 className="text-xl font-semibold mb-2">{s.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 h-px w-6 bg-border" aria-hidden />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* COMPARE */
const compareRows = [
  ["Pensado para fisio pélvica", false, true],
  ["Pacotes de sessões com parcelamento", false, true],
  ["Anamnese flexível por especialidade", "Limitada", true],
  ["Multi-clínica com mesmo CPF", "Raro", true],
  ["Suporte que entende sua rotina", false, true],
  ["Interface em PT-BR feita aqui", "Tradução", true],
] as const;

export function Compare() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="mx-auto max-w-5xl px-6">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">Diferenciais</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold text-foreground leading-tight">
            Por que Pelvi e não um sistema genérico?
          </h2>
        </div>
        <div className="mt-12 rounded-3xl overflow-hidden border border-border/60 bg-card shadow-card">
          <div className="grid grid-cols-3 bg-muted/40 px-6 py-4 text-sm font-medium">
            <div></div>
            <div className="text-center text-muted-foreground">Genéricos</div>
            <div className="text-center text-primary text-base">Pelvi</div>
          </div>
          {compareRows.map(([label, generic, pelvi]) => (
            <div key={label as string} className="grid grid-cols-3 px-6 py-4 border-t border-border/60 items-center text-sm">
              <div>{label}</div>
              <div className="text-center text-muted-foreground">
                {typeof generic === "boolean"
                  ? (generic ? <Check className="h-4 w-4 text-secondary inline" /> : <X className="h-4 w-4 inline opacity-50" />)
                  : <span className="text-xs">{generic}</span>}
              </div>
              <div className="text-center">
                {typeof pelvi === "boolean"
                  ? (pelvi ? <Check className="h-5 w-5 text-primary inline" /> : <X className="h-4 w-4 inline opacity-50" />)
                  : <span className="text-xs">{pelvi}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* TESTIMONIAL */
export function Testimonial() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <img src={marinaImg} alt="Dra. Marina Toledo" className="mx-auto h-24 w-24 rounded-full object-cover shadow-soft" loading="lazy" width={512} height={512} />
        <blockquote className="mt-8 text-2xl md:text-3xl leading-snug text-foreground italic">
          “Antes eu perdia uma manhã inteira por semana só organizando recibos e remarcações. Hoje o Pelvi faz isso pra mim — e ainda me lembra qual paciente está na quinta sessão do pacote.”
        </blockquote>
        <div className="mt-6 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Dra. Marina Toledo</p>
          <p>Fisioterapeuta pélvica · Belo Horizonte/MG</p>
        </div>
      </div>
    </section>
  );
}

/* PRICING */
const plans = [
  {
    name: "Essencial", price: "79", featured: false,
    items: ["1 profissional", "Até 100 pacientes", "Agenda, prontuário, financeiro", "Suporte por e-mail"],
  },
  {
    name: "Profissional", price: "149", featured: true, badge: "Mais popular",
    items: ["Até 3 profissionais", "Pacientes ilimitadas", "Pacotes de tratamento", "Multi-clínica", "Suporte prioritário"],
  },
  {
    name: "Clínica", price: "279", featured: false,
    items: ["Profissionais ilimitados", "Recepção + admin", "Relatórios financeiros", "Suporte dedicado por WhatsApp"],
  },
];

export function Pricing() {
  return (
    <section id="planos" className="py-24 bg-muted/50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">Planos</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold text-foreground leading-tight">
            Comece pequeno. Cresça sem trocar de ferramenta.
          </h2>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`rounded-3xl p-8 border flex flex-col ${
                p.featured
                  ? "bg-primary text-primary-foreground border-primary shadow-soft md:scale-105"
                  : "bg-card border-border/60 shadow-card"
              }`}
            >
              {p.featured && (
                <span className="inline-flex w-fit px-3 py-1 rounded-full bg-background/20 text-xs font-medium mb-4">
                  {p.badge}
                </span>
              )}
              <h3 className="text-2xl font-semibold">{p.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-sm opacity-80">R$</span>
                <span className="text-5xl font-semibold">{p.price}</span>
                <span className="text-sm opacity-80">/mês</span>
              </div>
              <ul className="mt-6 space-y-3 flex-1">
                {p.items.map((it) => (
                  <li key={it} className="flex items-start gap-2 text-sm">
                    <Check className={`h-4 w-4 mt-0.5 shrink-0 ${p.featured ? "" : "text-primary"}`} />
                    <span className={p.featured ? "" : "text-muted-foreground"}>{it}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className={`mt-8 rounded-full h-11 ${
                  p.featured
                    ? "bg-background text-primary hover:bg-background/90"
                    : ""
                }`}
              >
                <a href="#">Começar 14 dias grátis</a>
              </Button>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Sem fidelidade. Cancele quando quiser. Migração de dados gratuita no primeiro mês.
        </p>
      </div>
    </section>
  );
}

/* FAQ */
const faqs = [
  ["Preciso ser de fisio pélvica para usar?", "Não, mas o Pelvi foi desenhado pensando em vocês. Outras especialidades de consultório (psicologia, fonoaudiologia, nutrição) também se beneficiam."],
  ["Meus dados ficam seguros?", "Sim. Banco de dados isolado por clínica, autenticação JWT e práticas alinhadas à LGPD."],
  ["Posso usar no celular?", "Sim, totalmente responsivo. Atenda da maca, do consultório ou da sala de espera."],
  ["Funciona offline?", "Não. O Pelvi é 100% web, mas nosso uptime é > 99,9%."],
  ["Como faço para migrar minha agenda atual?", "A gente te ajuda. No primeiro mês a migração é gratuita."],
  ["Tem aplicativo para a paciente?", "Por enquanto não. O foco do Pelvi é a profissional. Lembretes para pacientes via WhatsApp estão no roadmap."],
];

export function FAQ() {
  return (
    <section id="faq" className="py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">Perguntas frequentes</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold text-foreground leading-tight">
            Boas dúvidas, respostas francas.
          </h2>
        </div>
        <Accordion type="single" collapsible className="mt-12 rounded-3xl bg-card border border-border/60 px-6 shadow-card">
          {faqs.map(([q, a], i) => (
            <AccordionItem key={q} value={`item-${i}`} className="border-border/60">
              <AccordionTrigger className="text-base text-left hover:no-underline">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/* FINAL CTA */
export function FinalCTA() {
  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-primary text-primary-foreground px-8 py-20 text-center relative overflow-hidden">
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-background/10 blur-3xl" aria-hidden />
        <div className="absolute -bottom-24 -right-10 h-80 w-80 rounded-full bg-background/5 blur-3xl" aria-hidden />
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight max-w-3xl mx-auto relative">
          Sua rotina merece uma ferramenta que entende você.
        </h2>
        <Button asChild size="lg" className="mt-10 rounded-full bg-background text-primary hover:bg-background/90 h-14 px-10 text-base relative">
          <a href="#">Começar gratuitamente</a>
        </Button>
        <p className="mt-5 text-sm opacity-80 relative">14 dias grátis. Sem cartão. Sem letrinhas miúdas.</p>
      </div>
    </section>
  );
}

/* FOOTER */
export function Footer() {
  const cols = [
    { t: "Produto", l: ["Recursos", "Planos", "Demonstração", "Roadmap"] },
    { t: "Empresa", l: ["Sobre", "Blog", "Contato"] },
    { t: "Legal", l: ["Termos", "Privacidade", "LGPD"] },
  ];
  return (
    <footer className="border-t border-border/60 bg-muted/50">
      <div className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-full bg-primary/15 grid place-items-center">
              <span className="h-3 w-3 rounded-full bg-primary" />
            </span>
            <span className="text-2xl font-semibold text-foreground">Pelvi</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs leading-relaxed">
            Gestão clínica feita para quem cuida da saúde pélvica.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.t}>
            <h4 className="text-sm font-semibold mb-4">{c.t}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {c.l.map((it) => (
                <li key={it}><a href="#" className="hover:text-foreground transition-colors">{it}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-6 text-xs text-muted-foreground text-center">
          © 2026 Pelvi · Feito no Brasil para quem cuida da saúde pélvica.
        </div>
      </div>
    </footer>
  );
}