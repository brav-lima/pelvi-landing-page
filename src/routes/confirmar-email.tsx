import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trialConfirmEmail } from "@/server/trialConfirmEmail";

const searchSchema = z.object({ token: z.string().length(64).optional() });

export const Route = createFileRoute("/confirmar-email")({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ token: search.token }),
  loader: async ({ deps: { token } }) => {
    if (!token) {
      throw redirect({ to: "/cadastro" });
    }
    try {
      const result = await trialConfirmEmail({ data: { token } });
      return { ok: true as const, name: result.name, email: result.email, token };
    } catch (err) {
      return {
        ok: false as const,
        error: err instanceof Error ? err.message : "Token inválido ou expirado.",
      };
    }
  },
  head: () => ({ meta: [{ title: "Confirmação de e-mail — Pelvi" }] }),
  component: ConfirmarEmailPage,
});

function ConfirmarEmailPage() {
  const data = Route.useLoaderData()!;
  const navigate = useNavigate();

  if (!data.ok) {
    return (
      <PageShell>
        <div className="text-center space-y-4">
          <AlertCircle className="mx-auto h-14 w-14 text-destructive" strokeWidth={1.5} />
          <h1 className="text-2xl font-semibold text-foreground">Link inválido</h1>
          <p className="text-muted-foreground">{data.error}</p>
          <Button asChild className="rounded-full">
            <a href="/cadastro">Iniciar novo cadastro</a>
          </Button>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="text-center space-y-4">
        <CheckCircle2 className="mx-auto h-14 w-14 text-primary" strokeWidth={1.5} />
        <h1 className="text-2xl font-semibold text-foreground">E-mail confirmado!</h1>
        <p className="text-muted-foreground">
          Olá, <strong>{data.name}</strong>! Agora vamos configurar sua clínica.
        </p>
        <Button
          className="w-full rounded-full h-11"
          onClick={() => navigate({ to: "/onboarding", search: { token: data.token } })}
        >
          Continuar →
        </Button>
      </div>
    </PageShell>
  );
}

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/30 to-background flex flex-col items-center justify-center px-4 py-16">
      <a href="/" className="flex items-center gap-2 mb-10">
        <span className="h-8 w-8 rounded-full bg-primary/15 grid place-items-center">
          <span className="h-3 w-3 rounded-full bg-primary" />
        </span>
        <span className="text-2xl font-semibold tracking-tight text-foreground">Pelvi</span>
      </a>
      <div className="w-full max-w-sm bg-card border border-border/60 rounded-3xl p-8 shadow-card space-y-6">
        {children}
      </div>
    </div>
  );
}
