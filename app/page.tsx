import { Adjustments } from "@/components/sections/Adjustments";
import { Blending } from "@/components/sections/Blending";
import { Candidates } from "@/components/sections/Candidates";
import { Filters } from "@/components/sections/Filters";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Inputs } from "@/components/sections/Inputs";
import { Pipeline } from "@/components/sections/Pipeline";
import { Safety } from "@/components/sections/Safety";
import { Scoring } from "@/components/sections/Scoring";
import { Takeaways } from "@/components/sections/Takeaways";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <main>
        <Hero />
        <Pipeline />
        <Candidates />
        <Inputs />
        <Filters />
        <Scoring />
        <Adjustments />
        <Safety />
        <Blending />
        <Takeaways />
      </main>
      <Footer />
    </>
  );
}
