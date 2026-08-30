import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const links = [
  { href: "#recursos", label: "O que vem por aí" },
  { href: "#para-quem", label: "Para quem é" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 h-14 flex items-center justify-between">
        <a href="#top" className="flex items-center">
          <img src={logo} alt="Sou Pelvi" className="h-6 w-auto" />
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <Button asChild variant="default" className="rounded-xl px-5">
            <a href="#early-access">Garantir acesso antecipado</a>
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
          <Button asChild className="w-full rounded-full"><a href="#early-access">Garantir acesso antecipado</a></Button>
        </div>
      )}
    </header>
  );
}