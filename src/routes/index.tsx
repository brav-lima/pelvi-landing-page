import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/pelvi/Header";
import {
  Hero,
  ForYou,
  Timeline,
  TesterProgram,
  CtaSection,
  Footer,
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
        <ForYou />
        <Timeline />
        <TesterProgram />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
