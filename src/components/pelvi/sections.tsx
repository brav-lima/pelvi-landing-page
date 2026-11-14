import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, PauseCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import SpecularButton from "@/components/ui/specular-button";
import { specularPlum } from "@/lib/specular";
import { Logo } from "@/components/pelvi/Logo";
import { Screen, StepsFragment } from "@/components/pelvi/product-ui";
import { SIGNUPS_PAUSED } from "@/lib/signups";
import {
  ANNUAL_LIST_PRICE,
  PURPLE_FRIDAY,
  annualCashPrice,
  annualInstallment,
  annualPrice,
  formatBRL,
} from "@/lib/promo";

/* ------------------------------------------------------------------ */
/* AÇÃO PRINCIPAL                                                       */
/* ------------------------------------------------------------------ */
export function SignupButton({ className = "" }: { className?: string }) {
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
    <SpecularButton
      as={Link}
      to="/cadastro"
      size="md"
      {...specularPlum}
      className={`min-h-12 w-full sm:w-auto ${className}`}
    >
      Testar por 14 dias <ArrowRight className="h-4 w-4" aria-hidden />
    </SpecularButton>
  );
}

const heroGround = {
  backgroundColor: "hsl(296 28% 12%)",
  backgroundImage:
    "radial-gradient(circle 520px at 0% 0%, hsl(296 28% 32% / 0.35), transparent 70%), radial-gradient(circle 460px at 100% 100%, hsl(296 28% 22% / 0.5), transparent 70%)",
} as const;

/* ------------------------------------------------------------------ */
/* HERO — promessa no topo e o sistema logo abaixo                      */
/* ------------------------------------------------------------------ */
export function Hero() {
  return (
    <section
      id="top"
      className="sec on-dark overflow-hidden text-white !pt-[112px] lg:!pt-[136px] !pb-0"
      style={heroGround}
    >
      <div className="wrap hero-text">
        <div className="animate-fade-up">
          <div className="mb-5 flex flex-col gap-1.5 text-sm text-white sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
            <p className="flex items-center gap-2 font-semibold">
              <Check className="h-4 w-4 text-white" aria-hidden />
              Um único plano, com tudo liberado
            </p>
            {PURPLE_FRIDAY && (
              <p>
                Purple Friday: plano anual de {formatBRL(ANNUAL_LIST_PRICE)} por{" "}
                <strong className="ml-1 font-semibold">{formatBRL(annualPrice)}</strong>
              </p>
            )}
          </div>
          <h1 className="text-[2.5rem] font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-[4rem]">
            Feito pra quem vive a fisioterapia pélvica.
          </h1>
          <p className="mt-5 max-w-4xl text-lg leading-relaxed text-white/80">
            <span className="lg:block">
              Agenda, prontuário, evolução e financeiro no mesmo lugar,
            </span>{" "}
            <span className="lg:block">
              para você atender no consultório, na clínica ou no domicílio. Teste por 14&nbsp;dias.
            </span>
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
        <div className="mt-14 sm:mt-16">
          <Screen
            name="perfil"
            tone="dark"
            priority
            alt="Cadastro de uma paciente no sistema: histórico de consultas, resumo clínico e próximas consultas"
          />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* RECURSOS — uma tela real por recurso                                 */
/* ------------------------------------------------------------------ */
const h2 = "text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.75rem]";
const lead = "mt-4 text-pretty text-lg leading-relaxed text-muted-foreground";

export function Patients() {
  return (
    <section id="produto" className="sec">
      <div className="wrap">
        <h2 className={h2}>Pacientes, pacotes e próximas consultas</h2>
        <p className={`${lead} max-w-4xl`}>
          <span className="lg:block">
            Busque por nome, CPF ou telefone, filtre quem tem pacote ou está sem agendamento
          </span>{" "}
          <span className="lg:block">e acompanhe as sessões usadas de cada pacote.</span>
        </p>
        <div className="mt-10">
          <Screen
            name="pacientes"
            alt="Lista de pacientes com telefone, pacote de sessões com barra de progresso e próxima consulta"
          />
        </div>
      </div>
    </section>
  );
}

function Split({
  id,
  title,
  text,
  screen,
  alt,
  flip = false,
  muted = false,
}: {
  id: string;
  title: string;
  text: string;
  screen: "evolucoes" | "agenda";
  alt: string;
  flip?: boolean;
  muted?: boolean;
}) {
  return (
    <section id={id} className={`sec ${muted ? "bg-muted/60" : ""}`}>
      <div className="wrap grid items-center gap-10 lg:grid-cols-12 lg:gap-x-6">
        <div className={flip ? "lg:col-span-5 lg:col-start-8 lg:row-start-1" : "lg:col-span-5"}>
          <h2 className={h2}>{title}</h2>
          <p className={lead}>{text}</p>
        </div>
        <div className={flip ? "lg:col-span-7 lg:row-start-1" : "lg:col-span-7 lg:col-start-6"}>
          <Screen name={screen} alt={alt} />
        </div>
      </div>
    </section>
  );
}

export function Evolutions() {
  return (
    <Split
      id="recursos"
      muted
      title="Evolução clínica a cada sessão"
      text="Registre a evolução ligada ao atendimento, veja o histórico da paciente em ordem e exporte em PDF."
      screen="evolucoes"
      alt="Evoluções clínicas de uma paciente em linha do tempo, com o atendimento vinculado e o botão de exportar PDF"
    />
  );
}

export function Agenda() {
  return (
    <Split
      id="agenda"
      flip
      title="Agenda semanal para você"
      text="Veja a semana, o dia ou o mês, bloqueie horários e abra a paciente direto do atendimento."
      screen="agenda"
      alt="Agenda da semana com atendimentos marcados por dia e horário"
    />
  );
}

export function Finance() {
  return (
    <section id="financeiro" className="sec bg-muted/60">
      <div className="wrap">
        <h2 className={h2}>Financeiro por mês, sem planilha</h2>
        <p className={`${lead} max-w-4xl`}>
          <span className="lg:block">Receitas, despesas e faturas pendentes do mês,</span>{" "}
          <span className="lg:block">
            com o registro de cada pagamento por paciente e procedimento.
          </span>
        </p>
        <div className="mt-10">
          <Screen
            name="financeiro"
            alt="Financeiro do mês com receitas, despesas, faturas pendentes e a lista de registros financeiros"
          />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* PLANOS + DÚVIDAS                                                     */
/* ------------------------------------------------------------------ */
const faq = [
  {
    q: "Recursos incluídos",
    a: "Todos. A soupelvi tem um único plano, com tudo liberado: não há plano de entrada nem recurso vendido à parte.",
  },
  {
    q: "Cartão no período de teste",
    a: "Não. Você cria a conta com nome e e-mail e usa por 14 dias. O pagamento só aparece se você decidir contratar.",
  },
  {
    q: "Cadastro por e-mail",
    a: "Você recebe um link por e-mail, completa o seu cadastro e já entra na plataforma em período de teste.",
  },
  {
    q: "Pagamento depois do teste",
    a: "Dentro da plataforma, na área de assinatura. Você escolhe entre mensal e anual, e o anual aceita Pix, cartão à vista ou parcelado em até 12 vezes.",
  },
  {
    q: "Cancelamento do plano",
    a: "O cancelamento é feito dentro da plataforma, com uma prévia do valor a estornar antes de você confirmar.",
  },
  {
    q: "Dados das pacientes",
    a: "São tratados com sigilo, conforme a LGPD, e você pode exportar os seus dados. Leia a Política de privacidade abaixo.",
  },
];

export function Pricing() {
  return (
    <section id="planos" className="sec">
      <div className="wrap grid items-start gap-10 lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-5">
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.75rem]">
            Teste por 14&nbsp;dias
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Todo plano tem 14 dias de teste. Você só paga se decidir continuar.
          </p>
          <div className="mt-8">
            <StepsFragment />
          </div>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-xl font-semibold">Plano único, tudo liberado</h3>
              {PURPLE_FRIDAY && (
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground">
                  Purple Friday
                </span>
              )}
            </div>
            <p className="mt-2 text-base text-muted-foreground">
              Todos os recursos da plataforma em um só plano, no pagamento anual:
            </p>
            <p className="mt-4 flex flex-wrap items-baseline gap-x-3">
              {PURPLE_FRIDAY && (
                <span className="text-lg text-muted-foreground line-through">
                  {formatBRL(ANNUAL_LIST_PRICE)}
                </span>
              )}
              <span className="font-display text-5xl font-bold text-primary">
                {formatBRL(annualPrice)}
              </span>
              <span className="text-muted-foreground">por ano</span>
            </p>
            <ul className="mt-6 space-y-3 text-base">
              {[
                `À vista no Pix ou no cartão: ${formatBRL(annualCashPrice)} (10% de desconto)`,
                `Ou em até 12x de ${formatBRL(annualInstallment)} no cartão`,
                "Prefere pagar por mês? Escolha o mensal dentro da plataforma",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <SignupButton className="sm:w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" className="sec bg-muted/60">
      <div className="wrap grid items-start gap-10 lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-5">
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.75rem]">
            Perguntas frequentes
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Do cadastro ao cancelamento, o que você precisa saber antes de começar.
          </p>
        </div>
        <dl className="lg:col-span-7 lg:col-start-6">
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
      <div className="wrap">
        <h2 className="text-4xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
          Teste a soupelvi por 14&nbsp;dias.
        </h2>
        <p className="mt-6 max-w-4xl text-lg text-white/80">
          Crie sua conta com nome e e-mail e contrate só se fizer sentido para você.
        </p>
        <div className="mt-8">
          <SignupButton />
        </div>
        <div className="mt-20 flex flex-col gap-8 border-t border-white/15 pt-8 text-sm text-white/80 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex h-11 items-center">
              <Logo variant="horizontal-branco" className="h-7" />
            </div>
            <p className="mt-2">Feito pra quem vive a fisioterapia pélvica.</p>
            <address className="not-italic">Edifício Primavera Office | Florianópolis - SC</address>
          </div>
          <div className="md:text-right">
            <nav aria-label="Seções e documentos" className="flex flex-wrap gap-x-6 md:justify-end">
              {[
                ["#produto", "Pacientes"],
                ["#agenda", "Agenda"],
                ["#financeiro", "Financeiro"],
                ["#planos", "Planos"],
                ["#faq", "Perguntas"],
              ].map(([href, label]) => (
                <a key={href} href={href} className={legalLink}>
                  {label}
                </a>
              ))}
              <Link to="/termos" className={legalLink}>
                Termos de uso
              </Link>
              <Link to="/privacidade" className={legalLink}>
                Privacidade
              </Link>
            </nav>
            <p className="mt-2">© 2026 soupelvi · Feito no Brasil</p>
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
            <p>Feito pra quem vive a fisioterapia pélvica.</p>
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
