import { useEffect, useState } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#recursos", label: "Recursos" },
  { href: "#para-quem", label: "Para quem é" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#planos", label: "Planos" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-full bg-primary/15 grid place-items-center">
            <span className="h-3 w-3 rounded-full bg-primary" />
          </span>
          <span className="text-2xl font-semibold tracking-tight text-foreground">Pelvi</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setDark((d) => !d)}
            aria-label="Alternar tema"
            className="h-9 w-9 grid place-items-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            {dark ? <Sun className="h-4 w-4" strokeWidth={1.5} /> : <Moon className="h-4 w-4" strokeWidth={1.5} />}
          </button>
          <a
            href={import.meta.env.VITE_CLINIC_APP_URL ?? "#"}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Entrar
          </a>
          <Button asChild variant="default" className="rounded-xl px-5">
            <a href="/cadastro">Testar 14 dias grátis</a>
          </Button>
        </div>
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border/60 px-6 py-4 space-y-3 bg-background">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block text-sm text-muted-foreground">
              {l.label}
            </a>
          ))}
          <Button asChild className="w-full rounded-full"><a href="/cadastro">Testar 14 dias grátis</a></Button>
        </div>
      )}
    </header>
  );
}