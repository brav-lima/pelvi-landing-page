import { UserPlus, Clock, Wallet } from "lucide-react";

/* Capturas de tela do sistema (clínica de demonstração, dados fictícios). */
const SCREENS = {
  perfil: { src: "/screens/perfil.jpg", width: 1577, height: 790 },
  pacientes: { src: "/screens/pacientes.jpg", width: 1590, height: 630 },
  evolucoes: { src: "/screens/evolucoes.jpg", width: 983, height: 468 },
  agenda: { src: "/screens/agenda.jpg", width: 1146, height: 500 },
  financeiro: { src: "/screens/financeiro.jpg", width: 1577, height: 592 },
} as const;

export type ScreenName = keyof typeof SCREENS;

/**
 * Tela do sistema dentro de uma moldura.
 * `tone="dark"`: sobre fundo escuro, com brilho roxo nas bordas e esfumado embaixo,
 * para a tela clara não "cortar" o fundo.
 */
export function Screen({
  name,
  alt,
  tone = "light",
  priority = false,
  className = "",
}: {
  name: ScreenName;
  alt: string;
  tone?: "light" | "dark";
  priority?: boolean;
  className?: string;
}) {
  const s = SCREENS[name];
  const dark = tone === "dark";
  return (
    <div
      className={`overflow-hidden rounded-2xl bg-background ${
        dark
          ? "border border-white/15 shadow-[0_0_0_1px_hsl(296_28%_60%/0.15),0_30px_120px_-20px_hsl(296_28%_50%/0.55)] [mask-image:linear-gradient(to_bottom,black_72%,transparent)]"
          : "border border-border shadow-soft"
      } ${className}`}
    >
      <img
        src={s.src}
        srcSet={`${s.src.replace(".jpg", "-800.jpg")} 800w, ${s.src} ${s.width}w`}
        sizes="(min-width: 1024px) 1200px, 100vw"
        width={s.width}
        height={s.height}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="block h-auto w-full p-3 sm:p-4"
      />
    </div>
  );
}

export function StepsFragment() {
  const steps = [
    { icon: UserPlus, t: "Crie sua conta", d: "Nome e e-mail, sem cartão." },
    { icon: Clock, t: "Teste por 14 dias", d: "Use com as suas pacientes." },
    {
      icon: Wallet,
      t: "Contrate se fizer sentido",
      d: "Pix ou cartão, dentro da plataforma.",
    },
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
