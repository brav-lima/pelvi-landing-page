import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

export const addAudienceContact = createServerFn({ method: "POST" })
  .inputValidator(schema)
  .handler(async ({ data }) => {
    const apiKey = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    if (!apiKey || !audienceId) {
      throw new Error("RESEND_API_KEY e RESEND_AUDIENCE_ID são obrigatórios");
    }

    const resend = new Resend(apiKey);

    const [firstName, ...rest] = data.name.trim().split(" ");
    const lastName = rest.join(" ") || undefined;

    const { error } = await resend.contacts.create({
      audienceId,
      email: data.email,
      firstName,
      lastName,
      unsubscribed: false,
    });

    if (error) throw new Error(error.message);

    return { ok: true };
  });
