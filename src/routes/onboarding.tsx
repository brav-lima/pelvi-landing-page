import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/onboarding")({
  loader: () => {
    throw redirect({ to: "/", hash: "lista" });
  },
  component: () => null,
});
