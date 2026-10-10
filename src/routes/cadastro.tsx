import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/cadastro")({
  loader: () => {
    throw redirect({ to: "/", hash: "lista" });
  },
  component: () => null,
});
