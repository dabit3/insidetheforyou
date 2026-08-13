"use client";

import { Act01 } from "./components/Act01";
import { Act02 } from "./components/Act02";
import { Act03 } from "./components/Act03";
import { Act04 } from "./components/Act04";
import { Act05 } from "./components/Act05";
import { Act06 } from "./components/Act06";
import { Act07 } from "./components/Act07";
import { Act08 } from "./components/Act08";
import { Act09 } from "./components/Act09";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { ProgressBar } from "./components/Primitives";

export default function Page() {
  return (
    <main>
      <ProgressBar />
      <Hero />
      <Act01 />
      <Act02 />
      <Act03 />
      <Act04 />
      <Act05 />
      <Act06 />
      <Act07 />
      <Act08 />
      <Act09 />
      <Footer />
    </main>
  );
}
