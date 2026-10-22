import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/pelvi/Logo";
import { Footer } from "@/components/pelvi/sections";

export const LEGAL_UPDATED_AT = "13 de outubro de 2026";
export const CONTACT_EMAIL = "admin@soupelvi.com.br";

export function LegalLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60">
        <div className="mx-auto max-w-3xl px-6 h-14 flex items-center justify-between">
          <Link to="/" aria-label="soupelvi — voltar ao início">
            <Logo variant="horizontal-roxo" className="h-7" />
          </Link>
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            Voltar ao início
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Última atualização: {LEGAL_UPDATED_AT}
        </p>
        <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-foreground/90 [&_h2]:mt-10 [&_h2]:mb-2 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_a]:text-primary [&_a]:underline">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
