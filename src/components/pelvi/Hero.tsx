import { ClipboardCheck, MessageCircle, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Screen } from "@/components/pelvi/product-ui";
import { SignupButton } from "@/components/pelvi/sections";
import { ANNUAL_LIST_PRICE, PURPLE_FRIDAY, annualPrice, formatBRL } from "@/lib/promo";
import "./hero.css";

/* Hero escuro: título riscado à caneta, fundo vivo e cartões flutuantes sobre o sistema. */

const OVERLAP = "6rem";

const cards = [
  {
    icon: MessageCircle,
    title: "Confirmação enviada",
    text: "Mensagem pronta pelo WhatsApp",
    pos: "lg:-left-10 lg:top-[14%]",
    delay: "2.2s",
  },
  {
    icon: ClipboardCheck,
    title: "Anamnese salva",
    text: "Rascunho automático, sem perder nada",
    pos: "lg:-right-10 lg:-top-[2%]",
    delay: "2.5s",
  },
  {
    icon: Wallet,
    title: "Consulta recebida",
    text: "Direto da agenda",
    pos: "lg:-right-6 lg:top-[36%]",
    delay: "2.8s",
  },
];

/* Risco à caneta: dois traços irregulares desenhados em sequência sobre a palavra. */
function Strike({ children, delay = "0.9s" }: { children: string; delay?: string }) {
  return (
    <span className="hp-strike" style={{ ["--d" as string]: delay }}>
      {children}
      <svg
        aria-hidden
        className="hp-pen"
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
        fill="none"
      >
        <path d="M1 13 C 18 6, 36 15, 56 8 S 86 9, 99 4" />
        <path className="hp-pen-2" d="M4 16 C 28 10, 50 17, 72 11 S 92 12, 98 9" />
      </svg>
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="sec on-dark relative !pt-[112px] lg:!pt-[136px] text-white"
      style={{
        paddingBottom: OVERLAP,
        background: `linear-gradient(to bottom, hsl(296 28% 10%) calc(100% - ${OVERLAP}), var(--background) calc(100% - ${OVERLAP}))`,
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 overflow-hidden"
        style={{ bottom: OVERLAP }}
      >
        <div className="hp-blob hp-blob-a" />
        <div className="hp-blob hp-blob-b" />
        <div className="hp-blob hp-blob-c" />
      </div>

      <div className="wrap relative text-center">
        <div className="animate-fade-up">
          {PURPLE_FRIDAY && (
            <p className="mx-auto mb-6 inline-flex flex-wrap items-center justify-center gap-x-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-medium text-white">
              Purple Friday: plano anual de {formatBRL(ANNUAL_LIST_PRICE)} por{" "}
              <strong className="font-semibold">{formatBRL(annualPrice)}</strong>
            </p>
          )}
          <h1 className="mx-auto max-w-4xl font-semibold tracking-tight">
            <span className="block text-[2.5rem] leading-[1.08] sm:text-6xl lg:text-[4.25rem]">
              Chega de <Strike>caderno</Strike> e <Strike delay="1.3s">planilha</Strike>.
            </span>
            <span className="mt-3 block text-xl font-medium leading-snug text-[hsl(296_60%_85%)] sm:text-2xl lg:text-[1.75rem]">
              Feito pra quem vive a fisioterapia pélvica.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-balance text-lg leading-relaxed text-white/80">
            <span className="rounded-md bg-white/10 px-1.5 py-0.5 font-medium text-white box-decoration-clone sm:whitespace-nowrap">
              Agenda, prontuário, evolução e financeiro no mesmo lugar,
            </span>{" "}
            com anamneses pensadas para a pélvica e para a gestação. Para você atender no
            consultório, na clínica ou no domicílio, em um único plano com tudo liberado.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
          <p className="mt-4 text-sm text-white/70">
            14 dias para usar · Sem cartão · Sem inteligência artificial
          </p>
          <p className="mt-2 text-sm font-medium text-[hsl(296_60%_85%)]">
            Construída junto com quem atende
          </p>
        </div>

        <div
          className="relative mx-auto mt-8 max-w-5xl lg:mt-4 text-left"
          style={{ marginBottom: "-4rem" }}
        >
          <div className="hp-rise">
            <div className="hp-tilt">
              <Screen
                name="dashboard"
                priority
                className="!border-white/20 shadow-[0_40px_120px_-30px_hsl(296_60%_8%/0.8)]"
                alt="Dashboard do sistema com consultas de hoje, receita do mês, agenda do dia, calendário e pagamentos pendentes"
              />
            </div>
          </div>
          {cards.map(({ icon: Icon, title, text, pos, delay }) => (
            <div
              key={title}
              className={`hp-float absolute z-10 hidden w-60 items-center gap-3 rounded-2xl border border-white/60 bg-white/95 p-3.5 text-foreground shadow-[0_20px_50px_-15px_hsl(296_60%_10%/0.6)] lg:flex ${pos}`}
              style={{ ["--d" as string]: delay }}
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <span>
                <span className="block text-sm font-semibold">{title}</span>
                <span className="block text-xs text-muted-foreground">{text}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
