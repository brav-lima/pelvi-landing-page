import { Logo } from "@/components/pelvi/Logo";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { SIGNUPS_PAUSED } from "@/lib/signups";
import SpecularButton from "@/components/ui/specular-button";
import { specularPlum } from "@/lib/specular";

const links = [
  { href: "#produto", label: "Prontuário" },
  { href: "#rotina", label: "Rotina" },
  { href: "#financeiro", label: "Financeiro" },
  { href: "#planos", label: "Planos" },
  { href: "#faq", label: "Dúvidas" },
];

const linkClass =
  "inline-flex min-h-11 items-center text-[0.95rem] text-muted-foreground transition-colors hover:text-foreground";

export function Header() {
  const [open, setOpen] = useState(false);
  const label = SIGNUPS_PAUSED ? "Cadastros pausados" : "Testar por 14 dias";
  return (
    <header className="nav fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md">
      <div className="wrap relative flex h-16 items-center justify-between lg:grid lg:grid-cols-3">
        <a href="#main" className="skip-link">
          Pular para o conteúdo
        </a>

        <a
          href="#top"
          aria-label="soupelvi — voltar ao topo"
          className="flex min-h-11 items-center justify-self-start"
        >
          <Logo variant="horizontal-roxo" priority className="h-7" />
        </a>
        <nav
          aria-label="Seções da página"
          className="hidden items-center justify-center gap-8 whitespace-nowrap lg:flex"
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} className={linkClass}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center justify-end gap-3 lg:flex">
          <SpecularButton as={Link} to="/cadastro" size="sm" {...specularPlum} className="min-h-11">
            {label}
          </SpecularButton>
        </div>
        <button
          type="button"
          className="grid h-11 w-11 justify-self-end place-items-center rounded-lg lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="menu-mobile"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div
          id="menu-mobile"
          className="space-y-1 border-t border-border/60 bg-background px-6 py-4 lg:hidden"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`${linkClass} w-full`}
            >
              {l.label}
            </a>
          ))}
          <SpecularButton
            as={Link}
            to="/cadastro"
            size="md"
            {...specularPlum}
            className="mt-2 min-h-12 w-full"
          >
            {label}
          </SpecularButton>
        </div>
      )}
    </header>
  );
}
