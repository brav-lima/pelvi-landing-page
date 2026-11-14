import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Turnstile } from "@marsidev/react-turnstile";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/pelvi/Logo";
import { selfInvite } from "@/server/selfInvite";

export const Route = createFileRoute("/cadastro")({
  head: () => ({ meta: [{ title: "Criar conta — soupelvi" }] }),
  component: Cadastro,
});

function Cadastro() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!captchaToken) return;
    setStatus("loading");
    try {
      await selfInvite({ data: { name, email, captchaToken } });
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não conseguimos enviar o convite agora.");
      setCaptchaToken(null);
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60">
        <div className="mx-auto max-w-3xl px-6 h-14 flex items-center">
          <Link to="/" aria-label="soupelvi — voltar ao início">
            <Logo variant="horizontal-roxo" className="h-7" />
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-md px-6 py-12">
        <h1 className="text-3xl font-bold tracking-tight">Criar conta</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Teste a soupelvi por 14 dias. Enviamos um link por e-mail para você concluir o cadastro.
        </p>

        {status === "done" ? (
          <div
            role="status"
            className="mt-8 flex items-start gap-3 rounded-2xl bg-white p-5 text-sm shadow-soft"
          >
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" aria-hidden />
            <p>
              <span className="font-semibold">Confira seu e-mail.</span> Se o endereço puder ser
              cadastrado, o link chega em instantes (veja também o spam). O link vale por 7 dias.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="cadastro-name" className="text-sm font-medium">
                Seu nome
              </label>
              <Input
                id="cadastro-name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                minLength={2}
                maxLength={120}
                disabled={status === "loading"}
                className="mt-1 h-12 rounded-xl"
              />
            </div>
            <div>
              <label htmlFor="cadastro-email" className="text-sm font-medium">
                Seu e-mail
              </label>
              <Input
                id="cadastro-email"
                type="email"
                autoComplete="email"
                inputMode="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                maxLength={254}
                disabled={status === "loading"}
                className="mt-1 h-12 rounded-xl"
              />
            </div>
            {siteKey ? (
              <Turnstile
                siteKey={siteKey}
                onSuccess={setCaptchaToken}
                onExpire={() => setCaptchaToken(null)}
                onError={() => setCaptchaToken(null)}
              />
            ) : (
              <p role="alert" className="text-sm text-red-600">
                Captcha não configurado (VITE_TURNSTILE_SITE_KEY).
              </p>
            )}
            <Button
              type="submit"
              size="lg"
              disabled={status === "loading" || !captchaToken}
              className="h-12 w-full rounded-xl"
            >
              {status === "loading" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Receber link de cadastro"
              )}
            </Button>
            {status === "error" && (
              <p role="alert" className="text-sm text-red-600">
                {error}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              Ao continuar, você concorda com os{" "}
              <Link to="/termos" className="underline underline-offset-2">
                Termos de uso
              </Link>{" "}
              e a{" "}
              <Link to="/privacidade" className="underline underline-offset-2">
                Política de privacidade
              </Link>
              .
            </p>
          </form>
        )}
      </main>
    </div>
  );
}
