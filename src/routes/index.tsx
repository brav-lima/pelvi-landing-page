import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/pelvi/Header";
import {
  Hero,
  Patients,
  Evolutions,
  Agenda,
  Finance,
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
        <Patients />
        <Evolutions />
        <Agenda />
        <Finance />
        <Pricing />
        <Faq />
      </main>
      <Closing />
    </>
  );
}
