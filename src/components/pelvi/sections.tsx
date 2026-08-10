import { useState } from "react";
import {
  FileHeart, History, Package,
  Wallet, MapPin, Sparkles, ArrowRight, Loader2, CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addAudienceContact } from "@/server/addAudienceContact";
import clinicImg from "@/assets/clinic.jpg";

/* EARLY ACCESS FORM */
function EarlyAccessForm({ className }: { className?: string }) {
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
    return (
      <div className={`flex items-center gap-3 text-sm ${className}`}>
        <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
        <p className="text-foreground font-medium">
          Você está na lista! Avisaremos assim que abrirmos o acesso.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      <Input
        placeholder="Seu nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        disabled={status === "loading"}
        className="h-12 rounded-xl bg-background/80 backdrop-blur-sm"
      />
      <Input
        type="email"
        placeholder="Seu melhor e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={status === "loading"}
        className="h-12 rounded-xl bg-background/80 backdrop-blur-sm"
      />
      <Button
        type="submit"
        size="lg"
        disabled={status === "loading"}
        className="h-12 rounded-xl px-7 shrink-0 shadow-soft"
      >
        {status === "loading" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>Garantir acesso antecipado <ArrowRight className="ml-2 h-4 w-4" /></>
        )}
      </Button>
      {status === "error" && (
        <p className="text-xs text-destructive mt-1">Algo deu errado. Tente novamente.</p>
      )}
    </form>
  );
}

/* HERO */
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-b from-accent/40 to-background">
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" aria-hidden />
      <div className="absolute top-40 -right-24 h-80 w-80 rounded-full bg-accent/60 blur-3xl" aria-hidden />
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="max-w-3xl mx-auto text-center animate-fade-up">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="h-3 w-3" strokeWidth={1.5} /> Em breve
          </span>
          <h1 className="mt-6 text-5xl md:text-6xl lg:text-[4.25rem] leading-[1.05] font-bold tracking-tight text-foreground">
            O sistema feito para a fisioterapia pélvica.{" "}
            <span className="text-primary whitespace-nowrap">Não adaptado, feito.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Prontuário especializado, agendamento e financeiro feitos para a fisioterapeuta pélvica — atenda em consultório próprio, clínica parceira ou domicílio com tudo em um só lugar. Estamos nos preparando para abrir o acesso: garante sua vaga antes de todo mundo.
          </p>
          <div className="mt-10">
            <EarlyAccessForm />
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            <span>Sem spam</span>
            <span aria-hidden="true"> · </span>
            <span>Conforme a LGPD</span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* FEATURES */
const features = [
  { i: FileHeart, t: "Anamnese e exame físico personalizados", d: "Por aqui nada é genérico. Tudo é pensado para a rotina na fisio pélvica, da anamnese nos diferentes cenários clínicos (dor, gestação, pós-parto, incontinências) até a avaliação física do assoalho pélvico." },
  { i: Package, t: "Planos de tratamento", d: "Os tratamentos raramente são atendimentos isolados. Aqui construímos com você toda a sequência do plano do seu paciente: cadastro, anamnese, exame físico e evoluções." },
  { i: History, t: "Linha do tempo de evoluções", d: "Acompanhe cada paciente em formato de timeline clínica. Veja a jornada completa do tratamento em uma rolagem." },
  { i: Wallet, t: "Financeiro descomplicado", d: "Lance entradas e saídas, vincule à paciente e ao agendamento, dê baixa em pagamentos com um clique, veja o resumo do mês com saldo, recebido, pendente e despesas." },
  { i: MapPin, t: "Trabalhe onde quiser, seus dados vão junto", d: "Atende em clínica parceira, consultório próprio ou domicílio? Um único login, agenda e prontuários organizados por local de atendimento — sem misturar históricos ou financeiro." },
];

export function Features() {
  return (
    <section id="recursos" className="py-24 bg-muted/50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">O que vem por aí</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-semibold text-foreground leading-tight">
              <span className="block">A rotina na fisio pélvica é única.</span>
              <span className="block text-primary">A sua gestão também deve ser.</span>
            </h2>
          </div>
        </div>
        <div className="mt-14 grid md:grid-cols-2 gap-5">
          {features.map(({ i: Icon, t, d }, idx) => (
            <div
              key={t}
              className={`rounded-3xl p-6 bg-card border border-border/60 hover:border-primary/40 hover:shadow-card transition-all duration-300 group${idx === features.length - 1 ? " md:col-span-2" : ""}`}
            >
              <div className="h-11 w-11 rounded-2xl bg-primary/10 grid place-items-center mb-4 group-hover:bg-primary/20 transition-colors">
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
  { t: "Fisioterapeuta autônoma em consultório ou clínica", d: "Você quer parar de viver entre agenda de papel, planilhas e WhatsApp — e ter um prontuário que fale a língua da fisio pélvica." },
  { t: "Fisioterapeuta que atende em mais de um local", d: "Você divide a semana entre clínica parceira, consultório próprio ou domicílio e cansa de manter históricos e financeiros separados." },
];

export function Audience() {
  return (
    <section id="para-quem" className="py-24 relative overflow-hidden">
      <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl" aria-hidden />
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-5 gap-12 items-center">
        <div className="lg:col-span-2">
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">Para quem é pelvi.</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold text-foreground leading-tight">
            Um local ou vários.{" "}
            <span className="text-primary">Uma ferramenta que acompanha você.</span>
          </h2>
          <div className="mt-8 rounded-3xl overflow-hidden shadow-soft">
            <img src={clinicImg} alt="Consultório acolhedor de fisioterapia pélvica" className="w-full h-72 object-cover" loading="lazy" width={1024} height={1024} />
          </div>
        </div>
        <div className="lg:col-span-3 flex flex-col gap-5">
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

/* EARLY ACCESS CTA */
export function EarlyAccessCTA() {
  return (
    <section id="early-access" className="px-6 pb-24 pt-12">
      <div
        className="mx-auto max-w-4xl rounded-3xl px-8 py-20 text-center relative overflow-hidden text-white"
        style={{ backgroundImage: "linear-gradient(135deg, hsl(296 28% 32%) 0%, hsl(296 28% 24%) 100%)" }}
      >
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" aria-hidden />
        <div className="absolute -bottom-24 -right-10 h-80 w-80 rounded-full bg-white/5 blur-3xl" aria-hidden />
        <span className="relative inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold tracking-wide uppercase mb-6">
          <Sparkles className="h-3 w-3" strokeWidth={1.5} /> Acesso antecipado
        </span>
        <h2 className="relative text-4xl md:text-5xl font-semibold leading-tight max-w-2xl mx-auto">
          <span className="block text-white/50 font-medium">Venha fazer parte do</span>
          <span className="block">Sou Pelvi.</span>
        </h2>
        <p className="relative mt-5 text-base text-white/80 max-w-xl mx-auto leading-relaxed">
          Quem entrar agora garante acesso antecipado, condições especiais de lançamento e voz ativa no desenvolvimento.
        </p>
        <div className="relative mt-10 max-w-2xl mx-auto">
          <EarlyAccessForm className="[&_input]:border-white/30 [&_input]:text-foreground" />
        </div>
        <p className="relative mt-5 text-xs text-white/60">Sem spam. Saia da lista quando quiser.</p>
      </div>
    </section>
  );
}

/* FOOTER */
export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-muted/50">
      <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-full bg-primary/15 grid place-items-center">
            <span className="h-3 w-3 rounded-full bg-primary" />
          </span>
          <span className="text-2xl font-semibold text-foreground">
            <span className="font-medium opacity-50">Sou</span>{" "}
            <span className="text-primary">Pelvi</span>
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          Para quem é pelvi.
        </p>
        <p className="text-xs text-muted-foreground">
          © 2026 Pelvi · Feito no Brasil
        </p>
      </div>
    </footer>
  );
}
