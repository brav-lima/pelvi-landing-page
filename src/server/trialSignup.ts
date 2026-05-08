import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

export const trialSignup = createServerFn({ method: "POST" })
  .inputValidator(schema)
  .handler(async ({ data }) => {
    const apiUrl = process.env.PELVI_ADMIN_API_URL;
    const apiKey = process.env.LANDING_PAGE_API_KEY;

    if (!apiUrl || !apiKey) {
      throw new Error("Configuração de servidor ausente.");
    }

    const res = await fetch(`${apiUrl}/api/admin/trials/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-trial-api-key": apiKey },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const body = (await res.json().catch(() => ({}))) as { message?: string };
      throw new Error(body.message ?? "Erro ao iniciar cadastro. Tente novamente.");
    }

    return { ok: true };
  });
