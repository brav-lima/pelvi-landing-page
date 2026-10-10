import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/confirmar-email")({
  loader: () => {
    throw redirect({ to: "/", hash: "lista" });
  },
  component: () => null,
});
