import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addAudienceContact } from "@/server/addAudienceContact";

const schema = z.object({
  name: z.string().min(2, "Nome precisa ter ao menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
});

type FormData = z.infer<typeof schema>;

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactModal({ open, onOpenChange }: ContactModalProps) {
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    await addAudienceContact({ data });
    setSuccess(true);
    reset();
  }

  function handleOpenChange(value: boolean) {
    if (!value) setSuccess(false);
    onOpenChange(value);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Falar com a gente</DialogTitle>
          <DialogDescription>
            Deixe seu contato e nossa equipe entrará em contato em até 1 dia útil.
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="py-8 text-center space-y-2">
            <p className="text-2xl">✓</p>
            <p className="font-semibold text-foreground">Recebemos seu contato!</p>
            <p className="text-sm text-muted-foreground">Nossa equipe fala com você em breve.</p>
            <Button className="mt-4 rounded-full" onClick={() => handleOpenChange(false)}>
              Fechar
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                placeholder="Seu nome completo"
                {...register("name")}
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="voce@email.com"
                {...register("email")}
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full rounded-full h-11"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando…" : "Entrar em contato"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
