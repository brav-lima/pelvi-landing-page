import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  token: z.string().length(64),
  clinicName: z.string().min(2),
  clinicEmail: z.string().email(),
  cpf: z.string().length(11).regex(/^\d{11}$/),
  document: z.string().length(14).regex(/^\d{14}$/),
  phone: z.string().optional(),
});

export const trialCompleteOnboarding = createServerFn({ method: "POST" })
  .inputValidator(schema)
  .handler(async ({ data }) => {
    const apiUrl = process.env.PELVI_ADMIN_API_URL;
    const apiKey = process.env.LANDING_PAGE_API_KEY;

    if (!apiUrl || !apiKey) {
      throw new Error("Configuração de servidor ausente.");
    }

    const res = await fetch(`${apiUrl}/api/admin/trials/complete-onboarding`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-trial-api-key": apiKey },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const body = (await res.json().catch(() => ({}))) as { message?: string };
      throw new Error(body.message ?? "Erro ao concluir cadastro. Tente novamente.");
    }

    const result = (await res.json()) as { loginUrl: string; trialEndsAt: string };
    return result;
  });
