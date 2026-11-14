import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, PauseCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/pelvi/Logo";
import {
  AgendaFragment,
  AppWindow,
  AssessmentFragment,
  DocsFragment,
  EvolutionFragment,
  FinanceFragment,
  CheckoutWindow,
  PortalFragment,
  StepsFragment,
} from "@/components/pelvi/product-ui";
import { SIGNUPS_PAUSED } from "@/lib/signups";
import {
  ANNUAL_LIST_PRICE,
  BLACK_FRIDAY,
  annualCashPrice,
  annualInstallment,
  annualPrice,
  formatBRL,
} from "@/lib/promo";

/* ------------------------------------------------------------------ */
/* AÇÃO PRINCIPAL                                                       */
/* ------------------------------------------------------------------ */
export function SignupButton({
  className = "",
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "secondary";
}) {
  if (SIGNUPS_PAUSED) {
    return (
      <p
        role="status"
        className={`flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm text-zinc-900 ${className}`}
      >
        <PauseCircle className="h-5 w-5 text-primary shrink-0" aria-hidden />
        Os cadastros estão pausados neste momento.
      </p>
    );
  }
  return (
    <Button
      asChild
      size="lg"
      variant={variant}
      className={`h-12 w-full rounded-xl px-7 sm:w-auto transition-transform active:scale-[0.98] ${className}`}
    >
      <Link to="/cadastro">
        Testar por 14 dias <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
      </Link>
    </Button>
  );
}

const heroGround = {
  backgroundColor: "hsl(296 28% 12%)",
  backgroundImage:
    "radial-gradient(circle 520px at 0% 0%, hsl(296 28% 32% / 0.35), transparent 70%), radial-gradient(circle 460px at 100% 100%, hsl(296 28% 22% / 0.5), transparent 70%)",
} as const;

/* ------------------------------------------------------------------ */
/* HERO — uma tela: a promessa à esquerda, o produto à direita          */
/* ------------------------------------------------------------------ */
export function Hero() {
  return (
    <section
      id="top"
      className="sec on-dark text-white !pt-[104px] lg:!pt-[120px]"
      style={heroGround}
    >
      <div className="wrap">
        <div className="hero-text grid items-start gap-10 lg:grid-cols-12 lg:gap-x-6">
          <div className="animate-fade-up lg:col-span-5">
            {BLACK_FRIDAY && (
              <p className="mb-5 text-sm text-white">
                Black Friday: plano anual de {formatBRL(ANNUAL_LIST_PRICE)} por{" "}
                <strong className="ml-1 font-semibold">{formatBRL(annualPrice)}</strong>
              </p>
            )}
            <h1 className="text-[2.25rem] font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.25rem]">
              Gestão para fisioterapeutas pélvicas
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-white/80">
              Agenda, prontuário, evolução e financeiro no mesmo lugar, para atender no consultório,
              na clínica ou no domicílio. Teste por 14&nbsp;dias.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <SignupButton />
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 w-full rounded-xl border-white/30 bg-transparent px-7 text-white hover:bg-white/10 hover:text-white sm:w-auto"
              >
                <a href="#planos">Ver preços</a>
              </Button>
            </div>
          </div>
          <div className="hidden sm:block lg:col-span-7 lg:pt-2">
            <AppWindow compact />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* PRODUTO — a janela do app inteira                                    */
/* ------------------------------------------------------------------ */
export function Product() {
  return (
    <section id="produto" className="sec bg-muted/60">
      <div className="wrap">
        <h2 className="max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.75rem]">
          Prontuário da paciente ao lado da agenda
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Anamnese, exame físico, avaliação perineal e evolução ficam no cadastro da paciente, no
          mesmo lugar em que você vê o dia.
        </p>
        <div className="mt-10">
          <AppWindow />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* RECURSOS — duas seções de três cartões, cada um com sua tela        */
/* ------------------------------------------------------------------ */
type Feature = { title: string; text: string; visual: React.ReactNode };

function FeatureGrid({ items }: { items: Feature[] }) {
  return (
    <ul className="mt-12 grid gap-8 sm:mt-8 sm:gap-5 lg:mt-10 lg:grid-cols-3 lg:gap-6">
      {items.map((f) => (
        <li
          key={f.title}
          className="grid gap-5 rounded-2xl border border-border bg-card p-6 shadow-card transition-transform sm:p-5 duration-200 hover:-translate-y-0.5 sm:grid-cols-2 sm:items-center lg:flex lg:flex-col lg:items-stretch lg:gap-0"
        >
          {f.visual}
          <div className="lg:mt-5">
            <h3 className="text-xl font-semibold">{f.title}</h3>
            <p className="mt-2 text-base leading-relaxed text-muted-foreground">{f.text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function FeaturesClinical() {
  return (
    <section id="recursos" className="sec" style={{ "--hm": 2 } as React.CSSProperties}>
      <div className="wrap">
        <h2 className="max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.75rem]">
          Prontuário <span className="text-primary">feito para a fisioterapia pélvica</span>
        </h2>
        <FeatureGrid
          items={[
            {
              title: "Avaliação perineal",
              text: "Registre força, endurance e repetições em campos feitos para a fisioterapia pélvica.",
              visual: <AssessmentFragment />,
            },
            {
              title: "Evolução por sessão",
              text: "Acompanhe cada paciente sessão a sessão e volte ao histórico quando precisar.",
              visual: <EvolutionFragment />,
            },
            {
              title: "Portal da paciente",
              text: "Convide a paciente para ativar a conta e acompanhar o tratamento pelo celular.",
              visual: <PortalFragment />,
            },
          ]}
        />
      </div>
    </section>
  );
}

export function FeaturesRoutine() {
  return (
    <section id="rotina" className="sec bg-muted/60" style={{ "--hm": 2 } as React.CSSProperties}>
      <div className="wrap">
        <h2 className="max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.75rem]">
          Agenda, financeiro e documentos <span className="text-primary">da clínica</span>
        </h2>
        <FeatureGrid
          items={[
            {
              title: "Agenda",
              text: "Veja os atendimentos do dia e abra o prontuário direto do horário.",
              visual: <AgendaFragment />,
            },
            {
              title: "Financeiro",
              text: "Acompanhe o que foi pago e o que falta receber, sem planilha à parte.",
              visual: <FinanceFragment />,
            },
            {
              title: "Documentos",
              text: "Termos, recibos e orientações da paciente guardados junto do cadastro.",
              visual: <DocsFragment />,
            },
          ]}
        />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* PLANOS + DÚVIDAS                                                     */
/* ------------------------------------------------------------------ */
const faq = [
  {
    q: "Cartão no período de teste",
    a: "Não. Você cria a conta com nome e e-mail e usa por 14 dias. O pagamento só aparece se você decidir contratar.",
  },
  {
    q: "Cadastro por e-mail",
    a: "Você recebe um link por e-mail, informa os dados da clínica e já entra na plataforma em período de teste.",
  },
  {
    q: "Pagamento depois do teste",
    a: "Dentro da plataforma, pelo administrador da clínica. O plano anual aceita Pix, cartão à vista ou parcelado em até 12 vezes. Também há plano mensal.",
  },
  {
    q: "Cancelamento do plano",
    a: "O cancelamento é feito dentro da plataforma, com uma prévia do valor a estornar antes de você confirmar.",
  },
  {
    q: "Dados das pacientes",
    a: "São tratados com sigilo, conforme a LGPD, e você pode exportar os dados da clínica. Leia a Política de privacidade abaixo.",
  },
];

export function Pricing() {
  return (
    <section id="planos" className="sec" style={{ "--hm": 2 } as React.CSSProperties}>
      <div className="wrap grid items-start gap-10 lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-5">
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.75rem]">
            Plano anual com 14&nbsp;dias de teste
          </h2>
          <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-xl font-semibold">Plano anual</h3>
              {BLACK_FRIDAY && (
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground">
                  Black Friday
                </span>
              )}
            </div>
            <p className="mt-4 flex flex-wrap items-baseline gap-x-3">
              {BLACK_FRIDAY && (
                <span className="text-lg text-muted-foreground line-through">
                  {formatBRL(ANNUAL_LIST_PRICE)}
                </span>
              )}
              <span className="font-display text-4xl font-bold text-primary">
                {formatBRL(annualPrice)}
              </span>
              <span className="text-muted-foreground">por ano</span>
            </p>
            <ul className="mt-5 space-y-2.5 text-base">
              {[
                `À vista no Pix ou no cartão: ${formatBRL(annualCashPrice)} (10% de desconto)`,
                `Ou em até 12x de ${formatBRL(annualInstallment)} no cartão`,
                "14 dias de teste antes de pagar",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <SignupButton className="sm:w-full" />
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <CheckoutWindow
            price={formatBRL(annualPrice)}
            cashPrice={formatBRL(annualCashPrice)}
            installment={`12x de ${formatBRL(annualInstallment)}`}
          />
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" className="sec bg-muted/60" style={{ "--hm": 2 } as React.CSSProperties}>
      <div className="wrap grid items-start gap-10 lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-5">
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.75rem]">
            Perguntas frequentes
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Do cadastro ao cancelamento, o caminho em três passos.
          </p>
          <div className="mt-8">
            <StepsFragment />
          </div>
        </div>
        <dl className="grid gap-x-8 md:grid-cols-2 lg:col-span-7 lg:col-start-6 lg:grid-cols-1">
          {faq.map((f) => (
            <div key={f.q} className="border-b border-border py-4 first:pt-0 md:py-5">
              <dt className="text-lg font-semibold">{f.q}</dt>
              <dd className="mt-2 text-base leading-relaxed text-muted-foreground">{f.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FECHAMENTO + RODAPÉ — uma tela                                       */
/* ------------------------------------------------------------------ */
const legalLink = "inline-flex min-h-11 items-center hover:underline underline-offset-4";

export function Closing() {
  return (
    <footer className="sec closing on-dark text-white" style={heroGround}>
      <div className="wrap flex h-full min-h-[calc(100svh-168px)] flex-col justify-between gap-12 lg:min-h-0">
        <div>
          <h2 className="max-w-4xl text-4xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
            Teste a soupelvi por 14&nbsp;dias.
          </h2>
          <p className="mt-6 max-w-xl text-lg text-white/80">
            Crie sua conta com nome e e-mail e contrate só se fizer sentido para a sua clínica.
          </p>
          <div className="mt-8">
            <SignupButton />
          </div>
        </div>
        <div className="grid items-start gap-8 border-t border-white/15 pt-8 text-sm text-white/80 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-5">
            <div className="flex h-11 items-center">
              <Logo variant="horizontal-branco" className="h-7" />
            </div>
            <p className="mt-2">Gestão para fisioterapeutas pélvicas.</p>
            <address className="not-italic">Edifício Primavera Office | Florianópolis - SC</address>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <nav aria-label="Seções" className="flex flex-wrap gap-x-6">
              {[
                ["#produto", "Produto"],
                ["#recursos", "Recursos"],
                ["#planos", "Planos"],
                ["#faq", "Perguntas"],
              ].map(([href, label]) => (
                <a key={href} href={href} className={legalLink}>
                  {label}
                </a>
              ))}
            </nav>
            <nav aria-label="Documentos legais" className="flex gap-6">
              <Link to="/termos" className={legalLink}>
                Termos de uso
              </Link>
              <Link to="/privacidade" className={legalLink}>
                Privacidade
              </Link>
            </nav>
            <p>© 2026 soupelvi · Feito no Brasil</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* Rodapé simples das páginas internas (termos, privacidade). */
export function Footer() {
  return (
    <footer className="on-dark text-white/80" style={{ background: "hsl(296 28% 18%)" }}>
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-4 text-center md:grid-cols-3 md:items-center">
          <div className="md:text-left">
            <Logo variant="horizontal-branco" className="inline-block h-7" />
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <p>Gestão para fisioterapeutas pélvicas.</p>
            <address className="not-italic">Edifício Primavera Office | Florianópolis - SC</address>
          </div>
          <div className="flex flex-col gap-1 text-sm md:items-end">
            <nav aria-label="Documentos legais" className="flex justify-center gap-4">
              <Link to="/termos" className={legalLink}>
                Termos de uso
              </Link>
              <Link to="/privacidade" className={legalLink}>
                Privacidade
              </Link>
            </nav>
            <p>© 2026 soupelvi · Feito no Brasil</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
