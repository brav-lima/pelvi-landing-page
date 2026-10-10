import { useEffect, useState } from "react";
import {
  ArrowRight,
  Loader2,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  MapPin,
  HeartHandshake,
  Clock,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addAudienceContact } from "@/server/addAudienceContact";
import { Logo } from "@/components/pelvi/Logo";

/* ------------------------------------------------------------------ */
/* DATAS DO LANÇAMENTO                                                  */
/* ------------------------------------------------------------------ */
// A lista fica aberta até o fim de 31/10; os acessos começam a sair a partir daí.
export const LIST_CLOSE_DATE = new Date("2026-10-31T23:59:59-03:00");

function useListOpen() {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    setOpen(Date.now() < LIST_CLOSE_DATE.getTime());
  }, []);
  return open;
}

/* ------------------------------------------------------------------ */
/* FORMULÁRIO DA LISTA                                                  */
/* ------------------------------------------------------------------ */
function EarlyAccessForm({
  className,
  inputClass = "",
  idPrefix,
}: {
  className?: string;
  inputClass?: string;
  idPrefix: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      await addAudienceContact({ data: { name, email } });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    const firstName = name.trim().split(" ")[0];
    return (
      <div
        role="status"
        className={`flex items-start gap-3 rounded-2xl bg-white px-5 py-4 text-left text-sm shadow-soft ${className}`}
      >
        <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
        <p className="text-zinc-900">
          <span className="font-semibold">
            Pronto{firstName ? `, ${firstName}` : ""}! Seu lugar está guardado.
          </span>{" "}
          A partir de 31/10 os primeiros acessos começam a sair, aos poucos. Fique de olho no seu
          e-mail.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className} noValidate={false}>
      <div className="flex flex-col sm:flex-row gap-3">
        <label htmlFor={`${idPrefix}-name`} className="sr-only">
          Seu nome
        </label>
        <Input
          id={`${idPrefix}-name`}
          name="name"
          autoComplete="given-name"
          placeholder="Como podemos te chamar?"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          minLength={2}
          disabled={status === "loading"}
          className={`h-12 rounded-xl bg-background/80 backdrop-blur-sm ${inputClass}`}
        />
        <label htmlFor={`${idPrefix}-email`} className="sr-only">
          Seu e-mail
        </label>
        <Input
          id={`${idPrefix}-email`}
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="Seu melhor e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === "loading"}
          className={`h-12 rounded-xl bg-background/80 backdrop-blur-sm ${inputClass}`}
        />
        <Button
          type="submit"
          size="lg"
          disabled={status === "loading"}
          className="h-12 rounded-xl px-7 shrink-0 shadow-soft"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="sr-only">Guardando seu lugar…</span>
            </>
          ) : (
            <>
              Guardar meu lugar <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
      {status === "error" && (
        <p role="alert" className="mt-3 text-sm text-red-300">
          Não conseguimos guardar sua inscrição agora. Confira o e-mail e tente de novo em
          instantes.
        </p>
      )}
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* CONTAGEM ATÉ O FECHAMENTO DA LISTA                                   */
/* ------------------------------------------------------------------ */
function Countdown() {
  const [msLeft, setMsLeft] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setMsLeft(Math.max(0, LIST_CLOSE_DATE.getTime() - Date.now()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const totalSeconds = Math.floor((msLeft ?? 0) / 1000);
  const units = [
    { value: Math.floor(totalSeconds / 86400), label: "dias" },
    { value: Math.floor((totalSeconds % 86400) / 3600), label: "horas" },
    { value: Math.floor((totalSeconds % 3600) / 60), label: "min" },
    { value: totalSeconds % 60, label: "seg" },
  ];

  return (
    <div>
      <p className="text-[0.7rem] uppercase tracking-[0.2em] text-white/50">A lista fecha em</p>
      <div
        className="mt-3 flex items-center justify-center gap-3 sm:gap-5"
        suppressHydrationWarning
        aria-hidden="true"
      >
        {units.map((u) => (
          <div key={u.label} className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl font-bold font-display text-white tabular-nums">
              {msLeft === null ? "—" : String(u.value).padStart(2, "0")}
            </span>
            <span className="mt-1 text-[0.65rem] sm:text-xs uppercase tracking-widest text-white/50">
              {u.label}
            </span>
          </div>
        ))}
      </div>
      <p className="sr-only">A lista de espera fica aberta até 31 de outubro de 2026.</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* HERO                                                                 */
/* ------------------------------------------------------------------ */
export function Hero() {
  const listOpen = useListOpen();
  return (
    <section
      id="top"
      className="relative overflow-hidden"
      style={{
        backgroundColor: "hsl(296 28% 12%)",
        backgroundImage: [
          "radial-gradient(circle 420px at 0% 0%, hsl(296 28% 32% / 0.2), hsl(296 28% 32% / 0.1) 55%, transparent)",
          "radial-gradient(circle 340px at 100% 260px, hsl(296 28% 22% / 0.4), hsl(296 28% 22% / 0.2) 55%, transparent)",
        ].join(", "),
      }}
    >
      <div className="mx-auto max-w-6xl px-6 pt-10 pb-20 lg:pt-12 lg:pb-28 text-center relative animate-fade-up">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-semibold tracking-wide uppercase">
          <Sparkles className="h-3 w-3" strokeWidth={1.5} /> 13 de outubro · Dia do Fisioterapeuta
        </span>
        <div className="mt-6 flex justify-center">
          <Logo variant="vertical-branco" priority className="h-20 md:h-24" />
        </div>
        <h1 className="mt-4 text-[2rem] sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.15] font-semibold tracking-tight text-white">
          <span className="block">Um espaço só seu,</span>{" "}
          <span className="block">feito pra&nbsp;quem vive a&nbsp;fisioterapia&nbsp;pélvica.</span>
        </h1>
        <p className="mt-6 text-white/75 text-lg md:text-xl leading-relaxed max-w-4xl mx-auto">
          <span className="lg:block">
            Você atende aqui, ali, na casa da paciente, e carrega cada história com você.
          </span>{" "}
          <span className="lg:block">A&nbsp;gente criou um lugar pra isso.</span>{" "}
          <span className="lg:block">
            Ainda não dá pra mostrar tudo, mas já dá pra&nbsp;guardar o seu lugar.
          </span>
        </p>
        {listOpen ? (
          <div className="mt-8">
            <Countdown />
          </div>
        ) : (
          <p className="mt-10 text-white/80">
            A lista da primeira turma foi encerrada. Deixe seu e-mail para saber das próximas.
          </p>
        )}
        <p className="mt-6 text-sm text-white/70">
          Primeira turma com poucas vagas · acesso gratuito durante o período de teste
        </p>
        <div className="mt-4 mx-auto max-w-3xl">
          <EarlyAccessForm idPrefix="hero" inputClass="border-white/20 text-foreground" />
        </div>
        <p className="mt-4 text-xs text-white/50">
          <span>Sem spam</span>
          <span aria-hidden="true"> · </span>
          <span>Seus dados protegidos pela LGPD</span>
          <span aria-hidden="true"> · </span>
          <span>Saia quando quiser</span>
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* PRA VOCÊ (reconhecimento, sem revelar funcionalidades)               */
/* ------------------------------------------------------------------ */
const recognition = [
  {
    icon: MapPin,
    t: "Seu trabalho não cabe em um endereço só",
    d: "Consultório, clínica parceira, domicílio. Você vai aonde a paciente precisa, e tudo o que importa deveria ir junto.",
  },
  {
    icon: HeartHandshake,
    t: "A pélvica pede outro olhar",
    d: "Escuta, delicadeza e detalhes que ferramentas genéricas nunca foram feitas pra entender.",
  },
  {
    icon: Clock,
    t: "Seu tempo é das pacientes",
    d: "O que acontece fora da sessão deveria pesar menos no fim do dia.",
  },
];

export function ForYou() {
  return (
    <section id="pra-voce" className="py-24 bg-background">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">
            A gente te escutou
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground leading-tight">
            <span className="block">A clínica pode mudar.</span>{" "}
            <span className="block text-primary">
              A&nbsp;história com&nbsp;cada&nbsp;paciente continua&nbsp;sua.
            </span>
          </h2>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {recognition.map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-3xl p-7 bg-card border border-border/60">
              <Icon className="h-6 w-6 text-primary" strokeWidth={1.5} aria-hidden />
              <h3 className="mt-5 text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 text-center text-muted-foreground">
          E o que tem lá dentro?{" "}
          <span className="text-foreground font-medium">A primeira turma descobre antes.</span>
        </p>
        <div className="mt-8 mx-auto max-w-2xl rounded-2xl border border-border/60 bg-muted/40 px-6 py-5 flex items-start gap-4">
          <Users className="h-5 w-5 text-primary shrink-0 mt-0.5" strokeWidth={1.5} aria-hidden />
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="text-foreground font-medium">
              Tem uma clínica com outras fisioterapeutas?
            </span>{" "}
            A soupelvi nasceu pensando em você, mas também está pronta pra receber a sua equipe.
            Entre na lista e conte pra gente quando o convite chegar.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* COMO VAI FUNCIONAR                                                   */
/* ------------------------------------------------------------------ */
const timeline = [
  {
    n: "01",
    t: "Agora, até 31 de outubro",
    d: "A lista está aberta. Deixe seu nome e e-mail e guarde seu lugar na primeira turma.",
  },
  {
    n: "02",
    t: "A partir de 31 de outubro",
    d: "Os primeiros acessos começam a sair por e-mail, aos poucos, para quem está na lista.",
  },
  {
    n: "03",
    t: "Com você junto",
    d: "Durante o teste, o que você contar pra gente molda o que vem depois.",
  },
];

export function Timeline() {
  return (
    <section id="como-funciona" className="py-24 bg-muted/50">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-xl mx-auto text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">
            Como vai funcionar
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground leading-tight">
            <span className="block">Sem pressa,</span>{" "}
            <span className="block text-primary">um passo de&nbsp;cada&nbsp;vez.</span>
          </h2>
        </div>
        <ol className="mt-14 grid md:grid-cols-3 gap-5">
          {timeline.map(({ n, t, d }) => (
            <li
              key={n}
              className="rounded-3xl p-6 bg-card border border-border/60 hover:border-primary/40 hover:shadow-card transition-all duration-300"
            >
              <span className="text-4xl font-bold text-border/80 font-display" aria-hidden>
                {n}
              </span>
              <h3 className="mt-4 text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* PRIMEIRA TURMA                                                       */
/* ------------------------------------------------------------------ */
const testerHighlights = [
  "Poucas vagas, por escolha: queremos acompanhar cada pessoa de perto.",
  "Acesso gratuito durante todo o período de teste.",
  "Um canal direto pra contar o que funciona, o que falta e o que incomoda.",
  "Uso de verdade, desde o primeiro dia: com as suas pacientes, no consultório, na clínica ou no domicílio.",
  "Os seus dados e os das suas pacientes tratados com sigilo, conforme a LGPD.",
];

export function TesterProgram() {
  return (
    <section id="primeira-turma" className="py-24 bg-background">
      <div className="mx-auto max-w-5xl px-6">
        <div className="rounded-3xl p-8 md:p-12 bg-card border border-border/60 shadow-card">
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">
            Primeira turma
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground leading-tight">
            Um grupo pequeno, pra&nbsp;construir com&nbsp;calma e&nbsp;de&nbsp;perto.
          </h2>
          <ul className="mt-10 space-y-4">
            {testerHighlights.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <ShieldCheck
                  className="h-5 w-5 text-primary shrink-0 mt-0.5"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <span className="text-foreground leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-primary/5 p-6">
            <p className="text-sm text-muted-foreground">
              A lista fica aberta até 31 de outubro. Depois disso, os acessos começam a sair.
            </p>
            <Button asChild className="rounded-xl px-6 shrink-0">
              <a href="#lista">
                Guardar meu lugar <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* CTA FINAL                                                            */
/* ------------------------------------------------------------------ */
export function CtaSection() {
  return (
    <section id="lista" className="px-4 sm:px-6 pb-24 pt-4 scroll-mt-16">
      <div
        className="mx-auto max-w-4xl rounded-3xl px-5 sm:px-8 py-16 sm:py-20 text-center relative overflow-hidden text-white"
        style={{
          backgroundImage: "linear-gradient(135deg, hsl(296 28% 32%) 0%, hsl(296 28% 24%) 100%)",
        }}
      >
        <div
          className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute -bottom-24 -right-10 h-80 w-80 rounded-full bg-white/5 blur-3xl"
          aria-hidden
        />
        <span className="relative inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold tracking-wide uppercase mb-6">
          <Sparkles className="h-3 w-3" strokeWidth={1.5} /> Feliz dia, fisio
        </span>
        <h2 className="relative text-[1.75rem] sm:text-4xl md:text-5xl font-semibold leading-tight max-w-2xl mx-auto">
          <span className="block text-white/60 font-medium">
            Você cuida de&nbsp;tanta&nbsp;gente.
          </span>{" "}
          <span className="block">
            Deixa a&nbsp;gente&nbsp;cuidar de&nbsp;um&nbsp;pedacinho da&nbsp;sua&nbsp;rotina.
          </span>
        </h2>
        <p className="relative mt-5 text-base text-white/80 max-w-xl mx-auto leading-relaxed">
          A lista da primeira turma fica aberta até 31 de outubro, com poucas vagas. Entre agora e
          receba o convite assim que os acessos começarem a sair.
        </p>
        <div className="relative mt-10 max-w-2xl mx-auto">
          <EarlyAccessForm idPrefix="cta" inputClass="border-white/30 text-foreground" />
        </div>
        <p className="relative mt-5 text-xs text-white/60">
          Só vamos te escrever sobre a soupelvi. Nada&nbsp;de&nbsp;spam.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* RODAPÉ                                                               */
/* ------------------------------------------------------------------ */
export function Footer() {
  return (
    <footer style={{ background: "hsl(296 28% 18%)" }}>
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-4 text-center md:grid-cols-3 md:items-center">
          <div className="md:text-left">
            <Logo variant="horizontal-branco" className="h-7 inline-block" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm" style={{ color: "hsl(296 20% 70%)" }}>
              Feito pra quem vive a fisioterapia pélvica.
            </p>
            <address className="not-italic text-xs" style={{ color: "hsl(296 20% 60%)" }}>
              Edifício Primavera Office | Florianópolis - SC
            </address>
          </div>
          <p className="text-xs md:text-right" style={{ color: "hsl(296 20% 60%)" }}>
            © 2026 soupelvi · Feito no Brasil
          </p>
        </div>
      </div>
    </footer>
  );
}
