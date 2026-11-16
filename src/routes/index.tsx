import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/pelvi/Header";
import {
  Hero,
  Steps,
  Prontuario,
  Rotina,
  Finance,
  Security,
  ComingSoon,
  Community,
  Pricing,
  Faq,
  Closing,
} from "@/components/pelvi/sections";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Steps />
        <Prontuario />
        <Rotina />
        <Finance />
        <Security />
        <ComingSoon />
        <Community />
        <Pricing />
        <Faq />
      </main>
      <Closing />
    </>
  );
}
