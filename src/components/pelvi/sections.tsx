import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ClipboardList,
  Download,
  MessageCircle,
  PauseCircle,
  ShieldCheck,
  Smartphone,
  Stethoscope,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
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

type Item = { icon: LucideIcon; title: string; text: string };

function ItemList({ items }: { items: Item[] }) {
  return (
    <ul className="mt-8 space-y-6">
      {items.map(({ icon: Icon, title, text }) => (
        <li key={title} className="flex gap-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
            <Icon className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-1 text-base leading-relaxed text-muted-foreground">{text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function Split({
  id,
  eyebrow,
  title,
  items,
  screen,
  alt,
  flip = false,
  muted = false,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  items: Item[];
  screen: "evolucoes" | "agenda";
  alt: string;
  flip?: boolean;
  muted?: boolean;
}) {
  return (
    <section id={id} className={`sec ${muted ? "bg-muted/60" : ""}`}>
      <div className="wrap grid items-center gap-10 lg:grid-cols-12 lg:gap-x-6">
        <div className={flip ? "lg:col-span-5 lg:col-start-8 lg:row-start-1" : "lg:col-span-5"}>
          {eyebrow && (
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-primary">
              {eyebrow}
            </p>
          )}
          <h2 className={h2}>{title}</h2>
          <ItemList items={items} />
        </div>
        <div className={flip ? "lg:col-span-7 lg:row-start-1" : "lg:col-span-7 lg:col-start-6"}>
          <Screen name={screen} alt={alt} />
        </div>
      </div>
    </section>
  );
}

export function Prontuario() {
  return (
    <Split
      id="produto"
      eyebrow="O que o soupelvi faz por você"
      title="Prontuário feito para saúde pélvica"
      items={[
        {
          icon: ClipboardList,
          title: "Anamnese estruturada",
          text: "Fichas pélvica geral e gestação, com seções objetivas e orientações de “o que investigar” ao lado de cada campo. Rascunho com salvamento automático e histórico de revisões.",
        },
        {
          icon: Stethoscope,
          title: "Exame físico completo",
          text: "Inspeção, avaliação neurológica, mobilidade de tecidos, função do assoalho pélvico, dor, exames complementares e diagnóstico cinesiológico funcional, tudo em um único registro.",
        },
        {
          icon: TrendingUp,
          title: "Evolução com técnicas aplicadas",
          text: "Cada evolução fica ligada à consulta e às técnicas usadas. Você monta o catálogo de técnicas de cada procedimento e acompanha a linha do tempo da paciente.",
        },
      ]}
      screen="evolucoes"
      alt="Evoluções clínicas de uma paciente em linha do tempo, com o atendimento vinculado e o botão de exportar PDF"
    />
  );
}

export function Rotina() {
  return (
    <Split
      id="rotina"
      flip
      muted
      title="A rotina de quem atende"
      items={[
        {
          icon: CalendarDays,
          title: "Agenda que acompanha seu dia",
          text: "Visão de dia, semana e mês, blocos proporcionais à duração, remarcação arrastando e filtro por profissional. Avisa quando há conflito de horário.",
        },
        {
          icon: MessageCircle,
          title: "Confirmação por WhatsApp em um clique",
          text: "A mensagem já sai pronta, com nome, data, hora e profissional. Você personaliza o texto e envia pelo seu WhatsApp.",
        },
      ]}
      screen="agenda"
      alt="Agenda da semana com atendimentos marcados por dia e horário"
    />
  );
}

export function Finance() {
  return (
    <section id="financeiro" className="sec">
      <div className="wrap">
        <h2 className={h2}>Financeiro simples</h2>
        <p className={`${lead} max-w-4xl`}>
          <span className="lg:block">
            Receitas e despesas, resumo do mês, parcelamento e baixa direto na tela.
          </span>{" "}
          <span className="lg:block">Dá para receber a consulta a partir da própria agenda.</span>
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

export function Security() {
  const cards: Item[] = [
    {
      icon: ShieldCheck,
      title: "Pensado para a LGPD",
      text: "Registro da base legal dos dados sensíveis, aceite de termos com histórico e consentimento da paciente.",
    },
    {
      icon: Download,
      title: "Seus dados são seus",
      text: "Exporte um pacote completo com os seus dados quando quiser, inclusive depois do encerramento do contrato.",
    },
  ];
  return (
    <section id="seguranca" className="sec bg-muted/60">
      <div className="wrap">
        <h2 className={h2}>Segurança e dados</h2>
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {cards.map(({ icon: Icon, title, text }) => (
            <li
              key={title}
              className="rounded-2xl border border-border bg-card p-6 shadow-card md:p-8"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary-soft text-primary">
                <Icon className="h-6 w-6" aria-hidden />
              </span>
              <h3 className="mt-5 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ComingSoon() {
  return (
    <section id="em-breve" className="sec on-dark text-white" style={heroGround}>
      <div className="wrap grid items-center gap-8 lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-5">
          <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-white">
            <Smartphone className="h-4 w-4" aria-hidden /> Em breve
          </p>
          <h2 className={h2}>Portal e app da paciente</h2>
        </div>
        <p className="text-pretty text-lg leading-relaxed text-white/80 lg:col-span-7 lg:col-start-6">
          A paciente acessa suas consultas e seu plano de tratamento, e registra o diário miccional
          e o diário evacuatório em casa. Você acompanha tudo no prontuário.
        </p>
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
                ["#produto", "Prontuário"],
                ["#rotina", "Rotina"],
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
