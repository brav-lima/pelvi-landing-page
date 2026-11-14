import {
  CalendarDays,
  ClipboardList,
  FileText,
  LayoutDashboard,
  Users,
  Wallet,
  Check,
  Smartphone,
  UserPlus,
  Clock,
  Wallet as WalletIcon,
  QrCode,
  CreditCard,
} from "lucide-react";

/* Telas da plataforma reconstruídas em HTML (nomes de pacientes são exemplos). */

const nav = [
  { icon: LayoutDashboard, label: "Início" },
  { icon: CalendarDays, label: "Agenda" },
  { icon: Users, label: "Pacientes", active: true },
  { icon: ClipboardList, label: "Evoluções" },
  { icon: Wallet, label: "Financeiro" },
  { icon: FileText, label: "Documentos" },
];

const patients = [
  { name: "Marina S.", info: "Hoje, 09:00", active: true },
  { name: "Camila R.", info: "Hoje, 10:30" },
  { name: "Joana P.", info: "Hoje, 14:00" },
  { name: "Beatriz L.", info: "Amanhã, 08:30" },
  { name: "Renata M.", info: "Amanhã, 11:00" },
];

function Chip({ children, tone = "plum" }: { children: React.ReactNode; tone?: "plum" | "green" }) {
  const dot = tone === "green" ? "bg-emerald-600" : "bg-primary";
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground">
      <span className={`h-2 w-2 shrink-0 rounded-full ${dot}`} aria-hidden />
      {children}
    </span>
  );
}

/** Janela do app: menu, lista de pacientes e o prontuário aberto. */
export function AppWindow({ compact = false }: { compact?: boolean }) {
  const rowPad = compact ? "py-3" : "py-4 md:py-5";
  return (
    <div
      className="overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-soft"
      role="img"
      aria-label="Tela do prontuário da paciente na plataforma soupelvi"
    >
      <div className="flex items-center gap-2 border-b border-border bg-muted px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
      </div>
      <div className="grid grid-cols-[168px_1fr] md:grid-cols-[168px_220px_1fr]">
        <ul className="hidden space-y-1 border-r border-border bg-sidebar p-3 sm:block">
          {nav.map(({ icon: Icon, label, active }) => (
            <li
              key={label}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                active ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden /> {label}
            </li>
          ))}
        </ul>
        <ul className="hidden border-r border-border md:block">
          {patients.slice(0, compact ? 4 : 5).map((p) => (
            <li
              key={p.name}
              className={`px-4 ${rowPad} ${p.active ? "bg-primary-soft" : "border-b border-border/60"}`}
            >
              <p className="text-sm font-semibold">{p.name}</p>
              <p className="text-xs text-muted-foreground">{p.info}</p>
            </li>
          ))}
        </ul>
        <div className={`col-span-2 sm:col-span-1 ${compact ? "p-5" : "p-5 md:p-8"}`}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="font-display text-lg font-semibold">Marina S.</p>
              <p className="text-xs text-muted-foreground">Atendimento de hoje, 09:00</p>
            </div>
            <Chip>Em atendimento</Chip>
          </div>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
            <Chip tone="green">Anamnese</Chip>
            <Chip tone="green">Exame físico</Chip>
            <Chip>Avaliação perineal</Chip>
          </div>
          <div className={`mt-4 rounded-xl border border-border ${compact ? "p-4" : "p-5 md:p-6"}`}>
            <p className="text-sm font-semibold">Evolução da sessão</p>
            <p
              className={`mt-1 leading-relaxed text-muted-foreground ${compact ? "text-sm" : "text-sm md:text-base"}`}
            >
              Paciente relata menos urgência ao longo da semana. Exercícios de consciência perineal
              mantidos, com orientação para a rotina em casa.
            </p>
            <div className="mt-3 flex items-center gap-2 text-sm text-primary-dark">
              <Check className="h-4 w-4" aria-hidden /> Evolução registrada
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- fragmentos dos cartões de recursos ---------------- */

const frame = "rounded-xl border border-border bg-card p-4 text-sm shadow-card";

export function AssessmentFragment() {
  const rows = [
    ["Força (Oxford modificada)", "3"],
    ["Endurance", "6 a 4 s"],
    ["Repetições", "10 a 6"],
  ];
  return (
    <div
      className={frame}
      role="img"
      aria-label="Avaliação perineal com força, endurance e repetições"
    >
      <p className="font-semibold">Avaliação perineal</p>
      <ul className="mt-3 space-y-2">
        {rows.map(([k, v]) => (
          <li key={k} className="flex items-center justify-between border-b border-border/60 pb-2">
            <span className="text-muted-foreground">{k}</span>
            <span className="font-semibold">{v}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function EvolutionFragment() {
  const sessions = ["1ª sessão", "3ª sessão", "6ª sessão", "Hoje"];
  return (
    <div className={frame} role="img" aria-label="Linha do tempo de evoluções por sessão">
      <p className="font-semibold">Evoluções</p>
      <ol className="mt-3 space-y-3 border-l-2 border-primary-soft pl-4">
        {sessions.map((s, i) => (
          <li key={s} className="relative">
            <span
              className={`absolute -left-[23px] top-1 h-3 w-3 rounded-full ${
                i === sessions.length - 1 ? "bg-primary" : "bg-primary/40"
              }`}
            />
            <p className="font-medium">{s}</p>
            <p className="text-xs text-muted-foreground">Registro assinado no prontuário</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function PortalFragment() {
  return (
    <div
      className={`${frame} flex items-start gap-3`}
      role="img"
      aria-label="Convite ao portal da paciente"
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary-soft text-primary-dark">
        <Smartphone className="h-5 w-5" aria-hidden />
      </span>
      <div>
        <p className="font-semibold">Portal da paciente</p>
        <p className="mt-1 text-muted-foreground">
          Convite enviado para ativar a conta e acompanhar o tratamento.
        </p>
        <div className="mt-3">
          <Chip tone="green">Conta ativada</Chip>
        </div>
      </div>
    </div>
  );
}

export function AgendaFragment() {
  const slots = [
    ["09:00", "Marina S.", true],
    ["10:30", "Camila R.", false],
    ["14:00", "Joana P.", false],
  ] as const;
  return (
    <div className={frame} role="img" aria-label="Agenda do dia com três atendimentos">
      <p className="font-semibold">Agenda de hoje</p>
      <ul className="mt-3 space-y-2">
        {slots.map(([h, n, now]) => (
          <li
            key={h}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 ${now ? "bg-primary text-primary-foreground" : "bg-muted"}`}
          >
            <span className="w-12 font-semibold">{h}</span>
            <span>{n}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FinanceFragment() {
  const rows = [
    ["Sessão avulsa", "Pago"],
    ["Pacote de 8 sessões", "Pago"],
    ["Avaliação inicial", "A receber"],
  ];
  return (
    <div className={frame} role="img" aria-label="Lançamentos financeiros do mês">
      <p className="font-semibold">Financeiro do mês</p>
      <ul className="mt-3 space-y-2">
        {rows.map(([k, v]) => (
          <li key={k} className="flex items-center justify-between gap-2">
            <span className="text-muted-foreground">{k}</span>
            <Chip tone={v === "Pago" ? "green" : "plum"}>{v}</Chip>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DocsFragment() {
  const docs = ["Termo de consentimento", "Recibo de atendimento", "Orientações para casa"];
  return (
    <div className={frame} role="img" aria-label="Lista de documentos da paciente">
      <p className="font-semibold">Documentos</p>
      <ul className="mt-3 space-y-2">
        {docs.map((d) => (
          <li key={d} className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2">
            <FileText className="h-4 w-4 text-primary" aria-hidden /> {d}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CheckoutWindow({
  price,
  cashPrice,
  installment,
}: {
  price: string;
  cashPrice: string;
  installment: string;
}) {
  const methods = [
    { icon: QrCode, label: "Pix", on: true },
    { icon: CreditCard, label: "Cartão à vista", on: false },
    { icon: CreditCard, label: "Cartão em até 12x", on: false },
  ];
  return (
    <div
      className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
      role="img"
      aria-label="Tela de contratação do plano anual dentro da plataforma, com escolha entre Pix e cartão"
    >
      <div className="flex items-center gap-2 border-b border-border bg-muted px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
      </div>
      <div className="p-6 md:p-8">
        <p className="font-display text-xl font-semibold">Contratar plano</p>
        <div className="mt-5 flex items-center justify-between rounded-xl border border-border p-4">
          <div>
            <p className="font-semibold">Plano anual</p>
            <p className="text-sm text-muted-foreground">Cobrança única por 12 meses</p>
          </div>
          <p className="font-display text-xl font-bold text-primary">{price}</p>
        </div>
        <p className="mt-6 text-sm font-semibold">Forma de pagamento</p>
        <ul className="mt-3 grid grid-cols-3 gap-3 text-center text-sm">
          {methods.map(({ icon: Icon, label, on }) => (
            <li
              key={label}
              className={`flex flex-col items-center gap-2 rounded-xl border px-2 py-4 font-medium ${
                on ? "border-primary bg-primary-soft" : "border-border bg-muted"
              }`}
            >
              <Icon className="h-5 w-5 text-primary" aria-hidden />
              {label}
            </li>
          ))}
        </ul>
        <dl className="mt-6 space-y-2 text-sm md:hidden lg:block">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">À vista (10% de desconto)</dt>
            <dd className="font-semibold">{cashPrice}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Em até 12x</dt>
            <dd className="font-semibold">{installment}</dd>
          </div>
        </dl>
        <div className="mt-6 rounded-xl bg-primary px-4 py-3 font-semibold text-primary-foreground">
          Continuar para o pagamento
        </div>
      </div>
    </div>
  );
}

export function StepsFragment() {
  const steps = [
    { icon: UserPlus, t: "Crie sua conta", d: "Nome e e-mail, sem cartão." },
    { icon: Clock, t: "Teste por 14 dias", d: "Use com as suas pacientes." },
    { icon: WalletIcon, t: "Contrate se fizer sentido", d: "Pix ou cartão, dentro da plataforma." },
  ];
  return (
    <ol
      role="img"
      aria-label="Como começar: crie a conta, teste por 14 dias e contrate se fizer sentido"
      className="space-y-3"
    >
      {steps.map(({ icon: Icon, t, d }) => (
        <li key={t} className="flex items-center gap-4 rounded-2xl bg-card px-5 py-3 shadow-card">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
            <Icon className="h-5 w-5" aria-hidden />
          </span>
          <span>
            <span className="block text-lg font-semibold">{t}</span>
            <span className="block text-muted-foreground">{d}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}
