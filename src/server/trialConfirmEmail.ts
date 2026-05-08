import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const trialConfirmEmail = createServerFn({ method: "POST" })
  .inputValidator(z.object({ token: z.string().length(64) }))
  .handler(async ({ data }) => {
    const apiUrl = process.env.PELVI_ADMIN_API_URL;
    const apiKey = process.env.LANDING_PAGE_API_KEY;

    if (!apiUrl || !apiKey) {
      throw new Error("Configuração de servidor ausente.");
    }

    const res = await fetch(`${apiUrl}/api/admin/trials/confirm-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-trial-api-key": apiKey },
      body: JSON.stringify({ token: data.token }),
    });

    if (!res.ok) {
      const body = (await res.json().catch(() => ({}))) as { message?: string };
      throw new Error(body.message ?? "Token inválido ou expirado.");
    }

    const result = (await res.json()) as { name: string; email: string };
    return result;
  });
