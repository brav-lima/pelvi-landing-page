import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/pelvi/Header";
import {
  Hero, Features, Audience, EarlyAccessCTA, Footer,
} from "@/components/pelvi/sections";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Features />
        <Audience />
        <EarlyAccessCTA />
      </main>
      <Footer />
    </div>
  );
}
