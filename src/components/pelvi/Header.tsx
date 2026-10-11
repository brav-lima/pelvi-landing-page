import { Logo } from "@/components/pelvi/Logo";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#pra-voce", label: "Pra você" },
  { href: "#como-funciona", label: "Como vai funcionar" },
  { href: "#primeiros-acessos", label: "Primeiros acessos" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 h-14 flex items-center justify-between lg:grid lg:grid-cols-3">
        <a
          href="#top"
          aria-label="soupelvi — voltar ao topo"
          className="flex items-center justify-self-start"
        >
          <Logo variant="horizontal-roxo" priority className="h-7" />
        </a>
        <nav className="hidden lg:flex items-center justify-center gap-8 whitespace-nowrap text-sm text-muted-foreground">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden lg:flex items-center justify-end gap-3">
          <Button asChild variant="default" className="rounded-xl px-5">
            <a href="#lista">Guardar meu lugar</a>
          </Button>
        </div>
        <button
          className="lg:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border/60 px-6 py-4 space-y-3 bg-background">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-sm text-muted-foreground"
            >
              {l.label}
            </a>
          ))}
          <Button asChild className="w-full rounded-full">
            <a href="#lista">Guardar meu lugar</a>
          </Button>
        </div>
      )}
    </header>
  );
}
