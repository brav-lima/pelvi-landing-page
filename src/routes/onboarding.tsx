import { useState } from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trialCompleteOnboarding } from "@/server/trialCompleteOnboarding";

const searchSchema = z.object({ token: z.string().length(64).optional() });

export const Route = createFileRoute("/onboarding")({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ token: search.token }),
  loader: ({ deps }) => {
    if (!deps.token) throw redirect({ to: "/cadastro" });
    return { token: deps.token };
  },
  head: () => ({ meta: [{ title: "Configurar clínica — Pelvi" }] }),
  component: OnboardingPage,
});

// ── Step 1 schema ───────────────────────────────────────────────────────────
const step1Schema = z.object({
  clinicName: z.string().min(2, "Nome da clínica precisa ter ao menos 2 caracteres"),
  clinicEmail: z.string().email("E-mail inválido"),
  phone: z.string().optional(),
});

// ── Step 2 schema ───────────────────────────────────────────────────────────
const step2Schema = z.object({
  cpf: z
    .string()
    .transform((v) => v.replace(/\D/g, ""))
    .pipe(z.string().length(11, "CPF inválido")),
  document: z
    .string()
    .transform((v) => v.replace(/\D/g, ""))
    .pipe(z.string().length(14, "CNPJ inválido")),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;

function OnboardingPage() {
  const { token } = Route.useLoaderData()!;
  const [step, setStep] = useState<1 | 2>(1);
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/30 to-background flex flex-col items-center justify-center px-4 py-16">
      <a href="/" className="flex items-center gap-2 mb-10">
        <span className="h-8 w-8 rounded-full bg-primary/15 grid place-items-center">
          <span className="h-3 w-3 rounded-full bg-primary" />
        </span>
        <span className="text-2xl font-semibold tracking-tight text-foreground">Pelvi</span>
      </a>

      <div className="w-full max-w-sm bg-card border border-border/60 rounded-3xl p-8 shadow-card space-y-6">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Passo {step} de 2</span>
            <span>{step === 1 ? "Dados da clínica" : "Documentos"}</span>
          </div>
          <Progress value={step === 1 ? 50 : 100} />
        </div>

        {step === 1 ? (
          <Step1Form
            onNext={(data) => {
              setStep1Data(data);
              setStep(2);
            }}
          />
        ) : (
          <Step2Form
            token={token}
            step1={step1Data!}
            serverError={serverError}
            onBack={() => setStep(1)}
            onError={setServerError}
          />
        )}
      </div>
    </div>
  );
}

// ── Step 1 ──────────────────────────────────────────────────────────────────
function Step1Form({ onNext }: { onNext: (data: Step1Data) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1Data>({ resolver: zodResolver(step1Schema) });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-5">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-foreground">Sua clínica</h2>
        <p className="text-sm text-muted-foreground">Como vamos identificar sua conta.</p>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="clinicName">Nome da clínica</Label>
        <Input
          id="clinicName"
          placeholder="Clínica Fisio Pélvica"
          {...register("clinicName")}
          aria-invalid={!!errors.clinicName}
        />
        {errors.clinicName && (
          <p className="text-xs text-destructive">{errors.clinicName.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="clinicEmail">E-mail da clínica</Label>
        <Input
          id="clinicEmail"
          type="email"
          placeholder="contato@clinica.com.br"
          autoComplete="email"
          {...register("clinicEmail")}
          aria-invalid={!!errors.clinicEmail}
        />
        {errors.clinicEmail && (
          <p className="text-xs text-destructive">{errors.clinicEmail.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="phone">
          Telefone <span className="text-muted-foreground">(opcional)</span>
        </Label>
        <Input
          id="phone"
          type="tel"
          placeholder="(11) 99999-8888"
          autoComplete="tel"
          {...register("phone")}
        />
      </div>

      <Button type="submit" className="w-full rounded-full h-11">
        Continuar →
      </Button>
    </form>
  );
}

// ── Step 2 ──────────────────────────────────────────────────────────────────
function Step2Form({
  token,
  step1,
  serverError,
  onBack,
  onError,
}: {
  token: string;
  step1: Step1Data;
  serverError: string | null;
  onBack: () => void;
  onError: (msg: string) => void;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Step2Data>({ resolver: zodResolver(step2Schema) });

  function maskCPF(value: string) {
    return value
      .replace(/\D/g, "")
      .slice(0, 11)
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }

  function maskCNPJ(value: string) {
    return value
      .replace(/\D/g, "")
      .slice(0, 14)
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
  }

  async function onSubmit(data: Step2Data) {
    onError("");
    try {
      const result = await trialCompleteOnboarding({
        data: {
          token,
          clinicName: step1.clinicName,
          clinicEmail: step1.clinicEmail,
          phone: step1.phone,
          cpf: data.cpf,
          document: data.document,
        },
      });
      window.location.href = result.loginUrl;
    } catch (err) {
      onError(err instanceof Error ? err.message : "Erro inesperado. Tente novamente.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-foreground">Documentos</h2>
        <p className="text-sm text-muted-foreground">Necessários para emissão de nota fiscal.</p>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="cpf">CPF do responsável</Label>
        <Input
          id="cpf"
          placeholder="000.000.000-00"
          autoComplete="off"
          {...register("cpf")}
          onChange={(e) => {
            const masked = maskCPF(e.target.value);
            e.target.value = masked;
            setValue("cpf", masked, { shouldValidate: false });
          }}
          aria-invalid={!!errors.cpf}
        />
        {errors.cpf && <p className="text-xs text-destructive">{errors.cpf.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="document">CNPJ da clínica</Label>
        <Input
          id="document"
          placeholder="00.000.000/0001-00"
          autoComplete="off"
          {...register("document")}
          onChange={(e) => {
            const masked = maskCNPJ(e.target.value);
            e.target.value = masked;
            setValue("document", masked, { shouldValidate: false });
          }}
          aria-invalid={!!errors.document}
        />
        {errors.document && (
          <p className="text-xs text-destructive">{errors.document.message}</p>
        )}
        <p className="text-xs text-muted-foreground">Autônoma sem CNPJ? Registre um MEI gratuitamente em gov.br.</p>
      </div>

      {serverError && (
        <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">
          {serverError}
        </p>
      )}

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          className="flex-1 rounded-full h-11"
          onClick={onBack}
          disabled={isSubmitting}
        >
          ← Voltar
        </Button>
        <Button type="submit" className="flex-2 rounded-full h-11 w-full" disabled={isSubmitting}>
          {isSubmitting ? "Criando acesso…" : "Criar acesso"}
        </Button>
      </div>
    </form>
  );
}
