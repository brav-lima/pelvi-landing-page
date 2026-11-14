import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { SIGNUPS_PAUSED } from "@/lib/signups";
import { verifyTurnstile } from "@/server/verifyTurnstile";

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  captchaToken: z.string().min(1),
});

// Pede ao admin que envie o convite de cadastro (link para o pre-cadastro do pelvi-ui).
export const selfInvite = createServerFn({ method: "POST" })
  .inputValidator(schema)
  .handler(async ({ data }) => {
    if (SIGNUPS_PAUSED) throw new Error("Os cadastros estão pausados no momento.");

    const apiUrl = process.env.PELVI_ADMIN_API_URL;
    const apiKey = process.env.CLINIC_EXTERNAL_API_KEY;
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (!apiUrl || !apiKey || !turnstileSecret)
      throw new Error("Configuração de servidor ausente.");

    if (!(await verifyTurnstile(data.captchaToken, turnstileSecret))) {
      throw new Error("Não foi possível validar o captcha. Tente de novo.");
    }

    const res = await fetch(`${apiUrl}/api/admin/v1/clinic-ext/leads/self-invite`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-clinic-api-key": apiKey },
      body: JSON.stringify({ name: data.name, email: data.email }),
    });

    if (res.status === 429) {
      throw new Error(
        "Já enviamos um convite para este e-mail há pouco. Procure na caixa de entrada e no spam e tente de novo em 10 minutos.",
      );
    }
    if (!res.ok)
      throw new Error("Não conseguimos enviar o convite agora. Tente de novo em instantes.");

    return { ok: true as const };
  });
