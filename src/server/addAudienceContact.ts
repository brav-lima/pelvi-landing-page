import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";
import { z } from "zod";

const capitalize = (word: string) =>
  word.charAt(0).toLocaleUpperCase("pt-BR") + word.slice(1).toLocaleLowerCase("pt-BR");

const normalizeName = (name: string) => name.trim().split(/\s+/).map(capitalize).join(" ");

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

    const [firstName, ...rest] = normalizeName(data.name).split(" ");
    const lastName = rest.join(" ") || undefined;

    // Cada evento gera um e-mail novo: só dispara para contatos que ainda não existem.
    const existing = await resend.contacts.get({ audienceId, email: data.email });
    const isNewContact = !!existing.error && existing.error.name === "not_found";

    const { error } = await resend.contacts.create({
      audienceId,
      email: data.email,
      firstName,
      lastName,
      unsubscribed: false,
    });

    if (error) throw new Error(error.message);

    // Falha no e-mail de boas-vindas não deve derrubar o cadastro.
    if (isNewContact) {
      try {
        const { error: eventError } = await resend.events.send({
          event: "lead.registered",
          email: data.email,
        });
        if (eventError) throw new Error(eventError.message);
      } catch (err) {
        console.error("Falha ao disparar boas-vindas via Resend", { email: data.email, err });
      }
    }

    return { ok: true };
  });
