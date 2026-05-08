import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trialSignup } from "@/server/trialSignup";

export const Route = createFileRoute("/cadastro")({
  component: CadastroPage,
  head: () => ({
    meta: [{ title: "Criar conta grátis — Pelvi" }],
  }),
});

const schema = z
  .object({
    name: z.string().min(2, "Nome precisa ter ao menos 2 caracteres"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(8, "Senha precisa ter ao menos 8 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

function CadastroPage() {
  const [done, setDone] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setServerError(null);
    try {
      await trialSignup({ data: { name: data.name, email: data.email, password: data.password } });
      setDone(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Erro inesperado. Tente novamente.");
    }
  }

  if (done) {
    return (
      <PageShell>
        <div className="text-center space-y-4">
          <CheckCircle2 className="mx-auto h-14 w-14 text-primary" strokeWidth={1.5} />
          <h1 className="text-2xl font-semibold text-foreground">Verifique seu e-mail</h1>
          <p className="text-muted-foreground max-w-sm mx-auto">
            Enviamos um link de confirmação para o seu e-mail. Clique nele para continuar o
            cadastro.
          </p>
          <p className="text-xs text-muted-foreground">O link expira em 24 horas.</p>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold text-foreground">Comece grátis por 14 dias</h1>
        <p className="text-sm text-muted-foreground">Sem cartão de crédito. Cancele quando quiser.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
        <div className="space-y-1.5">
          <Label htmlFor="name">Seu nome</Label>
          <Input
            id="name"
            placeholder="Ana Paula Silva"
            autoComplete="name"
            {...register("name")}
            aria-invalid={!!errors.name}
          />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email">E-mail profissional</Label>
          <Input
            id="email"
            type="email"
            placeholder="ana@clinica.com.br"
            autoComplete="email"
            {...register("email")}
            aria-invalid={!!errors.email}
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password">Senha</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPass ? "text" : "password"}
              placeholder="Mínimo 8 caracteres"
              autoComplete="new-password"
              className="pr-10"
              {...register("password")}
              aria-invalid={!!errors.password}
            />
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={showPass ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-destructive">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword">Confirmar senha</Label>
          <Input
            id="confirmPassword"
            type={showPass ? "text" : "password"}
            placeholder="Repita a senha"
            autoComplete="new-password"
            {...register("confirmPassword")}
            aria-invalid={!!errors.confirmPassword}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
          )}
        </div>

        {serverError && (
          <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">
            {serverError}
          </p>
        )}

        <Button type="submit" className="w-full rounded-full h-11" disabled={isSubmitting}>
          {isSubmitting ? "Criando conta…" : "Criar conta grátis"}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          Já tem conta?{" "}
          <a
            href={import.meta.env.VITE_CLINIC_APP_URL ?? "#"}
            className="text-primary hover:underline"
          >
            Entrar
          </a>
        </p>
      </form>
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
